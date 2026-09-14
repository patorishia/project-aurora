# Aurora — Technical Specification V1
 
**Status:** MVP — 1-week sprint
**Last updated:** —
 
---
 
## 1. Overview
 
Aurora V1 is a **coupon aggregator**: a web application that lets users search for stores, browse active coupons/deals, and get redirected to the destination store to redeem them.
 
Main functional flow (user journey):
 
```text
User → Search/Browse → Select store/coupon → Get code → Redirect to store
```
 
Core non-functional requirement: **coupons are sourced and kept up to date through an automated ingestion pipeline**, not manual entry. The system must be designed to support multiple sources in the future, even though only one is used in V1.
 
This document is the **source of truth** for the V1 scope. Any feature proposed during the sprint must be checked against Section 12 (scope decision rule) before implementation.
 
---
 
## 2. Tech stack
 
| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI | React + Tailwind CSS + shadcn/ui (Base UI) |
| ORM | Prisma |
| Database | PostgreSQL |
| Data fetching / client cache | TanStack Query (selective use) |
| Icons | Lucide |
| Animation | Framer Motion (used sparingly) |
| i18n | next-intl (only if the project already has this structure) |
 
**Architecture constraint:** no new dependencies outside this list without explicit justification. The goal is to reuse the infrastructure already in place in the Aurora project.
 
---
 
## 3. Data model
 
### 3.1 Entities
 
```prisma
model Store {
  id          String     @id @default(cuid())
  name        String
  slug        String     @unique
  logoUrl     String?
  description String?
  website     String?
  categories  Category[] // many-to-many: a store can belong to more than one category
  coupons     Coupon[]
  active      Boolean    @default(true)
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
 
  @@index([slug])
}
 
model Category {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  stores    Store[]  // many-to-many
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
 
enum CouponType {
  CODE          // coupon with a code
  DEAL          // offer without a code
  DISCOUNT      // direct discount
  FREE_SHIPPING
  OTHER
}
 
model Coupon {
  id            String     @id @default(cuid())
  storeId       String
  store         Store      @relation(fields: [storeId], references: [id])
  title         String
  description   String?
  code          String?
  discountValue String?    // e.g. "25%", "$10" — free text, format depends on the source
  type          CouponType
  targetUrl     String
  source        String     // origin identifier, e.g. "awin", "impact"
  sourceId      String     // ID in the external source
  active        Boolean    @default(true)
  expiresAt     DateTime?
  verifiedAt    DateTime?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
 
  @@index([storeId])
  @@index([active, expiresAt])
  @@unique([source, sourceId])
}
```
 
### 3.2 Schema design notes
 
- `(source, sourceId)` — not `sourceId` alone — is the key used for idempotent *upsert* during import. A single `sourceId` would not be safe once more than one provider is added later (e.g. Awin `#12345` and Impact `#12345` are different coupons and must not collide). `source` identifies the provider (e.g. `"awin"`); `sourceId` is the record ID within that provider.
- `sourceId` is required because the selected V1 provider must provide a stable unique identifier for each coupon. It is intentionally **not** optional: in PostgreSQL a unique constraint like `@@unique([source, sourceId])` does not treat `NULL` values as equal to one another, so a nullable `sourceId` would silently allow duplicate rows and break the idempotency guarantee the pipeline relies on. If a future provider doesn't expose a stable ID, it should be handled with a provider-specific fallback (e.g. a hash of stable fields) rather than by relaxing this constraint.
- `discountValue` is kept as free text because the format varies by source (percentage, fixed amount, "from $X", etc.); strict normalization can be added later once real data patterns are observed.
- `Store` ↔ `Category` is many-to-many: a store is rarely limited to a single category in practice. V1 can still populate/display just one primary category in the UI even though the schema allows more.
- Indexes on `slug` (page lookup) and `(active, expiresAt)` (queries for listing valid coupons) are the only ones needed in V1 — avoid premature over-indexing.
---
 
## 4. Automated import pipeline
 
This is the core feature of V1. Proposed architecture:
 
```text
┌─────────────────┐
│ External source  │  (API / feed from an affiliate network)
└────────┬─────────┘
         │ fetch (scheduled job)
         ▼
┌─────────────────┐
│ Importer/Adapter │  → transforms the source payload into the internal shape
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│  Normalizer       │  → validates, maps CouponType, resolves/creates Store
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│ Upsert (Prisma)   │  → key: (source, sourceId) → PostgreSQL
└────────┬─────────┘
         │
         ▼
┌─────────────────┐
│ Aurora (Next.js)  │  → SSR/ISR rendering of store/coupon pages
└──────────────────┘
```
 
### 4.1 Design decisions
 
- **Adapter pattern**: the importer must isolate source-specific logic in an `adapters/<source>.ts` layer, exposing a common interface (`fetchCoupons(): NormalizedCoupon[]`). This allows new sources to be added without touching the rest of the pipeline.
- **Scheduled execution**: a scheduled job (e.g. Vercel Cron, or an equivalent external scheduler) runs the import periodically (e.g. every 6–12h). Avoid in-process schedulers like `node-cron` on a serverless deployment — they don't reliably survive across invocations/cold starts.
- **Idempotency**: use `upsert` keyed by `(source, sourceId)`, marking coupons that disappeared from the source in the last sync as `active: false` instead of deleting them. This also keeps the architecture ready for multiple providers, e.g. `awin` + `12345` and `impact` + `12345` are correctly treated as two distinct coupons, not the same one.
- **Out of scope for V1**: a custom crawler or generalized scraping. Only one source with a structured API/feed is used, chosen for data quality and ease of integration.
---
 
## 5. Application routes
 
| Route | Description | Rendering |
|---|---|---|
| `/` | Homepage: hero, search, popular stores, featured coupons, categories | ISR |
| `/stores` | Store listing | ISR |
| `/stores/[slug]` | Individual store page + active coupons | ISR |
| `/categories/[slug]` | Stores/coupons listing by category | ISR |
| `/search?q=` | Search results | SSR (dynamic per query) |
 
**Note:** ISR (Incremental Static Regeneration) is recommended for store/category pages because content changes with the periodic sync, not on every request — this reduces database load and improves SEO/performance.
 
---
 
## 6. Search
 
V1 implementation: simple search via SQL query (`ILIKE` / `LIKE`, with a `pg_trgm` index if needed) over `Store.name` and `Coupon.title`. No dedicated search engine (Algolia, Meilisearch, Elasticsearch) at this stage — that would be over-engineering for the expected data volume of the MVP.
 
Expected behavior example:
 
```
Query: "nike"
→ Store "Nike" (12 active coupons)
```
 
---
 
## 7. Coupon component / "Get Coupon" CTA
 
Expected behavior on click:
 
1. If `coupon.code` exists → reveal/copy the code (Clipboard API).
2. **After** the code has been revealed/copied — not immediately — redirect to `coupon.targetUrl`. The redirect must not fire before the user has had a chance to see and copy the code (e.g. wait for the copy action or a short delay/confirmation), otherwise the user reaches the store without the code in hand.
3. *(Not required for V1)* Click logging can be added later as an optional hook for future analytics/affiliate tracking. Do not build this out now — it's a placeholder for the roadmap, not a V1 requirement.
4. `targetUrl` should be built so affiliate tracking parameters can be added later without changing the schema (e.g. querystring composed at the service layer, not hardcoded).
---
 
## 8. Design system
 
### 8.1 Color tokens
 
```css
--aurora-purple: #6C4FF6;   /* brand, primary CTAs, links, highlights */
--aurora-green:  #31B86B;   /* discounts, savings, positive/verified state */
--bg:            #F7F6FB;
--text-primary:  #17151F;
--text-secondary:#6F6A7A;
```
 
### 8.2 Visual principles
 
- Generous whitespace, clear visual hierarchy, few elements per screen.
- Mobile-first: cards, search fields, and CTAs sized for touch (recommended minimum tap target ~44x44px).
- Component consistency via shadcn/ui as the base, with Tailwind tokens mapped to the colors above.
---
 
## 9. Baseline technical SEO
 
- Semantic URLs (`/stores/nike`, not `/stores/123`).
- `generateMetadata` per route (title, description, Open Graph).
- Dynamically generated `sitemap.xml` and `robots.txt` from active `Store`/`Category` entities.
- Structured headings (single `h1` per page, logical `h2`/`h3` hierarchy).
- Store and category pages indexable (`noindex` only on `/search`, if applicable).
Out of scope for V1: massive/programmatic SEO page generation and advanced link-building strategy.
 
---
 
## 10. Explicitly out of scope
 
To keep the scope within the 1-week sprint, the following are **not** part of V1:
 
- User accounts / authentication
- Favorites, alerts, and notifications
- Cashback and price tracking
- Browser extension and mobile app
- AI shopping assistant
- Full admin dashboard
- Multiple affiliate networks at once
- Custom crawler / generalized scraping
- Advanced analytics and recommendation system
- Full internationalization
- Social features
---
 
## 11. Execution plan (7 days)
 
| Day | Focus |
|---|---|
| 1 | Setup, design system, global layout (header/footer), base components |
| 2 | Homepage (hero, search, highlights, categories, responsive) |
| 3 | Prisma + PostgreSQL: schema, migrations, test data seed |
| 4 | Store and coupon pages, navigation, categories |
| 5 | Import pipeline: adapter for the chosen source, normalization, upsert |
| 6 | Search, simple filters, loading/empty/error states, baseline SEO, accessibility |
| 7 | End-to-end QA, bug fixes, deploy, production smoke test |
 
---
 
## 12. Scope decision rule
 
Before implementing any feature not listed in this document, apply this test:
 
> **Is this feature necessary for the user to find and use a coupon?**
 
- **No** → backlog, not part of V1.
The goal of the sprint is to **launch** Aurora, not to complete it.
 
---
 
## 13. Definition of Done (V1)
 
- [ ] Application deployed to production
- [ ] Homepage functional
- [ ] Search operational
- [ ] Store listing and individual store pages
- [ ] Coupons visible and linked to their stores
- [ ] Import pipeline running without manual intervention
- [ ] New coupons appear in the UI automatically after sync
- [ ] "Get Coupon" CTA functional (reveal/copy + redirect)
- [ ] Store links working
- [ ] Responsive (desktop, tablet, mobile)
- [ ] PostgreSQL in production, migrations applied
- [ ] Baseline SEO implemented (metadata, sitemap, robots.txt)
- [ ] No critical errors in production
---
 
## 14. Post-V1 roadmap (non-committed)
 
- Additional coupon sources (multiple adapters)
- Store catalog expansion
- Full affiliate tracking
- Advanced search (dedicated engine, filters, ranking)
- Advanced SEO (programmatic pages, editorial content)
- User accounts, favorites, alerts
- Cashback, price tracking
- Analytics and recommendations
- AI features (shopping assistant)
