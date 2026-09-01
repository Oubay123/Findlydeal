import { Suspense } from "react";
import { Container } from "@/components/common/container";
import { HeroSlideshow } from "@/components/home/hero-slideshow";
import { SearchBar } from "@/components/search/search-bar";
import { siteConfig } from "@/config/site";
import { unsplash } from "@/lib/utils/images";

/**
 * Above-the-fold section.
 *
 * The backdrop cycles through one photo per universe covered by the site, so
 * the promise ("partout") is shown rather than claimed. Two layers sit above
 * the photos: a dark scrim that guarantees text contrast whatever the current
 * image, and the warm brand glows.
 */
const HERO_IMAGES = [
  unsplash("photo-1441986300917-64674bd600d8", 1920), // boutique
  unsplash("photo-1519389950473-47ba0277781c", 1920), // tech
  unsplash("photo-1560769629-975ec94e6a86", 1920), // mode
  unsplash("photo-1616486338812-3dadae4b4ace", 1920), // meubles
  unsplash("photo-1524805444758-089113d48a6d", 1920), // montres
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <HeroSlideshow images={HERO_IMAGES} />

      <div aria-hidden className="absolute inset-0 -z-10 bg-ink/78" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(60% 55% at 22% 12%, rgba(232,118,58,0.32) 0%, transparent 60%), radial-gradient(55% 60% at 82% 88%, rgba(232,118,58,0.20) 0%, transparent 62%)",
        }}
      />

      <Container className="flex flex-col items-center gap-7 py-24 text-center sm:py-32">
        <h1 className="max-w-4xl text-4xl leading-[1.12] font-bold text-balance text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
          Trouvez la meilleure affaire, <span className="text-brand-400">partout</span>, en une
          seule recherche.
        </h1>

        <p className="max-w-2xl text-base leading-relaxed text-pretty text-white/80">
          {siteConfig.description}
        </p>

        <div className="mt-2 w-full max-w-2xl">
          <Suspense fallback={null}>
            <SearchBar variant="hero" autoFocus />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
