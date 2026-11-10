import { NextResponse } from "next/server";
import { refreshCatalogue } from "@/lib/catalogue";

/**
 * Refreshes the stalest part of the eBay-priced catalogue, if one is due.
 *
 * Called every ten minutes by the Cron Trigger (`cloudflare/worker.js`).
 * It needs no secret: a bucket refreshed less than two hours ago is left
 * alone and a lock prevents concurrent runs, so a stranger calling it cannot
 * make the site call eBay more often than the schedule does.
 */
export const dynamic = "force-dynamic";

async function refresh() {
  const result = await refreshCatalogue();
  console.log(`[ebay] refresh: ${JSON.stringify(result)}`);
  return NextResponse.json(result, {
    headers: { "cache-control": "no-store", "x-robots-tag": "noindex" },
  });
}

export const GET = refresh;
export const POST = refresh;
