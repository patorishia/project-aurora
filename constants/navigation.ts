export type NavLink = {
  label: string;
  href: string;
};

export type FooterSection = {
  title: string;
  links: NavLink[];
};

export const mainNavLinks: NavLink[] = [
  { label: "Stores", href: "/stores" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/deals" },
];

export const footerSections: FooterSection[] = [
  {
    title: "Platform",
    links: [
      { label: "Browse Stores", href: "/stores" },
      { label: "Browse Categories", href: "/categories" },
      { label: "Latest Coupons", href: "/coupons" },
      { label: "Popular Deals", href: "/deals" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "How Coupons Work", href: "/how-it-works" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Report a Coupon", href: "/report" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
    ],
  },
];
