"use client";

import Link from "next/link";
import { useLocalePath } from "@/i18n/use-locale";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CONSENT_REQUIRED, readConsent, writeConsent, type ConsentState } from "@/lib/consent";

/**
 * Consent banner. Renders nothing while `CONSENT_REQUIRED` is false.
 *
 * Mounted in the root layout so it is ready to appear the day a measurement
 * tool is introduced, without touching the layout again. See
 * `src/lib/consent/index.ts` for the switch and the checklist.
 *
 * Design note: "Refuser" is a real button of equal weight, not a discreet
 * link. A refusal that is harder to click than an acceptance is not a free
 * choice, and both the GDPR and the Swiss FADP expect one.
 */
export function CookieConsent() {
  const path = useLocalePath();
  const [decision, setDecision] = useState<ConsentState | null>(() =>
    CONSENT_REQUIRED ? readConsent() : ({} as ConsentState),
  );

  if (!CONSENT_REQUIRED || decision !== null) return null;

  const decide = (analytics: boolean) => setDecision(writeConsent({ analytics }));

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-5 shadow-xl shadow-black/10">
        <h2 id="consent-title" className="font-display text-sm font-semibold">
          Cookies de mesure d&apos;audience
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Nous aimerions mesurer la fréquentation du site pour l&apos;améliorer. Aucun cookie
          publicitaire, aucun profilage. Vous pouvez refuser sans conséquence sur votre navigation.{" "}
          <Link href={path("/legal/cookies")} className="text-primary underline underline-offset-4">
            En savoir plus
          </Link>
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="md" onClick={() => decide(true)}>
            Accepter
          </Button>
          <Button size="md" variant="outline-brand" onClick={() => decide(false)}>
            Refuser
          </Button>
        </div>
      </div>
    </div>
  );
}
