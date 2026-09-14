import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type HeroSearchBarProps = {
  className?: string;
};

export function HeroSearchBar({ className }: HeroSearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        placeholder="Search stores (Nike, Amazon, Booking...)"
        aria-label="Search stores"
        className="h-14 rounded-2xl border-border/60 bg-background pl-13 text-base shadow-lg shadow-black/[0.04] transition-shadow placeholder:text-muted-foreground/70 focus-visible:shadow-xl focus-visible:shadow-black/[0.06] sm:h-16 sm:rounded-3xl sm:pl-14 sm:text-lg"
      />
    </div>
  );
}
