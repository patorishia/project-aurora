import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  className?: string;
  inputClassName?: string;
};

export function SearchBar({ className, inputClassName }: SearchBarProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
      <Input
        type="search"
        placeholder="Search coupons, stores, deals..."
        aria-label="Search coupons and deals"
        className={cn(
          "h-10 border-transparent bg-muted/60 pl-9 shadow-none focus-visible:border-input focus-visible:bg-background",
          inputClassName
        )}
      />
    </div>
  );
}
