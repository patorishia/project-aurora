import { TrendingStoreCard } from "@/components/home/TrendingStoreCard";
import { HeroSearchBar } from "@/components/home/HeroSearchBar";
import { HeroTrustBadges } from "@/components/home/HeroTrustBadges";
import { trendingStores } from "@/constants/home";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--color-muted),transparent)]"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:max-w-4xl">
        <h1
          id="hero-heading"
          className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.1]"
        >
          Never pay full price again.
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:mt-6 sm:text-xl">
          Search thousands of verified coupons, deals and cashback offers from
          the world&apos;s most popular stores.
        </p>

        <HeroSearchBar className="mt-10 w-full sm:mt-12" />

        <div className="mt-12 w-full sm:mt-14">
          <p className="mb-4 text-sm font-medium text-muted-foreground">
            Trending stores
          </p>
          <ul
            aria-label="Trending stores"
            className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 md:grid-cols-6 [&::-webkit-scrollbar]:hidden"
          >
            {trendingStores.map((store) => (
              <li key={store.slug} className="shrink-0 sm:shrink">
                <TrendingStoreCard store={store} className="h-full w-full" />
              </li>
            ))}
          </ul>
        </div>

        <HeroTrustBadges className="mt-12 sm:mt-14" />
      </div>
    </section>
  );
}
