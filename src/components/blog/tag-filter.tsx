import { LocaleLink } from "@/components/common/locale-link";
import { tagSlug } from "@/content/blog";
import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  /** Currently selected tag, or undefined for "all". */
  active?: string;
}

/**
 * Theme filter for the blog.
 *
 * Plain links to prerendered routes (`/blog/theme/reconditionne`) rather than
 * client-side state: each theme is a real, crawlable, cacheable page, and no
 * JavaScript ships for this component.
 */
export function TagFilter({ tags, active }: TagFilterProps) {
  return (
    <nav aria-label="Filtrer par thème">
      <ul className="flex flex-wrap gap-2">
        <li>
          <TagLink href="/blog" isActive={!active}>
            Tous les articles
          </TagLink>
        </li>
        {tags.map((tag) => (
          <li key={tag}>
            <TagLink href={`/blog/theme/${tagSlug(tag)}`} isActive={active === tag}>
              {tag}
            </TagLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TagLink({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <LocaleLink
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex rounded-full border px-3.5 py-1.5 text-sm transition-colors",
        isActive
          ? "border-transparent bg-primary font-medium text-primary-foreground"
          : "text-muted-foreground hover:border-primary/60 hover:text-primary",
      )}
    >
      {children}
    </LocaleLink>
  );
}
