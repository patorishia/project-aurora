"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Menu } from "lucide-react";

import { SearchBar } from "@/components/layout/SearchBar";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  useLanguage,
  type Language,
} from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function NavbarMobileMenu() {
  const { language, setLanguage, messages } = useLanguage();

  const toggleLanguage = () => {
    const nextLanguage: Language = language === "EN" ? "PT" : "EN";
    setLanguage(nextLanguage);
  };

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
          />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-full max-w-sm p-0"
      >
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="flex items-center gap-2 text-left">
            <Image
              src="/AuroraLogo.svg"
              alt=""
              width={32}
              height={32}
            />
            <span>Aurora</span>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <SearchBar />

          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-1"
          >
            <Link
              href="/stores"
              className="flex h-11 w-full items-center rounded-md px-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {messages.Navbar.stores}
            </Link>

            <Link
              href="/categories"
              className="flex h-11 w-full items-center rounded-md px-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {messages.Navbar.categories}
            </Link>

            <Link
              href="/deals"
              className="flex h-11 w-full items-center rounded-md px-3 text-base text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {messages.Navbar.deals}
            </Link>


            <Separator className="my-2" />

            <Button
              type="button"
              variant="ghost"
              className="h-11 w-full justify-start gap-3 px-3"
              aria-label={messages.Navbar.language}
              onClick={toggleLanguage}
            >
              <Globe className="size-4" />

              <span>{messages.Navbar.language}</span>

              <span className="ml-auto text-sm text-muted-foreground">
                {language}
              </span>
            </Button>

            <div className="flex h-11 items-center justify-between px-3">
              <span className="text-sm">
                {language === "EN" ? "Theme" : "Tema"}
              </span>

              <ThemeToggle />
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}