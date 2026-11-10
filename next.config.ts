import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Security headers sent with every response.
 *
 * The Content-Security-Policy allows exactly what the site loads: its own
 * files, product photos (eBay listings, Unsplash for editorial covers) and
 * the YouTube player a visitor may start on a product page. `'unsafe-inline'`
 * stays on scripts and styles because Next.js inlines its bootstrap data and
 * the JSON-LD blocks; removing it needs per-request nonces, which would
 * forbid caching the static pages. No third-party script is allowed.
 *
 * When a marketplace CDN is added to `images.remotePatterns`, add it to
 * `img-src` here as well.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ebayimg.com https://images.unsplash.com https://img.youtube.com",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  // Two years, subdomains included: the site is HTTPS only.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Older browsers that ignore `frame-ancestors`.
  { key: "X-Frame-Options", value: "DENY" },
  // Marketplaces see that the visit comes from findlydeal.com, not which page.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Do not advertise the framework.
  poweredByHeader: false,

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // Blog articles are `.mdx` files imported from `src/content/blog/`.
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  experimental: {
    /**
     * `lucide-react` is optimised by Next out of the box; `radix-ui` — the
     * unified package shadcn/ui now imports from — is not. Without this, a
     * single `import { Slot } from "radix-ui"` reaches through the barrel.
     */
    optimizePackageImports: ["radix-ui"],
  },

  images: {
    // Served when the browser advertises support; both are far lighter than
    // the source JPEG. AVIF first, WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    // Breakpoints next/image may generate. Trimmed to what the layouts
    // actually use, so the cache is not fragmented across unused widths.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 220, 256, 384],
    // Remote photos are immutable (the URL carries the transform), so they
    // can be cached for a long time.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // The optimiser only ever serves raster photos: no SVG (script vector),
    // and its responses cannot be framed or run anything.
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // next/image refuses any hostname that is not declared here.
    remotePatterns: [
      {
        // Photos of the demonstration catalogue (see src/lib/utils/images.ts).
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        // eBay listing photos, as returned by the Browse API.
        protocol: "https",
        hostname: "i.ebayimg.com",
        pathname: "/**",
      },
      // Add one entry per marketplace CDN as its adapter goes live:
      // { protocol: "https", hostname: "d1eh9yux7w8iql.cloudfront.net" }, // Back Market
      // { protocol: "https", hostname: "secure.img1-fg.wfcdn.com" },      // Wayfair
    ],
  },
};

const withMDX = createMDX({
  options: {
    /**
     * GitHub Flavored Markdown. Without it MDX is plain CommonMark, which has
     * no tables: the pipe rows in the articles were rendering as literal text.
     * Also brings strikethrough, task lists and bare-URL autolinking.
     *
     * Named as a string because Turbopack cannot pass JavaScript functions
     * across into Rust.
     */
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [],
  },
});

// Deployment target: Cloudflare Workers via @opennextjs/cloudflare
// (see open-next.config.ts and wrangler.jsonc). Keep server code
// runtime-agnostic: no `fs`, no `path`, no Node-only globals outside of build
// scripts.
export default withMDX(nextConfig);
