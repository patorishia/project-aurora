import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Tag } from "lucide-react";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

type StorePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function StorePage({
  params,
}: StorePageProps) {
  const { slug } = await params;

  const store = await prisma.store.findUnique({
    where: {
      slug,
    },
    include: {
      coupons: {
        where: {
          active: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!store) {
    notFound();
  }

  const couponCount = store.coupons.length;

  return (
    <main className="relative min-h-full overflow-hidden">
      {/* Subtle Aurora background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(108,79,246,0.08),transparent_60%)]"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        {/* Back */}
        <Link
          href="/stores"
          className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft
            aria-hidden="true"
            className="size-4 transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          All stores
        </Link>

        {/* Store header */}
        <section className="mt-8">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
            {/* Aurora accent */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-[#6C4FF6]/30 via-[#8A6BFA]/25 to-[#31B86B]/40"
            />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              {/* Store logo */}
              <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-muted/70">
                {store.logo ? (
                  <Image
                    src={store.logo}
                    alt={`${store.name} logo`}
                    fill
                    sizes="80px"
                    className="object-contain p-3"
                  />
                ) : (
                  <span className="text-xl font-semibold tracking-tight">
                    {store.name.slice(0, 2).toUpperCase()}
                  </span>
                )}
              </div>

              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {store.name}
                </h1>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Tag aria-hidden="true" className="size-3.5" />
                    {couponCount}{" "}
                    {couponCount === 1 ? "active coupon" : "active coupons"}
                  </span>

                  {store.website && (
                    <a
                      href={store.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
                    >
                      Visit store
                      <ExternalLink
                        aria-hidden="true"
                        className="size-3.5"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Coupons */}
        <section className="mt-12">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#6C4FF6]">
                Available now
              </p>

              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                Coupons and deals
              </h2>
            </div>
          </div>

          {couponCount === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-8 text-center">
              <p className="text-sm text-muted-foreground">
                No active coupons available right now.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {store.coupons.map((coupon) => (
                <article
                  key={coupon.id}
                  className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8A6BFA]/35 hover:shadow-lg hover:shadow-[#6C4FF6]/8 sm:p-6"
                >
                  {/* Aurora hover accents */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-[#6C4FF6]/7 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 -left-10 size-24 rounded-full bg-[#31B86B]/7 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold tracking-tight">
                          {coupon.title}
                        </h3>

                        {coupon.discount && (
                          <span className="rounded-full bg-[#31B86B]/10 px-2.5 py-1 text-xs font-medium text-[#23804d] dark:text-[#7FE0AC]">
                            {coupon.discount}
                          </span>
                        )}
                      </div>

                      {coupon.description && (
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {coupon.description}
                        </p>
                      )}

                      {coupon.code && (
                        <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-border bg-muted/40 px-3 py-2">
                          <span className="text-xs text-muted-foreground">
                            Code
                          </span>

                          <span className="font-mono text-sm font-medium tracking-wide">
                            {coupon.code}
                          </span>
                        </div>
                      )}
                    </div>

                    <a
                      href={coupon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
                    >
                      Get coupon
                      <ExternalLink
                        aria-hidden="true"
                        className="size-3.5"
                      />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}