"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { MAX_COMPARED_PRODUCTS, MIN_COMPARED_PRODUCTS, SEARCH_PARAM_KEYS } from "@/lib/constants";

/**
 * The side-by-side comparison basket.
 *
 * Backed by `sessionStorage`, not the URL. The selection has to survive a
 * navigation: a visitor picks a watch in the results, opens its page to read
 * the specs, then comes back for a second one. A query string would be dropped
 * the moment they left `/search`.
 *
 * The comparison itself stays shareable, because `/compare` reads its products
 * from `?compare=a,b` — `compareHref` below builds that link from the basket.
 *
 * Titles are stored next to the ids so the floating bar can label each chip
 * without the server shipping the whole catalogue to the client.
 */

export interface CompareEntry {
  id: string;
  title: string;
}

const STORAGE_KEY = "findlydeal:compare";

/**
 * Cached serialised snapshot.
 *
 * `useSyncExternalStore` needs `getSnapshot` to return a referentially stable
 * value between changes, so the raw string is cached and storage is only
 * re-read when something writes.
 */
let snapshot = "[]";
let hydrated = false;
const listeners = new Set<() => void>();

function readStorage(): string {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    // Private mode or blocked storage: degrade to an empty basket, never throw.
    return "[]";
  }
}

function notify(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(onChange: () => void): () => void {
  if (!hydrated) {
    snapshot = readStorage();
    hydrated = true;
  }
  listeners.add(onChange);

  // Another tab changed the basket.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    snapshot = readStorage();
    notify();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): string {
  return snapshot;
}

/** The server has no session storage: it always renders an empty basket. */
function getServerSnapshot(): string {
  return "[]";
}

function write(entries: CompareEntry[]): void {
  snapshot = JSON.stringify(entries);
  try {
    window.sessionStorage.setItem(STORAGE_KEY, snapshot);
  } catch {
    // Storage unavailable: the basket still works for this page view.
  }
  notify();
}

export function useCompare() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const selected = useMemo<CompareEntry[]>(() => {
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(
          (entry): entry is CompareEntry =>
            typeof entry === "object" &&
            entry !== null &&
            typeof (entry as CompareEntry).id === "string" &&
            typeof (entry as CompareEntry).title === "string",
        )
        .slice(0, MAX_COMPARED_PRODUCTS);
    } catch {
      return [];
    }
  }, [raw]);

  const isSelected = useCallback(
    (id: string) => selected.some((entry) => entry.id === id),
    [selected],
  );

  const isFull = selected.length >= MAX_COMPARED_PRODUCTS;
  /** A comparison needs at least two products to say anything. */
  const canCompare = selected.length >= MIN_COMPARED_PRODUCTS;

  const toggle = useCallback(
    (entry: CompareEntry) => {
      if (selected.some((item) => item.id === entry.id)) {
        write(selected.filter((item) => item.id !== entry.id));
        return;
      }
      if (selected.length >= MAX_COMPARED_PRODUCTS) return;
      write([...selected, entry]);
    },
    [selected],
  );

  const remove = useCallback(
    (id: string) => write(selected.filter((item) => item.id !== id)),
    [selected],
  );

  const clear = useCallback(() => write([]), []);

  /** Shareable link to the comparison page, carrying the current basket. */
  const compareHref = `/compare?${SEARCH_PARAM_KEYS.compare}=${selected
    .map((entry) => encodeURIComponent(entry.id))
    .join(",")}`;

  return { selected, isSelected, isFull, canCompare, toggle, remove, clear, compareHref };
}
