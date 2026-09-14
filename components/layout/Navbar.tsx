import Link from "next/link";
import { Globe, Moon } from "lucide-react";

import { NavbarMobileMenu } from "@/components/layout/NavbarMobileMenu";
import { SearchBar } from "@/components/layout/SearchBar";
import { Button } from "@/components/ui/button";
import { mainNavLinks } from "@/constants/navigation";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 shadow-sm shadow-black/[0.02] backdrop-blur-lg supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="shrink-0 text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
        >
          Aurora
        </Link>

        <div className="hidden min-w-0 flex-1 md:block lg:max-w-md xl:max-w-lg">
          <SearchBar />
        </div>

        <nav
          aria-label="Main navigation"
          className="ml-auto hidden items-center gap-0.5 md:flex lg:gap-1"
        >
          {mainNavLinks.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              size="sm"
              render={<Link href={link.href} />}
            >
              {link.label}
            </Button>
          ))}

          <div className="mx-1 hidden h-4 w-px bg-border lg:block" aria-hidden="true" />

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5"
            aria-label="Select language"
          >
            <Globe aria-hidden="true" className="size-4" />
            <span className="hidden lg:inline">EN</span>
          </Button>

          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle dark mode"
          >
            <Moon aria-hidden="true" />
          </Button>

          <Button
            render={<Link href="/sign-in" />}
            size="sm"
            variant="outline"
            className="ml-1"
          >
            Sign In
          </Button>
        </nav>

        <div className="ml-auto md:hidden">
          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}
