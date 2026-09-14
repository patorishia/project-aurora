"use client";

import Link from "next/link";
import { Globe, Menu, Moon } from "lucide-react";

import { SearchBar } from "@/components/layout/SearchBar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavLinks } from "@/constants/navigation";

export function NavbarMobileMenu() {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open menu" />
        }
      >
        <Menu aria-hidden="true" />
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm p-0">
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="text-left text-lg font-semibold tracking-tight">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-6 p-4">
          <SearchBar />

          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {mainNavLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                className="h-11 w-full justify-start px-3 text-base"
                render={<Link href={link.href} />}
              >
                {link.label}
              </Button>
            ))}

            <Separator className="my-2" />

            <Button
              variant="ghost"
              className="h-11 w-full justify-start gap-3 px-3"
              aria-label="Select language"
            >
              <Globe aria-hidden="true" className="size-4" />
              Language
              <span className="ml-auto text-sm text-muted-foreground">EN</span>
            </Button>

            <Button
              variant="ghost"
              className="h-11 w-full justify-start gap-3 px-3"
              aria-label="Toggle dark mode"
            >
              <Moon aria-hidden="true" className="size-4" />
              Dark Mode
            </Button>
          </nav>

          <Separator />

          <Button
            render={<Link href="/sign-in" />}
            variant="outline"
            className="h-11 w-full"
          >
            Sign In
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
