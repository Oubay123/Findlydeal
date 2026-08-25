"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { SEARCH_PARAM_KEYS } from "@/lib/constants";

/**
 * Owns the search input state and navigation to `/search`.
 *
 * The results themselves are fetched on the server by the `/search` page —
 * this hook only drives the URL, so a search stays shareable and cacheable.
 */
export function useSearch(initialTerm?: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(initialTerm ?? searchParams.get(SEARCH_PARAM_KEYS.term) ?? "");

  const submit = useCallback(
    (nextTerm: string = term) => {
      const trimmed = nextTerm.trim();
      if (!trimmed) return;

      // Keep the active filters, reset pagination.
      const params = new URLSearchParams(searchParams.toString());
      params.set(SEARCH_PARAM_KEYS.term, trimmed);
      params.delete(SEARCH_PARAM_KEYS.page);
      router.push(`/search?${params.toString()}`);
    },
    [router, searchParams, term],
  );

  return { term, setTerm, submit };
}
