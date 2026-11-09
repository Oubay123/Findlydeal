/**
 * A small time-based cache for marketplace responses.
 *
 * Every page view must not cost an eBay API call: the Browse API has a daily
 * quota, and a Cloudflare Worker on the free plan may make at most 50
 * subrequests per visit. Responses are therefore kept for a while:
 *
 * - on Cloudflare, in the Workers Cache API (`caches.default`), shared by every
 *   visitor hitting the same data centre and surviving across isolates;
 * - elsewhere (local `next start`, tests), in this isolate's memory.
 *
 * Only successful loads are cached; a failure is retried on the next request.
 * `ttl` may depend on the value: a partial result can be kept briefly,
 * and a TTL of 0 means "serve it, but do not keep it".
 */

type Entry = { value: unknown; expiresAt: number };

const memory = new Map<string, Entry>();
const MEMORY_LIMIT = 500;

/** Synthetic origin: Cache API keys must be URLs, they are never fetched. */
const CACHE_ORIGIN = "https://cache.findlydeal.internal/";

function getEdgeCache(): Cache | undefined {
  const storage = (globalThis as { caches?: CacheStorage & { default?: Cache } }).caches;
  return storage?.default;
}

export async function cached<T>(
  key: string,
  ttl: number | ((value: T) => number),
  load: () => Promise<T>,
): Promise<T> {
  const now = Date.now();
  const hit = memory.get(key);
  if (hit && hit.expiresAt > now) return hit.value as T;

  const edge = getEdgeCache();
  const request = new Request(CACHE_ORIGIN + encodeURIComponent(key));

  if (edge) {
    try {
      const response = await edge.match(request);
      if (response) {
        const value = (await response.json()) as T;
        const remaining = Number(response.headers.get("x-findlydeal-expires")) - now;
        remember(key, value, now + (remaining > 0 ? remaining : 60_000));
        return value;
      }
    } catch {
      // A cache read failure is not worth failing the page for.
    }
  }

  const value = await load();
  const ttlSeconds = typeof ttl === "function" ? ttl(value) : ttl;
  if (ttlSeconds <= 0) return value;
  remember(key, value, now + ttlSeconds * 1000);

  if (edge) {
    try {
      await edge.put(
        request,
        new Response(JSON.stringify(value), {
          headers: {
            "content-type": "application/json",
            "cache-control": `public, max-age=${ttlSeconds}`,
            "x-findlydeal-expires": String(now + ttlSeconds * 1000),
          },
        }),
      );
    } catch {
      // Same: the value is served anyway, just not shared this time.
    }
  }

  return value;
}

function remember(key: string, value: unknown, expiresAt: number) {
  if (memory.size >= MEMORY_LIMIT) {
    const oldest = memory.keys().next().value;
    if (oldest !== undefined) memory.delete(oldest);
  }
  memory.set(key, { value, expiresAt });
}
