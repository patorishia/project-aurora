# Project Structure — Aurora

Production-ready architecture for a global coupon and deals platform. This document defines how the codebase is organized, how data flows, and how the system scales as new features are added.

---

## Overview

Aurora is an early-stage startup building a conversion-focused platform for coupons, deals, and cashback. The architecture prioritizes:

- **SEO** — server-rendered pages, structured data, locale-aware URLs
- **Performance** — Server Components by default, minimal client JavaScript
- **Maintainability** — clear separation of concerns, shared types, centralized config
- **Scalability** — modular services, API-ready design, extension-friendly data models

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI | React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Database | PostgreSQL |
| ORM | Prisma |
| i18n | next-intl |
| Theming | next-themes |
| Data fetching | TanStack Query (client), Server Components (server) |

---

## Folder Architecture

```
cupoes-site/
├── app/                        # Next.js App Router — routes, layouts, metadata
│   ├── (marketing)/            # Public pages (home, FAQ, legal)
│   ├── (platform)/             # Core product pages (stores, coupons, deals)
│   ├── (auth)/                 # Sign in, sign up, account
│   ├── api/                    # Route handlers (webhooks, search, extension)
│   ├── [locale]/               # Locale-prefixed routes (when i18n is enabled)
│   ├── layout.tsx              # Root layout + global metadata
│   ├── page.tsx                # Homepage
│   └── globals.css             # Design tokens, Tailwind imports
│
├── components/
│   ├── layout/                 # Global shell (Navbar, Footer, MainLayout)
│   ├── home/                   # Homepage sections
│   ├── stores/                 # StoreCard, StoreGrid, StoreHeader
│   ├── coupons/                # CouponCard, CouponList, CopyCodeButton
│   ├── deals/                  # DealCard, DealBadge, DealFilters
│   ├── categories/             # CategoryCard, CategoryNav
│   ├── search/                 # SearchBar, SearchResults, SearchFilters
│   ├── shared/                 # Cross-domain UI (EmptyState, Pagination)
│   └── ui/                     # shadcn/ui primitives (Button, Input, Sheet…)
│
├── lib/                        # Core utilities, Prisma client, shared helpers
├── services/                   # Business logic — data access, external APIs
├── hooks/                      # Client-side React hooks
├── types/                      # Shared TypeScript types and interfaces
├── utils/                      # Pure helper functions (formatting, validation)
├── config/                     # App configuration (site, features, env wrappers)
├── constants/                  # Static values (navigation, categories, limits)
├── prisma/                     # Schema, migrations, seed scripts
└── public/                     # Static assets (images, icons, manifests)
```

### Folder Responsibilities

| Folder | Purpose | Example |
|---|---|---|
| `app/` | Routing, page composition, SEO metadata | `app/stores/[slug]/page.tsx` |
| `components/` | Presentational and interactive UI | `CouponCard.tsx` |
| `lib/` | App-wide infrastructure | `lib/prisma.ts`, `lib/utils.ts` |
| `services/` | Data fetching and business rules | `services/coupon.service.ts` |
| `hooks/` | Client state and browser APIs | `useCopyCoupon.ts` |
| `types/` | Domain models and API contracts | `types/coupon.ts` |
| `utils/` | Stateless helpers | `formatDiscount.ts` |
| `config/` | Environment-aware configuration | `config/site.ts` |
| `constants/` | Immutable app constants | `constants/navigation.ts` |
| `prisma/` | Database schema and migrations | `prisma/schema.prisma` |

### Rules

- Never create folders without a clear purpose.
- Co-locate feature components under their domain (`components/coupons/`, not `components/cards/`).
- Keep `components/ui/` strictly for shadcn/ui primitives — no business logic.
- Prefer Server Components; use `"use client"` only when interactivity is required.

---

## Main Pages

### Current (MVP)

| Route | Page | Status |
|---|---|---|
| `/` | Homepage | ✅ Implemented |
| `/stores` | Browse all stores | 🔜 Planned |
| `/stores/[slug]` | Store detail + coupons | 🔜 Planned |
| `/categories` | Browse categories | 🔜 Planned |
| `/categories/[slug]` | Category detail | 🔜 Planned |
| `/coupons` | Latest coupons | 🔜 Planned |
| `/coupons/[id]` | Coupon detail | 🔜 Planned |
| `/deals` | Popular deals | 🔜 Planned |
| `/deals/[slug]` | Deal detail | 🔜 Planned |
| `/sign-in` | Authentication | 🔜 Planned |
| `/faq` | FAQ | 🔜 Planned |
| `/how-it-works` | How coupons work | 🔜 Planned |
| `/contact` | Contact form | 🔜 Planned |
| `/report` | Report a coupon | 🔜 Planned |
| `/privacy`, `/terms`, `/cookies` | Legal pages | 🔜 Planned |

### Future

| Route | Page | Feature |
|---|---|---|
| `/cashback` | Cashback offers | Cashback |
| `/cashback/[store]` | Store cashback rates | Cashback |
| `/account` | User dashboard | Auth |
| `/account/saved` | Saved coupons | Auth |
| `/blog` | Content marketing | SEO |
| `/blog/[slug]` | Blog post | SEO |
| `/search` | Global search results | Search |
| `/api/v1/*` | Public API | Extension, Mobile App |
| `/assistant` | AI shopping assistant | AI |

### Route Groups

Use Next.js route groups to organize layouts without affecting URLs:

```
app/
├── (marketing)/        # Shared marketing layout, lighter chrome
│   ├── page.tsx        # /
│   ├── faq/
│   └── how-it-works/
├── (platform)/         # Full platform layout with search-focused UX
│   ├── stores/
│   ├── coupons/
│   └── deals/
└── (auth)/             # Minimal auth layout
    └── sign-in/
```

---

## Reusable Components

Components are grouped by domain. Each should be small, typed, and accept data via props — no direct database calls inside UI components.

### Layout

| Component | Location | Description |
|---|---|---|
| `MainLayout` | `components/layout/` | Global shell: skip link, Navbar, main, Footer |
| `Navbar` | `components/layout/` | Sticky header with search and navigation |
| `NavbarMobileMenu` | `components/layout/` | Responsive slide-over menu |
| `Footer` | `components/layout/` | Platform links and legal |
| `SearchBar` | `components/layout/` | Reusable search input |

### Domain Components (planned)

| Domain | Components | Purpose |
|---|---|---|
| Stores | `StoreCard`, `StoreGrid`, `StoreHeader` | Store browsing and detail |
| Coupons | `CouponCard`, `CouponList`, `CopyCodeButton` | Coupon display and interaction |
| Deals | `DealCard`, `DealBadge`, `DealFilters` | Deal browsing and filtering |
| Categories | `CategoryCard`, `CategoryNav` | Category navigation |
| Search | `SearchResults`, `SearchFilters` | Search experience |
| Shared | `EmptyState`, `Pagination`, `Badge` | Cross-feature utilities |

### Component Conventions

```tsx
// ✅ Good — Server Component, typed props, no side effects
type CouponCardProps = {
  coupon: Coupon;
};

export function CouponCard({ coupon }: CouponCardProps) {
  return (/* … */);
}

// ✅ Good — Client Component only when needed
"use client";

export function CopyCodeButton({ code }: { code: string }) {
  // clipboard interaction
}
```

---

## Data Flow

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌────────────┐
│   Browser   │────▶│  app/page    │────▶│  services/  │────▶│  Prisma    │
│  (Client)   │     │  (Server)    │     │  (Logic)    │     │  (PostgreSQL)│
└─────────────┘     └──────────────┘     └─────────────┘     └────────────┘
       │                    │                    │
       │                    ▼                    ▼
       │             components/            types/
       │             (Render UI)         (Contracts)
       │
       ▼
  hooks/ + TanStack Query
  (Client mutations, real-time UI)
```

### Layers

1. **Pages (`app/`)** — Fetch data in Server Components, pass props to UI. Define `metadata` for SEO.
2. **Services (`services/`)** — Encapsulate queries, caching, and business rules. One service per domain.
3. **Prisma (`prisma/`)** — Database schema, migrations, and typed client via `lib/prisma.ts`.
4. **Types (`types/`)** — Shared interfaces used across services, components, and API routes.
5. **API Routes (`app/api/`)** — REST endpoints for browser extension, mobile app, and webhooks.

### Example Flow: Store Page

```
app/stores/[slug]/page.tsx
  → services/store.service.ts → getStoreBySlug(slug)
    → prisma.store.findUnique({ where: { slug }, include: { coupons: true } })
  → <StoreHeader store={store} />
  → <CouponList coupons={store.coupons} />
```

### Caching Strategy

| Data | Strategy |
|---|---|
| Store/category lists | ISR with revalidation (e.g. 1 hour) |
| Coupon codes | Short revalidation or on-demand |
| User-specific data | No cache — server-side per request |
| Search results | Dynamic, optionally edge-cached |

---

## Naming Conventions

Everything is written in **English**. No Portuguese in code, files, or identifiers.

### Files

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `CouponCard.tsx` |
| Services | kebab-case + `.service` | `coupon.service.ts` |
| Hooks | camelCase + `use` prefix | `useCopyCoupon.ts` |
| Types | kebab-case | `coupon.ts` |
| Utils | kebab-case | `format-discount.ts` |
| Constants | kebab-case | `navigation.ts` |
| Pages | kebab-case folders | `app/how-it-works/page.tsx` |

### Code

| Element | Convention | Example |
|---|---|---|
| Components | PascalCase | `StoreCard` |
| Functions | camelCase | `getStoreBySlug` |
| Types/Interfaces | PascalCase | `Coupon`, `StoreWithCoupons` |
| Constants | SCREAMING_SNAKE_CASE | `MAX_COUPONS_PER_PAGE` |
| CSS | Tailwind utility classes | No custom CSS unless necessary |
| Database tables | snake_case (Prisma `@map`) | `coupon_codes` |

### URLs

- Lowercase, hyphen-separated slugs: `/stores/amazon`, `/categories/electronics`
- Locale prefix when i18n is active: `/en/stores/amazon`, `/pt/lojas/amazon`

---

## SEO Strategy

Aurora's growth depends on organic traffic. Every public page must be optimized for search engines.

### Server-Side Rendering

- All public pages are Server Components — fully rendered HTML for crawlers.
- No client-only rendering for indexable content.

### Metadata

Each page exports Next.js `metadata` or `generateMetadata`:

```tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const store = await getStoreBySlug(params.slug);
  return {
    title: `${store.name} Coupons & Deals`,
    description: `Save with ${store.couponCount} verified ${store.name} coupon codes.`,
    openGraph: { /* … */ },
  };
}
```

### Structured Data (JSON-LD)

| Page | Schema |
|---|---|
| Store | `Organization`, `Offer` |
| Coupon | `Offer`, `DiscountOffer` |
| Deal | `Offer`, `Product` |
| FAQ | `FAQPage` |
| Blog | `Article`, `BreadcrumbList` |

### Technical SEO

- Semantic HTML (`<main>`, `<nav>`, `<article>`, `<section>`)
- Canonical URLs per locale
- `sitemap.xml` generated from database
- `robots.txt` with crawl rules
- Core Web Vitals targets: LCP < 2.5s, CLS < 0.1, INP < 200ms
- Image optimization via `next/image`

### Content SEO

- Unique titles and descriptions per page
- Store and category landing pages target long-tail keywords
- Blog for content marketing and backlink acquisition
- Internal linking between stores, categories, and coupons

---

## Internationalization

The platform is global. i18n is built in from the start using **next-intl**.

### Structure

```
app/
├── [locale]/
│   ├── layout.tsx          # Locale provider, hreflang tags
│   ├── page.tsx
│   ├── stores/
│   └── coupons/
├── i18n/
│   ├── request.ts          # Locale detection
│   └── routing.ts          # Locale routing config
messages/
├── en.json
├── pt.json
├── es.json
└── fr.json
```

### Key Principles

- **Locale in URL** — `/en/stores`, `/pt/lojas` (translated slugs optional, phase 2)
- **Server-side translations** — no client-side flash of untranslated content
- **Centralized messages** — all user-facing strings in `messages/{locale}.json`
- **hreflang tags** — `<link rel="alternate" hreflang="en" …>` on every page
- **Locale-aware metadata** — titles and descriptions translated per locale
- **Currency and date formatting** — use `Intl` APIs, never hardcode formats

### Phase 1 (MVP)

- English only, infrastructure ready
- `next-intl` configured but not blocking launch

### Phase 2

- Portuguese, Spanish, French
- Locale selector wired in Navbar
- Translated metadata and UI strings

---

## Mobile-First Approach

Over 60% of coupon traffic is mobile. Every feature is designed for small screens first.

### Design Principles

1. **Mobile-first CSS** — base styles for mobile, enhance with `sm:`, `md:`, `lg:` breakpoints
2. **Touch targets** — minimum 44×44px for interactive elements
3. **Readable typography** — 16px base, clear hierarchy, no text below 14px
4. **Thumb-friendly navigation** — primary actions within easy reach
5. **Performance on 3G** — minimal JS, optimized images, no layout shift

### Responsive Patterns

| Element | Mobile | Desktop |
|---|---|---|
| Navigation | Slide-over menu (Sheet) | Inline nav links |
| Search | Full-width in mobile menu | Inline in Navbar |
| Store/Coupon grids | 1 column | 2–4 columns |
| Filters | Bottom sheet or drawer | Sidebar |
| Footer | 2-column grid | 4-column grid |

### Testing

- Test all pages at 375px (iPhone SE) before desktop
- Verify touch interactions, scroll behavior, and menu accessibility
- Lighthouse mobile score target: 90+

---

## Future Scalability

The architecture is designed to grow without rewrites.

### Coupons & Deals (Phase 1 — MVP)

```
prisma/schema.prisma    → Store, Category, Coupon, Deal models
services/               → coupon.service.ts, deal.service.ts, store.service.ts
app/(platform)/         → Store, category, coupon, deal pages
components/coupons/     → CouponCard, CopyCodeButton
components/deals/       → DealCard, DealFilters
```

### Cashback (Phase 2)

```
prisma/                 → CashbackOffer, CashbackTransaction, UserWallet
services/               → cashback.service.ts
app/(platform)/cashback → Cashback landing and store rates
components/cashback/    → CashbackRate, WalletBalance
app/api/                → Tracking pixels, conversion webhooks
```

Requires user authentication and affiliate network integrations.

### Browser Extension (Phase 3)

```
app/api/v1/             → REST API for extension data
  ├── coupons/match     → Match coupons to current URL
  ├── stores/lookup     → Store detection
  └── deals/active      → Active deals for domain
packages/extension/     → Separate Chrome/Firefox extension (monorepo or repo)
```

The web app exposes a versioned public API. The extension is a thin client that calls Aurora's API.

### AI Shopping Assistant (Phase 4)

```
app/(platform)/assistant  → Chat interface
services/ai.service.ts    → LLM integration (product matching, deal discovery)
app/api/v1/assistant      → Streaming chat endpoint
types/assistant.ts        → Message, Recommendation types
```

Leverages existing store, coupon, and deal data. AI layer sits on top of services — no direct DB access from the AI module.

### Mobile App (Phase 5)

```
app/api/v1/             → Shared REST/GraphQL API
  ├── auth/             → Token-based auth
  ├── coupons/          → CRUD + search
  ├── deals/            → Listings + alerts
  └── notifications/    → Push notification registration
packages/mobile/          → React Native or Expo app (separate repo)
```

Same API serves the browser extension and mobile app. Business logic stays in `services/` — never duplicated in clients.

### Scalability Checklist

| Concern | Approach |
|---|---|
| Database | PostgreSQL with read replicas, connection pooling (PgBouncer) |
| Caching | Redis for hot data (popular coupons, store lists) |
| Search | PostgreSQL full-text → Algolia/Meilisearch at scale |
| Images | CDN via Vercel Image Optimization or Cloudinary |
| Analytics | Server-side event tracking, privacy-compliant |
| Monitoring | Error tracking (Sentry), performance (Vercel Analytics) |
| CI/CD | Preview deployments per PR, automated lint + type checks |
| Feature flags | Config-driven toggles in `config/features.ts` |

---

## Related Documents

| Document | Purpose |
|---|---|
| `PROJECT.md` | Vision, mission, and principles |
| `AGENTS.md` | AI development rules and coding standards |
| `PROJECT_STRUCTURE.md` | This document — architecture reference |

---

## Quick Reference

```
Need to…                          → Look in…
Add a new page                      → app/(platform)/{feature}/page.tsx
Add a UI component                  → components/{domain}/{Component}.tsx
Add business logic                  → services/{domain}.service.ts
Add a database model                → prisma/schema.prisma
Add a shared type                     → types/{domain}.ts
Add a constant                        → constants/{name}.ts
Add a client hook                     → hooks/use{Name}.ts
Add an API endpoint                   → app/api/v1/{resource}/route.ts
Add a translation                     → messages/{locale}.json
Configure the app                     → config/{name}.ts
```
