import Image from "next/image";
import Link from "next/link";
import { Search, Tag } from "lucide-react";

import { prisma } from "@/lib/prisma";

type StoresPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function StoresPage({
  searchParams,
}: StoresPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const stores = await prisma.store.findMany({
    where: query
      ? {
          name: {
            contains: query,
            mode: "insensitive",
          },
        }
      : undefined,
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          coupons: {
            where: {
              active: true,
            },
          },
        },
      },
    },
  });

  return (
    <main className="relative min-h-full overflow-hidden">
      {/* Subtle Aurora background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(circle_at_50%_0%,rgba(108,79,246,0.07),transparent_62%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Header */}
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-[#6C4FF6]">
            Browse stores
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Stores
          </h1>

          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Find coupons and deals from your favorite stores.
          </p>
        </section>

        {/* Search */}
        <section className="mx-auto mt-8 max-w-xl">
          <form
            action="/stores"
            method="GET"
            className="relative"
          >
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search stores..."
              aria-label="Search stores"
              className="h-12 w-full rounded-2xl border border-border/60 bg-background pl-12 pr-4 text-sm shadow-sm outline-none transition-shadow placeholder:text-muted-foreground/70 focus:border-[#8A6BFA]/40 focus:ring-2 focus:ring-[#8A6BFA]/10"
            />
          </form>
        </section>

        {/* Results */}
        <section className="mt-12">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">
                {query ? `Stores matching "${query}"` : "All stores"}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {stores.length}{" "}
                {stores.length === 1 ? "store" : "stores"}
              </p>
            </div>
          </div>

          {stores.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-10 text-center">
              <p className="font-medium">No stores found</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Try searching for a different store.
              </p>

              {query && (
                <Link
                  href="/stores"
                  className="mt-4 inline-flex text-sm font-medium text-[#6C4FF6] hover:underline"
                >
                  View all stores
                </Link>
              )}
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {stores.map((store) => {
                const couponCount = store._count.coupons;

                return (
                  <Link
                    key={store.id}
                    href={`/stores/${store.slug}`}
                    className="group relative flex min-h-44 flex-col overflow-hidden rounded-2xl border border-border/50 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8A6BFA]/40 hover:shadow-lg hover:shadow-[#6C4FF6]/10"
                  >
                    {/* Aurora hover glow */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-[#6C4FF6]/8 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-10 -left-10 size-24 rounded-full bg-[#31B86B]/8 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />

                    {/* Logo */}
                    <div className="relative flex size-14 items-center justify-center overflow-hidden rounded-xl border border-border/60 bg-muted/70">
                      {store.logo ? (
                        <Image
                          src={store.logo}
                          alt={`${store.name} logo`}
                          fill
                          sizes="56px"
                          className="object-contain p-2"
                        />
                      ) : (
                        <span className="text-sm font-semibold tracking-tight text-foreground">
                          {store.name.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Store info */}
                    <div className="relative mt-auto pt-6">
                      <h3 className="text-sm font-semibold tracking-tight transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#6C4FF6] group-hover:via-[#8A6BFA] group-hover:to-[#31B86B] group-hover:bg-clip-text group-hover:text-transparent">
                        {store.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Tag
                          aria-hidden="true"
                          className="size-3.5"
                        />

                        <span>
                          {couponCount}{" "}
                          {couponCount === 1 ? "coupon" : "coupons"}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}