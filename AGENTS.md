# Project Aurora - AI Development Rules

## Project Goal

Build a world-class global coupon and deals platform focused on SEO, scalability, performance and user experience.

## Tech Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- PostgreSQL
- Prisma ORM

## General Rules

- Always use TypeScript.
- Prefer Server Components whenever possible.
- Use Client Components only when required.
- Follow Next.js App Router best practices.
- Keep components small and reusable.
- Avoid duplicated code.
- Use semantic HTML.
- Mobile-first design.
- Accessibility is required.
- Performance first.
- SEO first.

## Styling

- Tailwind CSS only.
- Use shadcn/ui components whenever possible.
- Modern SaaS design.
- Rounded corners.
- Soft shadows.
- Clean spacing.
- Responsive layout.

## Folder Organization

- components/
- lib/
- services/
- hooks/
- types/
- utils/
- config/

Never create unnecessary folders.

## Naming

Everything must be written in English.

Component example:

StoreCard.tsx

CouponCard.tsx

SearchBar.tsx

Never use Portuguese names.

## Code Quality

Prefer readable code over clever code.

Always explain important architectural decisions.

When unsure, follow the latest official Next.js documentation.

---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
