import { prisma } from "@/lib/prisma";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const stores = query
    ? await prisma.store.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              slug: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
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
      })
    : [];

  const coupons = query
    ? await prisma.coupon.findMany({
        where: {
          active: true,
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          store: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    : [];

  const storeCouponIds = new Set(
    stores.flatMap((store) => store.coupons.map((coupon) => coupon.id))
  );

  const additionalCoupons = coupons.filter(
    (coupon) => !storeCouponIds.has(coupon.id)
  );

  const totalResults =
    stores.reduce((total, store) => total + store.coupons.length, 0) +
    additionalCoupons.length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">
          Search results
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {query ? `Results for "${query}"` : "Search coupons and stores"}
        </h1>

        {query && (
          <p className="mt-2 text-muted-foreground">
            {totalResults}{" "}
            {totalResults === 1 ? "result" : "results"} found
          </p>
        )}
      </div>

      {!query && (
        <div className="mt-10 rounded-2xl border border-border/60 bg-muted/30 p-8 text-center">
          <p className="text-muted-foreground">
            Enter a store or coupon name to start searching.
          </p>
        </div>
      )}

      {query && totalResults === 0 && (
        <div className="mt-10 rounded-2xl border border-border/60 bg-muted/30 p-8 text-center">
          <h2 className="text-lg font-medium">No results found</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any stores or coupons matching "{query}".
          </p>
        </div>
      )}

      {stores.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Stores</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {stores.map((store) => (
              <article
                key={store.id}
                className="rounded-2xl border border-border/60 bg-background p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{store.name}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {store.coupons.length}{" "}
                      {store.coupons.length === 1 ? "coupon" : "coupons"}
                    </p>
                  </div>

                  {store.coupons.some((coupon) => coupon.verified) && (
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      Verified
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-3">
                  {store.coupons.map((coupon) => (
                    <div
                      key={coupon.id}
                      className="rounded-xl bg-muted/50 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-medium">{coupon.title}</h4>

                          {coupon.description && (
                            <p className="mt-1 text-sm text-muted-foreground">
                              {coupon.description}
                            </p>
                          )}
                        </div>

                        {coupon.discount && (
                          <span className="shrink-0 text-sm font-semibold">
                            {coupon.discount}
                          </span>
                        )}
                      </div>

                      {coupon.code && (
                        <div className="mt-3 rounded-lg border border-dashed border-border px-3 py-2 text-center font-mono text-sm">
                          {coupon.code}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {additionalCoupons.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Coupons</h2>

          <div className="mt-4 space-y-3">
            {additionalCoupons.map((coupon) => (
              <article
                key={coupon.id}
                className="rounded-2xl border border-border/60 bg-background p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {coupon.store.name}
                    </p>

                    <h3 className="mt-1 font-semibold">{coupon.title}</h3>

                    {coupon.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {coupon.description}
                      </p>
                    )}
                  </div>

                  {coupon.discount && (
                    <span className="shrink-0 font-semibold">
                      {coupon.discount}
                    </span>
                  )}
                </div>

                {coupon.code && (
                  <div className="mt-4 rounded-lg border border-dashed border-border px-3 py-2 text-center font-mono text-sm">
                    {coupon.code}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}