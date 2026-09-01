import Link from "next/link";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { categories } from "@/config/categories";
import { footerNav, siteConfig } from "@/config/site";
import {
  PUBLIC_UI_LOCALES,
  UI_LOCALE_LABELS,
  getDictionary,
  localePath,
  type UiLocale,
} from "@/i18n";

/** Global footer. Link groups come from `@/config`, never hard-coded here. */
export function Footer({ locale }: { locale: UiLocale }) {
  const dictionary = getDictionary(locale);
  const path = (href: string) => localePath(locale, href);
  return (
    <footer className="mt-auto bg-ink text-white/70">
      <Container className="grid gap-10 py-16 md:grid-cols-4">
        <div className="space-y-4">
          <Logo locale={locale} inverted />
          <p className="max-w-xs text-sm leading-relaxed">{dictionary.footer.tagline}</p>
        </div>

        <FooterColumn title={dictionary.nav.categories}>
          {/*
          Every category, not a slice: the mega-menu that also links them lives
          in a Radix portal and never reaches the served HTML, so the footer is
          what actually makes each category crawlable from every page. Three of
          them had a single inbound link before this.
        */}
          {categories.map((category) => (
            <FooterLink key={category.slug} href={path(`/category/${category.slug}`)}>
              {category.name}
            </FooterLink>
          ))}
        </FooterColumn>

        {footerNav.map((group) => (
          <FooterColumn key={group.title} title={group.title}>
            {group.items.map((item) => (
              <FooterLink
                key={item.href}
                href={item.external ? item.href : path(item.href)}
                external={item.external}
              >
                {item.title}
              </FooterLink>
            ))}
          </FooterColumn>
        ))}
      </Container>

      <Container>
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>

          {/*
            The header's switcher is a Radix menu, so its links never reach the
            served HTML — same limitation as the category mega-menu, and the
            same answer: repeat them here, where they are plain anchors. The
            other language then stays reachable without JavaScript.
          */}
          {/*
            Only the published languages. While there is a single one this is a
            plain label rather than a list of one link.
          */}
          <nav aria-label={dictionary.nav.languageLabel} className="flex items-center gap-3">
            {PUBLIC_UI_LOCALES.map((other) => (
              <Link
                key={other}
                href={localePath(other, "/")}
                hrefLang={other}
                aria-current={other === locale ? "true" : undefined}
                className={other === locale ? "text-white" : "transition-colors hover:text-white"}
              >
                {UI_LOCALE_LABELS[other]}
              </Link>
            ))}
          </nav>
          <p className="sm:text-right">
            {siteConfig.name} peut percevoir une commission sur certains achats via des liens
            affiliés, sans surcoût pour vous.
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      {/* h2, not h3: nothing on the page introduces these groups, so an h3
          leaves the outline jumping straight from the page title. */}
      <h2 className="font-display text-xs font-semibold tracking-wider text-white uppercase">
        {title}
      </h2>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="text-sm transition-colors hover:text-white"
        {...(external ? { rel: "noopener noreferrer" } : {})}
      >
        {children}
      </Link>
    </li>
  );
}
