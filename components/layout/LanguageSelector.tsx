"use client";

import { Globe } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useLanguage, type Language } from "@/components/providers/LanguageProvider";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const selectLanguage = (value: Language) => {
    setLanguage(value);
    setOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setOpen((value) => !value)}
        className="gap-1.5 text-muted-foreground hover:text-foreground"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Globe aria-hidden="true" className="size-4" />
        <span>{language}</span>
      </Button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 min-w-36 rounded-xl border border-border bg-popover p-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => selectLanguage("EN")}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-popover-foreground hover:bg-accent"
          >
            🇬🇧 English
          </button>

          <button
            type="button"
            role="menuitem"
            onClick={() => selectLanguage("PT")}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-popover-foreground hover:bg-accent"
          >
            🇵🇹 Português
          </button>
        </div>
      )}
    </div>
  );
}