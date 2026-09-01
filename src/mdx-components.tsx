import { LocaleLink } from "@/components/common/locale-link";
import type { MDXComponents } from "mdx/types";
import { ArticleFigure } from "@/components/blog/article-figure";
import { ArticleProduct } from "@/components/blog/article-product";
import { ArticleSummary } from "@/components/blog/article-summary";
import { ScrollableTable } from "@/components/common/scrollable-table";
import { SmartImage } from "@/components/common/smart-image";

/**
 * Brand styling for every MDX article body.
 *
 * Required by `@next/mdx` with the App Router. Mapping the HTML that markdown
 * produces onto our own classes avoids pulling in a typography plugin and
 * keeps article text visually identical to the rest of the site.
 *
 * Every tag markdown can emit is mapped, not only the ones today's articles
 * happen to use: an unmapped tag silently falls back to browser defaults, and
 * that is exactly the kind of breakage nobody notices until it ships.
 *
 * Vertical rhythm, kept deliberately regular:
 *   h2 mt-12 · h3 mt-8 · h4 mt-6 · everything else my-4/my-6
 */
const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 scroll-mt-24 font-display text-2xl leading-tight font-bold">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 scroll-mt-24 font-display text-lg leading-snug font-semibold">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mt-6 mb-2 scroll-mt-24 font-display text-base font-semibold">{children}</h4>
  ),

  p: ({ children }) => <p className="my-4 leading-relaxed text-foreground/80">{children}</p>,

  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-5 leading-relaxed text-foreground/80 marker:text-primary/70">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 leading-relaxed text-foreground/80 marker:text-primary/70">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,

  strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,

  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-xl border-l-4 border-primary bg-cream px-5 py-4 text-sm text-foreground/90 italic [&>p]:my-0">
      {children}
    </blockquote>
  ),

  a: ({ href, children }) => {
    const isExternal = Boolean(href?.startsWith("http"));
    return isExternal ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="break-words text-primary underline underline-offset-4"
      >
        {children}
      </a>
    ) : (
      <LocaleLink
        href={href ?? "#"}
        className="break-words text-primary underline underline-offset-4"
      >
        {children}
      </LocaleLink>
    );
  },

  hr: () => <hr className="my-10" />,

  // `break-words` matters: a long token in inline code is a classic cause of
  // horizontal overflow on a phone.
  code: ({ children }) => (
    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] break-words">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-xl bg-ink p-4 text-sm text-white/90 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit">
      {children}
    </pre>
  ),

  table: ({ children }) => <ScrollableTable>{children}</ScrollableTable>,
  thead: ({ children }) => <thead className="bg-cream">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b px-4 py-3 text-left text-xs font-semibold whitespace-nowrap">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b px-4 py-3 align-top text-foreground/80 last:border-b-0">{children}</td>
  ),

  /**
   * Custom blocks available in any article without an import.
   *
   *   <ArticleSummary points={["…", "…"]} />
   *   <ArticleFigure src="…" alt="…" caption="…" credit="…" />
   *   <ArticleProduct slug="apple-iphone-13-128go-minuit" />
   */
  ArticleSummary,
  ArticleFigure,
  ArticleProduct,

  img: (props) => (
    <SmartImage
      {...(props as { src: string; alt: string })}
      width={800}
      height={450}
      context="blogCover"
      className="my-6 h-auto w-full rounded-xl"
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
