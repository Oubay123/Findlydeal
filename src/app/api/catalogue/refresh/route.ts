import { NextResponse } from "next/server";
import { CATALOGUE_TTL_SECONDS, refreshCatalogue } from "@/lib/catalogue";

/**
 * Rebuilds the eBay-priced catalogue when it is due.
 *
 * Called every three hours by the Cron Trigger (`cloudflare/worker.js`).
 * It needs no secret: a catalogue younger than 2 h 30 is left alone, so a
 * stranger calling it cannot make the site call eBay more often than the
 * schedule does.
 */
export const dynamic = "force-dynamic";

/** A little under the catalogue TTL, so the cron always finds it due. */
const MIN_AGE_SECONDS = CATALOGUE_TTL_SECONDS - 30 * 60;

export async function POST() {
  const result = await refreshCatalogue(MIN_AGE_SECONDS);
  console.log(`[ebay] scheduled refresh: ${JSON.stringify(result)}`);
  return NextResponse.json(result, {
    headers: { "cache-control": "no-store", "x-robots-tag": "noindex" },
  });
}
