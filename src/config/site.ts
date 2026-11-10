import type { NavItem } from "@/types";

/** The canonical origin. Every absolute URL on the site derives from it. */
const PRODUCTION_URL = "https://findlydeal.com";

/**
 * Resolves the site origin.
 *
 * The default is the **production https origin**, not localhost. That ordering
 * matters: an SEO audit found 56 pages whose canonical pointed at `http://`,
 * because the previous default was `http://localhost:3000` and the environment
 * variable was never set in production. Google reads such a canonical as "the
 * official version of this page is the insecure one", which is enough to break
 * indexing across the whole site.
 *
 * `NEXT_PUBLIC_SITE_URL` still overrides it, for preview deployments and for
 * local work — set it to `http://localhost:3000` in `.env.local` if you need
 * absolute URLs to point at your machine.
 */
function resolveSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return PRODUCTION_URL;

  // A malformed value would poison every canonical, so it is never trusted blindly.
  try {
    const url = new URL(configured);
    if (url.protocol !== "https:" && url.hostname !== "localhost") {
      throw new Error(
        `NEXT_PUBLIC_SITE_URL must use https (got "${configured}"). ` +
          "An http canonical tells search engines to index the insecure version.",
      );
    }
    // Normalised without a trailing slash: `new URL(path, origin)` depends on it.
    return url.origin;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(`NEXT_PUBLIC_SITE_URL is not a valid URL: "${configured}"`);
    }
    throw error;
  }
}

/**
 * Single source of truth for the site identity and its navigation.
 * Anything displayed in the header, the footer or the <head> comes from here.
 */
export const siteConfig = {
  name: "Findlydeal",
  tagline: "Le comparateur de prix du neuf, du reconditionné et de l'occasion",
  /**
   * The one sentence that describes the brand everywhere: meta description,
   * Organization and WebSite markup, hero. Answer engines piece an entity
   * together from such sentences, so it stays factual (no "dozens of
   * marketplaces" while there are four) and identical on every surface.
   */
  description:
    "Findlydeal compare les prix du neuf, du reconditionné et de l'occasion entre de nombreux vendeurs, en une seule recherche, et signale les offres nettement sous le prix médian.",
  url: resolveSiteUrl(),
  locale: "fr",
  contactEmail: "contact@findlydeal.com",
  /**
   * Who publishes the site, shown on the legal notice (required in France by
   * LCEN art. 6 III and in Switzerland by LCD art. 3 al. 1 let. s).
   * Fill in every field: while `name` is empty the notice says the
   * identification is being completed, which is not compliant.
   */
  publisher: {
    /** Company name, or first and last name for a sole trader. */
    name: "",
    /** Legal form and registration number (IDE/UID, SIREN…), if any. */
    legalForm: "",
    /** Full postal address. */
    address: "",
    /** Publication director (a natural person). */
    director: "",
  },
  /** Who hosts the site: Cloudflare Workers. */
  host: {
    name: "Cloudflare, Inc.",
    address: "101 Townsend Street, San Francisco, CA 94107, États-Unis",
    website: "https://www.cloudflare.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Primary navigation, rendered in the header and the mobile menu. */
export const mainNav: NavItem[] = [
  { title: "Comment ça marche", href: "/how-it-works" },
  { title: "Blog", href: "/blog" },
  { title: "FAQ", href: "/faq" },
];

/** Footer link groups. Add a group here rather than in the Footer component. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Findlydeal",
    items: [
      { title: "Toutes les catégories", href: "/categories" },
      { title: "À propos", href: "/about" },
      { title: "Comment ça marche", href: "/how-it-works" },
      { title: "Baromètre des prix", href: "/barometre-des-prix" },
      { title: "Méthodologie et classement", href: "/methodologie" },
      { title: "FAQ", href: "/faq" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: `mailto:${siteConfig.contactEmail}`, external: true },
    ],
  },
  {
    title: "Légal",
    items: [
      { title: "Confidentialité", href: "/legal/privacy" },
      { title: "Conditions d'utilisation", href: "/legal/terms" },
      { title: "Cookies", href: "/legal/cookies" },
      { title: "Mentions légales", href: "/legal/legal-notice" },
      { title: "Affiliation", href: "/legal/affiliate-disclosure" },
    ],
  },
];
