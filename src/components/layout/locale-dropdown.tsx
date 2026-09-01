"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PUBLIC_UI_LOCALES, UI_LOCALE_LABELS, localePath, splitLocale } from "@/i18n";
import { useDictionary } from "@/i18n/use-locale";
import { cn } from "@/lib/utils";

/**
 * The actual language menu, mounted only when more than one locale is public.
 *
 * It is a Client Component because it keeps the current path *and* its query
 * string when switching: dropping a visitor who was three filters deep into a
 * search back onto the home page in another language is the classic way these
 * annoy people. Real `<Link>`s rather than a router push, so a middle-click
 * opens the other language in a tab.
 */
export function LocaleDropdown({ className }: { className?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dictionary = useDictionary();

  const { locale: current, path } = splitLocale(pathname);
  const query = searchParams.toString();
  const suffix = query ? `?${query}` : "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={dictionary.nav.switchLanguage}
        className={cn(
          "flex cursor-pointer items-center gap-1 rounded-md px-1 py-1 text-xs font-medium tracking-wide text-muted-foreground/80 uppercase transition-colors outline-none hover:text-primary focus-visible:ring-3 focus-visible:ring-ring data-[state=open]:text-primary",
          className,
        )}
      >
        <Languages className="size-3.5" aria-hidden />
        {current}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={12} className="min-w-40">
        {PUBLIC_UI_LOCALES.map((locale) => (
          <DropdownMenuItem key={locale} asChild>
            <Link
              href={`${localePath(locale, path)}${suffix}`}
              hrefLang={locale}
              aria-current={locale === current ? "true" : undefined}
              className={cn("cursor-pointer", locale === current && "font-medium text-primary")}
            >
              {UI_LOCALE_LABELS[locale]}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
