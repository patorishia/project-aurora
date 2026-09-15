import Link from "next/link";

import { cn } from "@/lib/utils";
import type { TrendingStore } from "@/constants/home";

type TrendingStoreCardProps = {
  store: TrendingStore;
  className?: string;
};

export function TrendingStoreCard({
  store,
  className,
}: TrendingStoreCardProps) {
  return (
    <Link
      href={`/stores/${store.slug}`}
      className={cn(
        "group relative flex min-w-[7.5rem] snap-start flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8A6BFA]/40 hover:shadow-lg hover:shadow-[#6C4FF6]/10 sm:min-w-0",
        className,
      )}
    >
      {/* Subtle Aurora glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-8 size-20 rounded-full bg-[#6C4FF6]/8 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -left-8 size-20 rounded-full bg-[#31B86B]/8 blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Store logo */}
      <div className="relative flex size-11 items-center justify-center rounded-xl bg-muted/80 text-xs font-semibold tracking-tight text-foreground sm:size-12">
        {store.initials}
      </div>

      {/* Store name */}
      <span className="relative text-sm font-medium text-foreground transition-all duration-300 group-hover:bg-linear-to-r group-hover:from-[#6C4FF6] group-hover:via-[#8A6BFA] group-hover:to-[#31B86B] group-hover:bg-clip-text group-hover:text-transparent">
        {store.name}
      </span>
    </Link>
  );
}