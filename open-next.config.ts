import { defineCloudflareConfig } from "@opennextjs/cloudflare";

/**
 * OpenNext adapter for Cloudflare Workers.
 *
 * `buildCommand` points at the plain Next build: `npm run build` itself runs
 * `opennextjs-cloudflare build` (so Cloudflare's build step produces the
 * Worker), and would otherwise call itself in a loop.
 *
 * No incremental cache override (that would need an R2 bucket): pages showing
 * live prices render on demand, and the marketplace responses they use are
 * cached by the source adapters themselves.
 */
export default {
  ...defineCloudflareConfig(),
  buildCommand: "npm run build:next",
};
