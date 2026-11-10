import { getCloudflareContext } from "@opennextjs/cloudflare";
import type { Offer, Product } from "@/types";

/**
 * Where the priced catalogue lives between refreshes.
 *
 * Back ends behind one interface, picked at runtime (on Cloudflare with
 * both configured, KV in front of Supabase: see `layeredStore`):
 *
 * - **Supabase** (Postgres) when `SUPABASE_URL` and
 *   `SUPABASE_SERVICE_ROLE_KEY` are set: one row per product, one row per
 *   offer, and a price history (`supabase/migrations/`). The reference store.
 * - **Workers KV** (binding `CATALOGUE`) otherwise, on Cloudflare: the same
 *   data as JSON documents. Lets the site run before the database exists and
 *   if it is ever unreachable to configure.
 * - **Memory**, for a local server and the tests.
 *
 * The catalogue is split into `BUCKET_COUNT` buckets (a stable hash of the
 * slug). A refresh rebuilds one bucket at a time, which keeps each run within
 * the subrequest limit of a Worker.
 */

export const BUCKET_COUNT = 16;

/** Stable bucket of a product: the same slug always lands in the same one. */
export function bucketOf(slug: string): number {
  let hash = 0;
  for (let index = 0; index < slug.length; index++) {
    hash = (hash * 31 + slug.charCodeAt(index)) >>> 0;
  }
  return hash % BUCKET_COUNT;
}

/** What listing pages need about one product, without its full offer list. */
export interface CatalogueCard {
  /** The product, its offers reduced to the cheapest one per condition. */
  card: Product;
  /** Epoch milliseconds of the last refresh of this product. */
  refreshedAt: number;
}

export type CatalogueIndex = Record<string, CatalogueCard>;

export interface BucketWrite {
  bucket: number;
  /** Full products of the bucket, as they must be stored. */
  products: Product[];
  /** Their listing cards, keyed by slug. */
  cards: CatalogueIndex;
  /** Slugs that belong to this bucket in the current configuration. */
  slugs: string[];
  stats: { priced: number; failures: number; durationMs: number };
}

/** One point of a product's price history, per condition. */
export interface PricePoint {
  condition: string;
  /** Median of the typical offers at that refresh, in cents. */
  medianCents: number;
  /** Cheapest typical offer at that refresh, in cents. */
  minCents: number;
  offerCount: number;
  /** Epoch milliseconds of the capture. */
  capturedAt: number;
}

export interface CatalogueStore {
  readonly kind: "supabase" | "kv" | "kv+supabase" | "memory";
  readIndex(): Promise<CatalogueIndex>;
  readProduct(slug: string): Promise<Product | null>;
  /** Price history of one product, oldest first (empty without history). */
  readPriceHistory(slug: string, days: number): Promise<PricePoint[]>;
  /** Products of one bucket as last stored (to keep those a refresh failed on). */
  readBucket(bucket: number): Promise<Product[]>;
  writeBucket(write: BucketWrite): Promise<void>;
  /** Takes a short lock; false when another refresh holds it. */
  acquireLock(seconds: number): Promise<boolean>;
  /** Gives the lock back once the refresh is written. */
  releaseLock(): Promise<void>;
}

/* ------------------------------------------------------------------ */
/* Workers KV                                                          */
/* ------------------------------------------------------------------ */

/** The subset of the KV binding used here (no dependency on workers-types). */
interface KvNamespace {
  get(key: string, options: { type: "json" }): Promise<unknown>;
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
  delete(key: string): Promise<void>;
}

/** Bump when the stored shape changes: old documents are then ignored. */
const KV_PREFIX = "catalogue:v4";

function kvStore(kv: KvNamespace): CatalogueStore {
  const indexKey = `${KV_PREFIX}:index`;
  const bucketKey = (bucket: number) => `${KV_PREFIX}:bucket:${bucket}`;

  const readBucket = async (bucket: number) =>
    ((await kv.get(bucketKey(bucket), { type: "json" })) as Product[] | null) ?? [];

  return {
    kind: "kv",
    async readIndex() {
      return ((await kv.get(indexKey, { type: "json" })) as CatalogueIndex | null) ?? {};
    },
    async readProduct(slug) {
      const products = await readBucket(bucketOf(slug));
      return products.find((product) => product.id === slug) ?? null;
    },
    readBucket,
    async readPriceHistory() {
      // KV keeps only the current state; history needs the database.
      return [];
    },
    async writeBucket({ bucket, products, cards, slugs }) {
      await kv.put(bucketKey(bucket), JSON.stringify(products));
      // The index is one document: read, replace this bucket's cards, write.
      const index = ((await kv.get(indexKey, { type: "json" })) as CatalogueIndex | null) ?? {};
      const keep = new Set(slugs);
      for (const slug of Object.keys(index)) {
        if (bucketOf(slug) === bucket && !keep.has(slug)) delete index[slug];
      }
      Object.assign(index, cards);
      await kv.put(indexKey, JSON.stringify(index));
    },
    async acquireLock(seconds) {
      const key = `${KV_PREFIX}:lock`;
      if (await kv.get(key)) return false;
      // KV refuses a TTL under 60 seconds.
      await kv.put(key, "1", { expirationTtl: Math.max(60, seconds) });
      return true;
    },
    async releaseLock() {
      await kv.delete(`${KV_PREFIX}:lock`);
    },
  };
}

/* ------------------------------------------------------------------ */
/* Supabase (PostgREST)                                                */
/* ------------------------------------------------------------------ */

interface SupabaseConfig {
  url: string;
  key: string;
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) return null;
  return { url, key };
}

const toCents = (offer: Offer, field: "price" | "shippingPrice" | "totalPrice") =>
  offer[field]?.amount ?? null;

function supabaseStore({ url, key }: SupabaseConfig): CatalogueStore {
  async function rest(path: string, init: RequestInit & { prefer?: string } = {}) {
    const response = await fetch(`${url}/rest/v1/${path}`, {
      ...init,
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        ...(init.prefer ? { Prefer: init.prefer } : {}),
      },
      cache: "no-store",
    });
    if (!response.ok) {
      const detail = (await response.text()).slice(0, 200);
      throw new Error(
        `Supabase ${init.method ?? "GET"} ${path.split("?")[0]}: ${response.status} ${detail}`,
      );
    }
    return response;
  }
  const list = (slugs: string[]) => `(${slugs.map((slug) => `"${slug}"`).join(",")})`;

  return {
    kind: "supabase",
    async readIndex() {
      const rows = (await (
        await rest("products?select=slug,card,refreshed_at&limit=2000")
      ).json()) as { slug: string; card: Product; refreshed_at: string }[];
      return Object.fromEntries(
        rows.map((row) => [
          row.slug,
          { card: row.card, refreshedAt: Date.parse(row.refreshed_at) },
        ]),
      );
    },
    async readProduct(slug) {
      const rows = (await (
        await rest(`products?slug=eq.${encodeURIComponent(slug)}&select=data&limit=1`)
      ).json()) as { data: Product }[];
      return rows[0]?.data ?? null;
    },
    async readBucket(bucket) {
      const rows = (await (await rest(`products?bucket=eq.${bucket}&select=data`)).json()) as {
        data: Product;
      }[];
      return rows.map((row) => row.data);
    },
    async readPriceHistory(slug, days) {
      const since = new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();
      const rows = (await (
        await rest(
          `price_points?product_slug=eq.${encodeURIComponent(slug)}` +
            `&captured_at=gte.${since}&order=captured_at.asc` +
            `&select=condition,median_cents,min_cents,offer_count,captured_at&limit=1000`,
        )
      ).json()) as {
        condition: string;
        median_cents: number;
        min_cents: number;
        offer_count: number;
        captured_at: string;
      }[];
      return rows.map((row) => ({
        condition: row.condition,
        medianCents: row.median_cents,
        minCents: row.min_cents,
        offerCount: row.offer_count,
        capturedAt: Date.parse(row.captured_at),
      }));
    },
    async writeBucket({ bucket, products, cards, slugs, stats }) {
      const now = new Date().toISOString();

      // Products no longer in the configuration leave the bucket (their
      // offers and price history follow: `on delete cascade`).
      await rest(
        `products?bucket=eq.${bucket}${slugs.length ? `&slug=not.in.${list(slugs)}` : ""}`,
        { method: "DELETE" },
      );
      if (products.length === 0) return;

      await rest("products?on_conflict=slug", {
        method: "POST",
        prefer: "resolution=merge-duplicates,return=minimal",
        body: JSON.stringify(
          products.map((product) => ({
            slug: product.id,
            title: product.title,
            brand: product.brand ?? null,
            category_slug: product.categorySlug ?? null,
            bucket,
            image_url: product.imageUrl ?? null,
            offer_count: product.offerCount ?? product.offers.length,
            best_price_cents: product.bestOffer?.totalPrice.amount ?? null,
            currency: product.bestOffer?.totalPrice.currency ?? "EUR",
            card: cards[product.id]?.card ?? product,
            data: product,
            refreshed_at: new Date(cards[product.id]?.refreshedAt ?? Date.now()).toISOString(),
          })),
        ),
      });

      // Offers are replaced as a whole: a listing that ended must disappear.
      await rest(`offers?product_slug=in.${list(products.map((product) => product.id))}`, {
        method: "DELETE",
      });
      const offers = products.flatMap((product) =>
        product.offers.map((offer) => ({
          id: `${product.id}|${offer.id}`,
          product_slug: product.id,
          source: offer.source,
          external_id: offer.id,
          title: offer.title,
          url: offer.url,
          condition: offer.condition,
          price_cents: toCents(offer, "price"),
          shipping_cents: toCents(offer, "shippingPrice"),
          total_cents: toCents(offer, "totalPrice"),
          currency: offer.totalPrice.currency,
          seller_name: offer.seller?.name ?? null,
          seller_type: offer.sellerType ?? null,
          image_url: offer.imageUrl ?? null,
          suspicious: Boolean(offer.deal?.suspicious),
          fetched_at: offer.fetchedAt,
        })),
      );
      if (offers.length > 0) {
        await rest("offers", {
          method: "POST",
          prefer: "return=minimal",
          body: JSON.stringify(offers),
        });
      }

      // One price point per product and condition: the start of a history.
      const points = products.flatMap((product) => {
        const byCondition = new Map<string, number[]>();
        for (const offer of product.offers) {
          if (offer.deal?.suspicious || offer.priceOutlier) continue;
          byCondition.set(offer.condition, [
            ...(byCondition.get(offer.condition) ?? []),
            offer.totalPrice.amount,
          ]);
        }
        return [...byCondition].map(([condition, amounts]) => {
          const sorted = [...amounts].sort((a, b) => a - b);
          return {
            product_slug: product.id,
            condition,
            min_cents: sorted[0],
            median_cents: sorted[Math.floor(sorted.length / 2)],
            offer_count: sorted.length,
            captured_at: now,
          };
        });
      });
      if (points.length > 0) {
        await rest("price_points", {
          method: "POST",
          prefer: "return=minimal",
          body: JSON.stringify(points),
        });
      }

      await rest("ingest_runs", {
        method: "POST",
        prefer: "return=minimal",
        body: JSON.stringify({
          bucket,
          products: products.length,
          priced: stats.priced,
          failures: stats.failures,
          duration_ms: stats.durationMs,
        }),
      });
    },
    async acquireLock(seconds) {
      // An insert that conflicts with a live lock fails: that is the lock.
      await rest(`ingest_locks?expires_at=lt.${new Date().toISOString()}`, { method: "DELETE" });
      const response = await fetch(`${url}/rest/v1/ingest_locks`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          name: "catalogue",
          expires_at: new Date(Date.now() + seconds * 1000).toISOString(),
        }),
      });
      return response.ok;
    },
    async releaseLock() {
      await rest("ingest_locks?name=eq.catalogue", { method: "DELETE" });
    },
  };
}

/* ------------------------------------------------------------------ */
/* Memory                                                              */
/* ------------------------------------------------------------------ */

const memoryBuckets = new Map<number, Product[]>();
const memoryIndex: CatalogueIndex = {};

const memoryStore: CatalogueStore = {
  kind: "memory",
  async readIndex() {
    return memoryIndex;
  },
  async readProduct(slug) {
    return memoryBuckets.get(bucketOf(slug))?.find((product) => product.id === slug) ?? null;
  },
  async readBucket(bucket) {
    return memoryBuckets.get(bucket) ?? [];
  },
  async readPriceHistory() {
    return [];
  },
  async writeBucket({ bucket, products, cards, slugs }) {
    memoryBuckets.set(bucket, products);
    const keep = new Set(slugs);
    for (const slug of Object.keys(memoryIndex)) {
      if (bucketOf(slug) === bucket && !keep.has(slug)) delete memoryIndex[slug];
    }
    Object.assign(memoryIndex, cards);
  },
  async acquireLock() {
    return true;
  },
  async releaseLock() {},
};

/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Workers KV in front, Supabase behind                                */
/* ------------------------------------------------------------------ */

/**
 * The production setup once both exist. Pages read Workers KV: replicated to
 * every data centre, one read per page, nothing to wait for. Every refresh is
 * also written to Supabase, the reference database, which keeps what KV does
 * not: every offer as a row and the price history. A database incident is
 * logged and never takes the site down, and plugging the database in does not
 * empty the site while it fills up.
 */
function layeredStore(front: CatalogueStore, database: CatalogueStore): CatalogueStore {
  return {
    kind: "kv+supabase",
    readIndex: () => front.readIndex(),
    async readProduct(slug) {
      return (await front.readProduct(slug)) ?? database.readProduct(slug).catch(() => null);
    },
    readPriceHistory: (slug, days) => database.readPriceHistory(slug, days),
    readBucket: (bucket) => front.readBucket(bucket),
    async writeBucket(write) {
      await front.writeBucket(write);
      try {
        await database.writeBucket(write);
      } catch (error) {
        console.error(
          `[catalogue] Supabase, lot ${write.bucket} : ${error instanceof Error ? error.message : String(error)}`,
        );
      }
    },
    acquireLock: (seconds) => front.acquireLock(seconds),
    releaseLock: () => front.releaseLock(),
  };
}

export interface CatalogueRuntime {
  store: CatalogueStore;
  /** Keeps a background refresh alive after the response is sent. */
  waitUntil?: (promise: Promise<unknown>) => void;
}

export function getCatalogueRuntime(): CatalogueRuntime {
  const supabase = getSupabaseConfig();
  try {
    const { env, ctx } = getCloudflareContext();
    const kv = (env as unknown as { CATALOGUE?: KvNamespace }).CATALOGUE;
    const waitUntil = (promise: Promise<unknown>) => ctx.waitUntil(promise);
    if (kv && supabase) {
      return { store: layeredStore(kvStore(kv), supabaseStore(supabase)), waitUntil };
    }
    if (supabase) return { store: supabaseStore(supabase), waitUntil };
    if (kv) return { store: kvStore(kv), waitUntil };
    return { store: memoryStore, waitUntil };
  } catch {
    // Not running inside the Cloudflare Worker.
    return { store: supabase ? supabaseStore(supabase) : memoryStore };
  }
}
