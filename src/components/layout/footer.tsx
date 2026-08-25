import Link from "next/link";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { categories } from "@/config/categories";
import { footerNav, siteConfig } from "@/config/site";

/** Global footer. Link groups come from `@/config`, never hard-coded here. */
export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-white/70">
      <Container className="grid gap-10 py-16 md:grid-cols-4">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-xs text-sm leading-relaxed">
            Le comparateur malin qui trouve les meilleures offres à votre place, sur toutes les
            plateformes.
          </p>
        </div>

        <FooterColumn title="Catégories">
          {categories.slice(0, 5).map((category) => (
            <FooterLink key={category.slug} href={`/category/${category.slug}`}>
              {category.name}
            </FooterLink>
          ))}
        </FooterColumn>

        {footerNav.map((group) => (
          <FooterColumn key={group.title} title={group.title}>
            {group.items.map((item) => (
              <FooterLink key={item.href} href={item.href} external={item.external}>
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
      <h3 className="font-display text-xs font-semibold tracking-wider text-white uppercase">
        {title}
      </h3>
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
