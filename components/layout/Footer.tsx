"use client";

import Link from "next/link";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  platform: [
    { key: "browseStores", href: "/stores" },
    { key: "browseCategories", href: "/categories" },
    { key: "latestCoupons", href: "/coupons" },
    { key: "popularDeals", href: "/deals" },
  ],
  resources: [
    { key: "faq", href: "/faq" },
    { key: "howCouponsWork", href: "/how-it-works" },
    { key: "blog", href: "/blog" },
  ],
  support: [
    { key: "contact", href: "/contact" },
    { key: "reportCoupon", href: "/report" },
  ],
  legal: [
    { key: "privacy", href: "/privacy" },
    { key: "terms", href: "/terms" },
    { key: "cookies", href: "/cookies" },
  ],
} as const;

export function Footer() {
  const { messages } = useLanguage();
  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: messages.Footer.platform,
      links: footerLinks.platform,
    },
    {
      title: messages.Footer.resources,
      links: footerLinks.resources,
    },
    {
      title: messages.Footer.support,
      links: footerLinks.support,
    },
    {
      title: messages.Footer.legal,
      links: footerLinks.legal,
    },
  ];

  return (
    <footer className="relative bg-muted/30">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-[#6C4FF6]/70 via-[#8A6BFA] to-[#31B86B]/70"
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-sm font-semibold tracking-tight text-foreground">
                {section.title}
              </h2>

              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {messages.Footer[link.key]}
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
              className="bg-linear-to-r from-[#6C4FF6] via-[#8A6BFA] to-[#31B86B] bg-clip-text text-sm font-semibold tracking-tight text-transparent"
            >
              Aurora
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {messages.Footer.description}
            </p>
          </div>

          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Aurora. {messages.Footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}