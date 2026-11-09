import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Where the priced catalogue is kept between rebuilds.
 *
 * On Cloudflare, Workers KV (binding `CATALOGUE` in `wrangler.jsonc`): one
 * copy shared by every data centre, unlike the Cache API, which is local to
 * one data centre and let each of them rebuild the catalogue on its own.
 * Elsewhere (local `next start`, tests) there is no KV, and the catalogue
 * falls back to the in-memory cache of `src/lib/ebay/cache.ts`.
 */

/** The subset of the KV binding used here (no dependency on workers-types). */
export interface CatalogueKv {
  get(key: string, options: { type: "json"; cacheTtl?: number }): Promise<unknown>;
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

export interface CatalogueRuntime {
  kv?: CatalogueKv;
  /** Keeps a background rebuild alive after the response is sent. */
  waitUntil?: (promise: Promise<unknown>) => void;
}

export function getCatalogueRuntime(): CatalogueRuntime {
  try {
    const { env, ctx } = getCloudflareContext();
    const kv = (env as unknown as { CATALOGUE?: CatalogueKv }).CATALOGUE;
    return { kv, waitUntil: (promise) => ctx.waitUntil(promise) };
  } catch {
    // Not running inside the Cloudflare Worker.
    return {};
  }
}
