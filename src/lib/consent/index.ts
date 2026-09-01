/**
 * Cookie consent, ready but dormant.
 *
 * The site currently loads no analytics, no advertising pixel and no
 * third-party script, and sets no non-essential cookie. Showing a consent
 * banner in that situation would be theatre: the visitor is asked to allow or
 * refuse something that does not exist, and a refusal that changes nothing
 * teaches them not to trust the next banner either.
 *
 * So the machinery lives here, tested and wired, while `CONSENT_REQUIRED`
 * keeps the banner off screen.
 *
 * **To switch it on**, the day a measurement tool is added:
 *   1. set `CONSENT_REQUIRED` to `true` below;
 *   2. gate the script on `hasConsent("analytics")` before it loads;
 *   3. update `/legal/cookies` and `/legal/privacy`, which both state today
 *      that nothing non-essential is set.
 */

/** Categories a visitor can decide on. Essential storage is never optional. */
export type ConsentCategory = "analytics";

export interface ConsentState {
  analytics: boolean;
  /** ISO timestamp of the decision, kept as proof of when it was given. */
  decidedAt: string;
}

/**
 * Whether a consent decision is needed at all.
 *
 * Flip to `true` at the same commit that introduces the first non-essential
 * script, never before.
 */
export const CONSENT_REQUIRED = false;

export const CONSENT_STORAGE_KEY = "findlydeal:consent";

export const CONSENT_ACCEPT_ALL: ConsentState = { analytics: true, decidedAt: "" };
export const CONSENT_REJECT_ALL: ConsentState = { analytics: false, decidedAt: "" };

/** Reads a stored decision. Returns `null` when the visitor has not chosen. */
export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    const value = parsed as Partial<ConsentState>;
    if (typeof value.analytics !== "boolean") return null;
    return { analytics: value.analytics, decidedAt: value.decidedAt ?? "" };
  } catch {
    // Blocked storage or corrupted value: treat as "no decision yet".
    return null;
  }
}

export function writeConsent(state: Omit<ConsentState, "decidedAt">): ConsentState {
  const decided: ConsentState = { ...state, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(decided));
  } catch {
    // Nothing to do: the choice simply will not persist across visits.
  }
  return decided;
}

/**
 * The check a third-party script must pass before loading.
 *
 * Returns `true` while consent is not required, so wrapping a future script in
 * this call is safe to write today.
 */
export function hasConsent(category: ConsentCategory): boolean {
  if (!CONSENT_REQUIRED) return true;
  return readConsent()?.[category] === true;
}
