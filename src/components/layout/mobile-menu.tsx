"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Menu } from "lucide-react";
import { CategoryIcon } from "@/components/category/category-icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/config/categories";
import { browseMenuGroups } from "@/config/menu";
import { mainNav, siteConfig } from "@/config/site";
import { useLocalePath } from "@/i18n/use-locale";

/**
 * Navigation drawer, opened by the hamburger. Available at every breakpoint:
 * on desktop it is the shortcut to the full browse menu, on mobile it carries
 * the whole navigation. Mirrors the sections of the desktop panel so the two
 * never tell a different story.
 *
 * Measured, not assumed: splitting the Radix Dialog into a `next/dynamic`
 * chunk saved only 5 KB, because Next still ships the chunk of any client
 * component in the page's tree as an `async` script. Not worth an extra file
 * and a lost open animation, so it stays inline.
 */
export function MobileMenu() {
  const path = useLocalePath();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Ouvrir le menu"
          className="text-foreground/80 hover:bg-transparent hover:text-primary"
        >
          <Menu className="size-6" strokeWidth={2} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[21rem] gap-0 p-0">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="font-display">Parcourir</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto pb-8" aria-label="Navigation mobile">
          <Section title="Tous les univers">
            {categories.map((category) => (
              <Row key={category.slug} href={path(`/category/${category.slug}`)} onNavigate={close}>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-primary">
                  <CategoryIcon name={category.icon} className="size-4" />
                </span>
                {category.name}
              </Row>
            ))}
          </Section>

          {browseMenuGroups.map((group) => (
            <Section key={group.title} title={group.title}>
              {group.items.map((item) => (
                <Row key={item.href} href={path(item.href)} onNavigate={close}>
                  {item.title}
                </Row>
              ))}
            </Section>
          ))}

          <Section title={siteConfig.name}>
            {mainNav.map((item) => (
              <Row key={item.href} href={path(item.href)} onNavigate={close}>
                {item.title}
              </Row>
            ))}
            <Row href={path("/about")} onNavigate={close}>
              À propos
            </Row>
          </Section>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b py-3 last:border-b-0">
      <h2 className="px-5 pt-1 pb-2 font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {title}
      </h2>
      <ul>{children}</ul>
    </section>
  );
}

function Row({
  href,
  onNavigate,
  children,
}: {
  href: string;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onNavigate}
        className="flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-accent hover:text-primary"
      >
        <span className="flex flex-1 items-center gap-3">{children}</span>
        <ChevronRight className="size-4 shrink-0 opacity-35" aria-hidden />
      </Link>
    </li>
  );
}
