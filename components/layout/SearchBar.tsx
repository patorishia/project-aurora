"use client";

import { Search } from "lucide-react";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  className?: string;
  inputClassName?: string;
};

export function SearchBar({
  className,
  inputClassName,
}: SearchBarProps) {
  const { messages } = useLanguage();

  return (
    <div className={cn("relative w-full", className)}>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        type="search"
        placeholder={messages.Search.placeholder}
        aria-label={messages.Search.ariaLabel}
        className={cn(
          "h-10 border-transparent bg-muted/60 pl-9 shadow-none focus-visible:border-input focus-visible:bg-background",
          inputClassName,
        )}
      />
    </div>
  );
}