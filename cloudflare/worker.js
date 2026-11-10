/**
 * Worker entry point: the OpenNext build plus a scheduled handler.
 *
 * `npm run build` writes `.open-next/worker.js` (the Next.js app). This file
 * wraps it so the Worker also answers the Cron Trigger set in
 * `wrangler.jsonc`, which refreshes part of the eBay-priced catalogue
 * every ten minutes through the app's own `/api/catalogue/refresh` route — the rebuild
 * logic stays in one place, inside the Next.js code.
 */
import handler from "../.open-next/worker.js";

export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "../.open-next/worker.js";

const REFRESH_URL = "https://findlydeal.com/api/catalogue/refresh";

const worker = {
  fetch: handler.fetch,

  async scheduled(_controller, env, ctx) {
    const response = await handler.fetch(new Request(REFRESH_URL, { method: "POST" }), env, ctx);
    if (!response.ok) {
      console.error(`[ebay] scheduled refresh failed: HTTP ${response.status}`);
    }
  },
};

export default worker;
