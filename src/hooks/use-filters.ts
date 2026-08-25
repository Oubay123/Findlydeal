"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SEARCH_PARAM_KEYS } from "@/lib/constants";

type FilterKey = (typeof SEARCH_PARAM_KEYS)[keyof typeof SEARCH_PARAM_KEYS];

/**
 * Read and update search filters through the URL.
 *
 * Filters live in the query string rather than in React state so that the
 * server component rendering the results always sees the same truth.
 */
export function useFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const get = useCallback((key: FilterKey) => searchParams.get(key), [searchParams]);

  const getAll = useCallback((key: FilterKey) => searchParams.getAll(key), [searchParams]);

  const isActive = useCallback(
    (key: FilterKey, value?: string) =>
      value === undefined ? searchParams.has(key) : searchParams.getAll(key).includes(value),
    [searchParams],
  );

  const apply = useCallback(
    (next: Partial<Record<FilterKey, string | string[] | null>>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(next)) {
        params.delete(key);
        if (value === null || value === undefined) continue;
        for (const item of Array.isArray(value) ? value : [value]) {
          if (item) params.append(key, item);
        }
      }

      // Any filter change invalidates the current page.
      params.delete(SEARCH_PARAM_KEYS.page);

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, searchParams],
  );

  /** Toggle one value of a multi-valued filter (conditions, sources). */
  const toggle = useCallback(
    (key: FilterKey, value: string) => {
      const current = searchParams.getAll(key);
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      apply({ [key]: next.length > 0 ? next : null });
    },
    [apply, searchParams],
  );

  const clear = useCallback(() => {
    const term = searchParams.get(SEARCH_PARAM_KEYS.term);
    router.push(
      term ? `${pathname}?${SEARCH_PARAM_KEYS.term}=${encodeURIComponent(term)}` : pathname,
    );
  }, [pathname, router, searchParams]);

  return { get, getAll, isActive, apply, toggle, clear };
}
