import { Container } from "@/components/common/container";
import { Logo } from "@/components/common/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { Navbar } from "@/components/layout/navbar";

/**
 * Global header: hamburger, logo, navigation.
 *
 * No account controls: Findlydeal compares prices and sends visitors to the
 * marketplaces, so there is nothing to sign in to. Adding a sign-up button for
 * a feature that does not exist costs a click and a broken promise.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <Container className="flex h-[72px] items-center gap-3">
        <MobileMenu />
        <Logo />

        <div className="ml-auto">
          <Navbar />
        </div>
      </Container>
    </header>
  );
}
