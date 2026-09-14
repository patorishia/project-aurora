import Link from "next/link";

import { Separator } from "@/components/ui/separator";
import { footerSections } from "@/constants/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <Link
              href="/"
              className="text-sm font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
            >
              Aurora
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Find verified coupons and the best deals from top online stores.
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Aurora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
