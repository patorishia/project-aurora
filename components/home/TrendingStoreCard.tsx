import Link from "next/link";

import { cn } from "@/lib/utils";
import type { TrendingStore } from "@/constants/home";

type TrendingStoreCardProps = {
  store: TrendingStore;
  className?: string;
};

export function TrendingStoreCard({ store, className }: TrendingStoreCardProps) {
  return (
    <Link
      href={`/stores/${store.slug}`}
      className={cn(
        "group flex min-w-[7.5rem] snap-start flex-col items-center gap-3 rounded-2xl border border-border/50 bg-card p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-border hover:shadow-md sm:min-w-0",
        className
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-muted/80 text-xs font-semibold tracking-tight text-foreground transition-colors group-hover:bg-muted sm:size-12 sm:text-sm">
        {store.initials}
      </div>
      <span className="text-sm font-medium text-foreground">{store.name}</span>
    </Link>
  );
}
