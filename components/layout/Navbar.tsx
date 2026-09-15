"use client";

import Link from "next/link";
import Image from "next/image";

import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { NavbarMobileMenu } from "@/components/layout/NavbarMobileMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { mainNavLinks } from "@/constants/navigation";

export function Navbar() {
  const { messages } = useLanguage();

  return (
    <header className="relative sticky top-0 z-50 w-full bg-background/70 backdrop-blur-xl">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-[#6C4FF6]/70 via-[#8A6BFA] to-[#31B86B]/70"
      />

      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Aurora home"
        >
          <Image
            src="/AuroraLogo.svg"
            alt=""
            width={32}
            height={32}
            className="transition-transform duration-300 group-hover:scale-105"
          />

          <span className="bg-linear-to-r from-[#6C4FF6] via-[#8A6BFA] to-[#31B86B] bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            Aurora
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex h-9 items-center justify-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {link.href === "/stores" && messages.Navbar.stores}
              {link.href === "/categories" && messages.Navbar.categories}
              {link.href === "/deals" && messages.Navbar.deals}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          <LanguageSelector />
          <ThemeToggle />
        </div>

        <div className="ml-auto md:hidden">
          <NavbarMobileMenu />
        </div>
      </div>
    </header>
  );
}