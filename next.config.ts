import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

    // next/image refuses any hostname that is not declared here.
    remotePatterns: [
      {
        // Photos of the demonstration catalogue (see src/lib/utils/images.ts).
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // Add one entry per marketplace CDN as its adapter goes live:
      // { protocol: "https", hostname: "i.ebayimg.com" },
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

// Deployment target: Cloudflare Workers via @opennextjs/cloudflare.
// Nothing to configure yet - the adapter is added later with:
//   npm i -D @opennextjs/cloudflare wrangler
//   npx @opennextjs/cloudflare  (generates open-next.config.ts + wrangler.jsonc)
// Until then, keep server code runtime-agnostic: no `fs`, no `path`, no
// Node-only globals outside of build scripts.
export default withMDX(nextConfig);
