import type { NavItem } from "@/types";

/**
 * Single source of truth for the site identity and its navigation.
 * Anything displayed in the header, the footer or the <head> comes from here.
 */
export const siteConfig = {
  name: "Findlydeal",
  tagline: "Le comparateur de prix multi-plateformes",
  description:
    "Findlydeal compare les prix sur des dizaines de marketplaces, dans toutes les langues, pour vous faire économiser sans effort.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "fr",
  contactEmail: "contact@findlydeal.com",
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
      { title: "À propos", href: "/about" },
      { title: "Comment ça marche", href: "/how-it-works" },
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
