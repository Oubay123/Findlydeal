import Link from "next/link";
import type { ComponentProps } from "react";
import { serverPath } from "@/i18n/server";

type LocaleLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Site-relative path without a locale prefix, e.g. `/search?q=montre`. */
  href: string;
};

/**
 * `next/link` with the current locale prefixed automatically.
 *
 * Every internal link in a Server Component goes through this. The alternative
 * was prefixing at each of the seventy-odd call sites, and the failure mode
 * there is silent: one forgotten `/search` drops a visitor browsing in English
 * back into the French tree, and nothing warns you — the link still works.
 *
 * Anything that is not site-relative (`mailto:`, `https://`, `#anchor`) is
 * passed through untouched.
 *
 * Client Components cannot use this, since it reads the route via
 * `next/root-params`. They call `useLocalePath()` from `@/i18n/use-locale`
 * instead, which resolves the same value from the pathname.
 */
export async function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const resolved = href.startsWith("/") ? await serverPath(href) : href;
  return <Link href={resolved} {...props} />;
}
