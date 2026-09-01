import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Navbar } from "@/components/layout/navbar";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { UiLocale } from "@/i18n";

/**
 * Global header: hamburger, logo, navigation.
 *
 * No account controls: Findlydeal compares prices and sends visitors to the
 * marketplaces, so there is nothing to sign in to. Adding a sign-up button for
 * a feature that does not exist costs a click and a broken promise.
 */
export function Header({ locale }: { locale: UiLocale }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <Container className="flex h-[72px] items-center gap-3">
        <MobileMenu />
        <Logo locale={locale} />

        <div className="ml-auto flex items-center gap-4">
          <Navbar />
          {/* Reads the query string to keep it when switching language, so it
              needs a boundary on statically prerendered pages. */}
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </Container>
    </header>
  );
}
