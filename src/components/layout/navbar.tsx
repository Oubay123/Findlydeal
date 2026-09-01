"use client";

import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { CategoryIcon } from "@/components/category/category-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/config/categories";
import { browseMenuGroups } from "@/config/menu";
import { mainNav } from "@/config/site";
import { useLocalePath, useUnprefixedPathname } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation.
 *
 * "Catégories" opens a panel rather than a flat list: a comparator is browsed
 * by universe *and* by state or budget, and a single column could not carry
 * both without becoming a scrollbar.
 */
export function Navbar() {
  const pathname = useUnprefixedPathname();
  const path = useLocalePath();
  const isBrowseActive = pathname.startsWith("/category") || pathname.startsWith("/search");

  return (
    <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex cursor-pointer items-center gap-1.5 text-[15px] transition-colors outline-none",
            "data-[state=open]:text-primary",
            isBrowseActive ? "font-medium text-primary" : "text-foreground/80 hover:text-primary",
          )}
        >
          Catégories
          <ChevronDown
            className="size-4 transition-transform duration-200 in-data-[state=open]:rotate-180"
            aria-hidden
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="start"
          sideOffset={16}
          className="w-[54rem] max-w-[calc(100vw-2rem)] p-0"
        >
          <div className="grid grid-cols-[1.6fr_1fr]">
            <div className="p-5">
              <MenuHeading>Tous les univers</MenuHeading>
              <ul className="mt-3 grid grid-cols-2 gap-1">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={path(`/category/${category.slug}`)}
                      className="group flex items-start gap-3 rounded-lg p-2.5 transition-colors hover:bg-accent"
                    >
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-primary">
                        <CategoryIcon name={category.icon} className="size-4.5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium transition-colors group-hover:text-primary">
                          {category.name}
                        </span>
                        <span className="line-clamp-1 block text-xs text-muted-foreground">
                          {category.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 rounded-r-lg border-l bg-cream p-5">
              {browseMenuGroups.map((group) => (
                <div key={group.title}>
                  <MenuHeading>{group.title}</MenuHeading>
                  <ul className="mt-2 space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={path(item.href)}
                          className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-white hover:text-primary"
                        >
                          {item.title}
                          <ChevronRight className="size-3.5 opacity-40" aria-hidden />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      {mainNav.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={path(item.href)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-[15px] transition-colors",
              isActive ? "font-medium text-primary" : "text-foreground/80 hover:text-primary",
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}

function MenuHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-display text-xs font-semibold tracking-wider text-muted-foreground uppercase">
      {children}
    </p>
  );
}
