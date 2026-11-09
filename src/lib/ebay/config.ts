/**
 * eBay settings, read from the environment at request time.
 *
 * On Cloudflare, OpenNext exposes the Worker's variables and secrets on
 * `process.env`, so the same code runs locally (`.env.local`) and in
 * production (dashboard secrets). Nothing here is read at build time: the
 * build machine never needs the keys.
 *
 * | Variable              | Kind     | Purpose                                            |
 * | --------------------- | -------- | -------------------------------------------------- |
 * | `EBAY_CLIENT_ID`      | secret   | App ID of the **Production** keyset                |
 * | `EBAY_CLIENT_SECRET`  | secret   | Cert ID of the same keyset                         |
 * | `EBAY_CAMPAIGN_ID`    | variable | eBay Partner Network campaign id (affiliate links) |
 * | `EBAY_REFERENCE_ID`   | variable | Optional EPN reference id, defaults to findlydeal  |
 * | `EBAY_MARKETPLACE_ID` | variable | `EBAY_FR` (set in wrangler.jsonc)                  |
 * | `EBAY_ENVIRONMENT`    | variable | `production` (default) or `sandbox`                |
 * | `EBAY_API_BASE_URL`   | variable | Local tests only: points at a mock server          |
 */

export interface EbayConfig {
  clientId: string;
  clientSecret: string;
  campaignId?: string;
  referenceId: string;
  marketplaceId: string;
  apiBaseUrl: string;
}

const API_BASE_URLS = {
  production: "https://api.ebay.com",
  sandbox: "https://api.sandbox.ebay.com",
} as const;

export function getEbayConfig(): EbayConfig | null {
  const clientId = process.env.EBAY_CLIENT_ID?.trim();
  const clientSecret = process.env.EBAY_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return null;

  const environment = process.env.EBAY_ENVIRONMENT === "sandbox" ? "sandbox" : "production";

  return {
    clientId,
    clientSecret,
    campaignId: process.env.EBAY_CAMPAIGN_ID?.trim() || undefined,
    referenceId: process.env.EBAY_REFERENCE_ID?.trim() || "findlydeal",
    marketplaceId: process.env.EBAY_MARKETPLACE_ID?.trim() || "EBAY_FR",
    apiBaseUrl: process.env.EBAY_API_BASE_URL?.trim() || API_BASE_URLS[environment],
  };
}

export function isEbayConfigured(): boolean {
  return getEbayConfig() !== null;
}
