"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { CategoryIcon } from "@/components/category/category-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { productCategories as categories } from "@/config/categories";
import { mainNav } from "@/config/site";
import { useLocalePath, useUnprefixedPathname } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation.
 *
 * "Catégories" opens the list of product universes; the two ways of shopping
 * second hand (refurbished, used) are direct links next to it.
 */
export function Navbar() {
  const pathname = useUnprefixedPathname();
  const path = useLocalePath();
  const isBrowseActive = pathname.startsWith("/category") || pathname.startsWith("/search");

  return (
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
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

        <DropdownMenuContent align="start" sideOffset={14} className="w-[30rem] p-3">
          <ul className="grid grid-cols-2 gap-0.5">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={path(`/category/${category.slug}`)}
                  className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent hover:text-primary"
                >
                  <CategoryIcon
                    name={category.icon}
                    className="size-4 text-muted-foreground"
                    strokeWidth={1.75}
                  />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={path("/categories")}
            className="mt-2 block border-t px-2.5 pt-3 pb-1 text-sm font-medium text-primary hover:underline"
          >
            Toutes les catégories
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      {mainNav.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
