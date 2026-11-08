# Technical Architecture Document

**Project:** BEDI REAL ESTATE  
**Brand / Fictional Demo Agency:** NARA ESTATE  
**Document Version:** 1.0 (Approved Baseline — M01.5)  
**Status:** Approved  

---

## 1. Architectural Overview & Philosophy

**BEDI REAL ESTATE** is architected as a high-performance, zero-database **MVP Showcase** built on the **Next.js App Router** with **React**, **TypeScript**, and **Tailwind CSS**.

> **Important Architectural Constraint:**  
> **No database, backend persistence server, authentication system, or Docker containerization is required or permitted for the initial MVP.** All property inventory (12 fictional properties) and advisor profiles are served from strongly typed, deterministic local TypeScript modules.

Key architectural goals:
1. **Zero Infrastructure Friction:** Runs immediately via `npm run dev` and `npm run build` on Windows (`Node.js v24.18.0`, `npm 11.16.0`) and deploys seamlessly to Vercel.
2. **Server-First Performance:** Leverages React Server Components (RSC) by default for minimal client-side JavaScript bundle overhead and fast initial page loads.
3. **Clean Separation of Concerns:** Strictly decouples domain types (`src/types`), static datasets (`src/data`), pure business logic (`src/lib`), and UI components (`src/components`).
4. **End-to-End Testability:** Deterministic data and predictable URL routing allow comprehensive automated Playwright testing across all 15 functional requirements (`FR-001`–`FR-015`).

---

## 2. Technology Stack

| Layer | Technology | Role & Justification |
| :--- | :--- | :--- |
| **Framework** | **Next.js (App Router)** | File-system routing, React Server Components, static route generation (`generateStaticParams`), metadata API, and font optimization. |
| **UI Library** | **React** | Component architecture combining Server Components and interactive Client Component islands. |
| **Language** | **TypeScript** | Strict static typing across property schemas, filter states, KPR calculation inputs/outputs, and component props. |
| **Styling** | **Tailwind CSS** | Utility-first styling configured with **NARA ESTATE** custom design tokens (`Limestone`, `Ink`, `Sage`, `Bronze`, `Sand`, `White`, `Cormorant Garamond`, `DM Sans`). |
| **Icons** | **Lucide React** | Clean, consistent architectural and UI iconography (`lucide-react`). |
| **Animations** | **CSS Animations / Motion** | Subtle hardware-accelerated CSS transitions (or lightweight Motion where justified) for gallery modals, drawers, and editorial reveals. |
| **Data Source** | **Local TypeScript Modules** | Version-controlled static dataset (`src/data/`) containing the 12 fictional properties, agents, and agency metadata. |
| **E2E Testing** | **Playwright** | Cross-viewport browser automation verifying user journeys, filtering, KPR math, WhatsApp links, and responsive behavior. |
| **Hosting & CI/CD** | **Vercel** | Native Next.js edge/static deployment platform. |

---

## 3. Server vs. Client Component Strategy

### 3.1 Server Components by Default
All route pages (`page.tsx`), layouts (`layout.tsx`), and static presentation sections are **React Server Components (RSC)** by default:
- Root layout (`src/app/layout.tsx`) and global footer.
- Homepage static sections (Hero frame, Featured Properties grid, Brand Story, Service Pillars, Advisor Preview).
- Property Detail static sections (Breadcrumb, Specification Table, Architectural Narrative, Related Properties).
- Agent Directory (`/agen`) and Agent Profile (`/agen/[slug]`) views.
- SEO metadata (`generateMetadata`) and static route compilation (`generateStaticParams`).

### 3.2 Client Components for Interactive Functionality (`'use client'`)
Client boundaries are pushed as far down the component tree as possible ("Client Islands") and reserved strictly for stateful or browser-event-driven features:
- **Navigation Header & Mobile Drawer (`FR-015`):** Tracks active path (`usePathname`), scroll state, and mobile menu open/close toggle.
- **Quick Search & Catalog Filter/Sort Bar (`FR-003`, `FR-004`, `FR-005`):** Manages keyword query, multi-select filter criteria, sort order, and URL search param synchronization.
- **Property Image Gallery & Lightbox (`FR-007`):** Tracks active image index, modal open state, and keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Mortgage Calculator / Simulasi KPR (`FR-011`):** Reactive sliders/inputs for Property Price, Down Payment %, Interest Rate %, and Tenure Years with real-time amortization output.
- **Contact & Consultation Form (`FR-012`):** Manages form field state, validation errors, and submission confirmation feedback.
- **Dashboard Preview Interactive Controls & Unsupported Feature Notice (`FR-013`, `FR-014`):** Handles client-side table filtering and triggers the explanatory modal/toast when showcase-only actions are clicked.

---

## 4. Separation of UI, Business Logic, and Data

```text
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js App Router                         │
│                    (src/app/**/page.tsx)                        │
└───────────────┬─────────────────────────────────┬───────────────┘
                │                                 │
                ▼                                 ▼
┌───────────────────────────────┐ ┌───────────────────────────────┐
│        UI Components          │ │      Pure Business Logic      │
│      (src/components/**)      │ │         (src/lib/**)          │
│                               │ │                               │
│ - Presentational Cards & Grids│ │ - KPR Amortization Formula    │
│ - Interactive Client Islands  │ │ - WhatsApp URL Builder        │
│ - Layout Header / Footer      │ │ - Property Filter & Sort Fn   │
│                               │ │ - IDR & Area Formatters       │
└───────────────┬───────────────┘ └───────────────┬───────────────┘
                │                                 │
                └───────────────┬─────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                Static Data & TypeScript Types                   │
│                 (src/data/** & src/types/**)                    │
│                                                                 │
│ - 12 Curated Fictional Properties (properties.ts)               │
│ - Fictional NARA ESTATE Advisors (agents.ts)                    │
│ - Strictly Typed Domain Interfaces (property.ts, agent.ts)      │
└─────────────────────────────────────────────────────────────────┘
```

### 4.1 Data Layer (`src/data/` & `src/types/`)
- **`src/types/`**: Defines immutable TypeScript contracts (`Property`, `PropertyType`, `ListingStatus`, `PropertySpecs`, `Agent`, `FilterState`, `SortOption`, `MortgageInput`, `MortgageResult`).
- **`src/data/`**: Exports typed arrays (`PROPERTIES: Property[]` with 12 items, `AGENTS: Agent[]`, and `DASHBOARD_METRICS`) plus read-only lookup helpers (`getPropertyBySlug`, `getFeaturedProperties`, `getRelatedProperties`, `getAgentBySlug`, `getPropertiesByAgentId`).

### 4.2 Business Logic Layer (`src/lib/`)
Pure, side-effect-free TypeScript functions that can be unit-tested or invoked by both Server and Client Components:
- **`src/lib/mortgage.ts`**: Implements the approved KPR formula:
  $$M = P \cdot \frac{r(1 + r)^n}{(1 + r)^n - 1}$$
  with $r = 0$ fallback ($M = P / n$), returning principal, monthly installment, total payment, and total interest.
- **`src/lib/whatsapp.ts`**: Normalizes Indonesian phone numbers to digits-only `62...` format and constructs `https://wa.me/<phone>?text=<encoded_message>` links in Bahasa Indonesia (`FR-008`).
- **`src/lib/property-filters.ts`**: Pure filtering and sorting pipeline applying keyword search (`FR-003`), multi-criteria filters (`FR-004`), and deterministic sorting (`FR-005`).
- **`src/lib/formatters.ts`**: Standardized Indonesian Rupiah formatting (`formatCurrencyIDR`, `formatCompactIDR` e.g., `Rp 12,5 Miliar`) and area formatting (`formatAreaSqm`).

### 4.3 UI Layer (`src/components/`)
Organized by domain responsibility:
- **`src/components/layout/`**: `Header`, `MobileNav`, `Footer`, `Container`, `Breadcrumb`.
- **`src/components/home/`**: `HeroSection`, `QuickSearchBar`, `FeaturedPropertiesSection`, `EditorialStorySection`, `ServicesSection`, `FeaturedAgentsSection`, `ConsultationCta`.
- **`src/components/properties/`**: `PropertyCard`, `PropertyGrid`, `PropertyFilterBar`, `PropertySortSelect`, `PropertyEmptyState`, `PropertyGallery`, `PropertySpecsTable`, `RelatedProperties`.
- **`src/components/agents/`**: `AgentCard`, `AgentContactCard`, `AgentListingsGrid`.
- **`src/components/forms/`**: `MortgageCalculator`, `ContactForm`.
- **`src/components/ui/`**: `Button`, `Badge`, `Modal`, `UnsupportedFeatureModal`, `SectionHeading`.

---

## 5. Directory Structure

```text
bedi-real-estate/
├── docs/
│   ├── PRD.md
│   ├── FSD.md
│   ├── DESIGN_SYSTEM.md
│   ├── ARCHITECTURE.md
│   └── milestones/
│       ├── M01_PRODUCT_DISCOVERY.md
│       ├── M02_PROJECT_BOOTSTRAP.md
│       ├── M03_HOMEPAGE.md
│       ├── M04_PROPERTY_DISCOVERY.md
│       ├── M05_PROPERTY_DETAIL.md
│       ├── M06_SUPPORTING_FEATURES.md
│       ├── M07_DASHBOARD_PREVIEW.md
│       ├── M08_QA_OPTIMIZATION.md
│       └── M09_DEPLOYMENT.md
├── public/
│   ├── images/
│   │   ├── properties/
│   │   ├── agents/
│   │   └── architecture/
│   └── icons/
├── src/
│   ├── app/
│   ├── components/
│   │   ├── layout/
│   │   ├── home/
│   │   ├── properties/
│   │   ├── agents/
│   │   ├── forms/
│   │   └── ui/
│   ├── data/
│   ├── lib/
│   ├── types/
│   └── styles/
└── tests/
    ├── e2e/
    └── fixtures/
```

---

## 6. Routing Strategy

All routes are managed by the Next.js App Router under `src/app/`:

1. **`/` (`src/app/page.tsx`)**
   - Static homepage displaying Hero, Quick Search, Featured Properties (`FR-001`), Brand Narrative, Featured Advisors, and CTA.
2. **`/properti` (`src/app/properti/page.tsx`)**
   - Property catalog and discovery view implementing `FR-002` (Listing), `FR-003` (Search), `FR-004` (Filtering), and `FR-005` (Sorting). Supports initial filter hydration from URL search parameters (`?q=&status=&type=&city=`).
3. **`/properti/[slug]` (`src/app/properti/[slug]/page.tsx`)**
   - Dynamic property detail route pre-rendered at build time via `generateStaticParams` for all 12 property slugs. Implements `FR-006` (Detail), `FR-007` (Image Gallery), `FR-008` (WhatsApp Inquiry), and embedded `FR-011` (Mortgage Calculator).
4. **`/agen` (`src/app/agen/page.tsx`)**
   - Senior Property Advisor directory (`FR-009`).
5. **`/agen/[slug]` (`src/app/agen/[slug]/page.tsx`)**
   - Individual advisor profile and assigned property portfolio (`FR-010`, `FR-008`), pre-rendered via `generateStaticParams`.
6. **`/kontak` (`src/app/kontak/page.tsx`)**
   - Private consultation and contact page housing the validated Contact Form (`FR-012`), flagship office information, and direct WhatsApp channel (`FR-008`).
7. **`/dashboard` (`src/app/dashboard/page.tsx`)**
   - Read-only Executive Dashboard Preview (`FR-013`) with integrated Unsupported Feature modal/toast handler (`FR-014`).
8. **`not-found.tsx` (`src/app/not-found.tsx`)**
   - Custom editorial 404 page in Bahasa Indonesia guiding users back to `/` or `/properti`.

*(Optional convenience route `/simulasi-kpr` may also mount the standalone `MortgageCalculator` component (`FR-011`) if linked directly from navigation.)*

---

## 7. Playwright Testing Strategy

End-to-end tests reside in `tests/e2e/` with reusable test data assertions in `tests/fixtures/`:
- **Test Runner:** `@playwright/test` running against the local Next.js server (`http://localhost:3000`).
- **Core Test Suites (executed in `M08`):**
  - `homepage.spec.ts`: Verifies NARA ESTATE branding, tagline *"Find a place to belong."*, hero rendering, featured cards, and quick search navigation (`FR-001`, `FR-015`).
  - `property-discovery.spec.ts`: Verifies all 12 properties render on `/properti`, tests keyword search (`FR-003`), multi-criteria filters (`FR-004`), price/newest sorting (`FR-005`), and empty-state reset.
  - `property-detail.spec.ts`: Verifies `/properti/[slug]` specs, image gallery switching/lightbox (`FR-007`), related properties (`FR-006`), and WhatsApp `wa.me` URL encoding (`FR-008`).
  - `supporting-features.spec.ts`: Verifies `/agen` directory (`FR-009`), `/agen/[slug]` listings (`FR-010`), KPR calculator math accuracy (`FR-011`), and `/kontak` form validation/submission (`FR-012`).
  - `dashboard-preview.spec.ts`: Verifies `/dashboard` KPI cards, inventory table (`FR-013`), and `FR-014` modal trigger on write-action buttons.
  - `responsive-nav.spec.ts`: Verifies desktop navigation and mobile (`375×812`) hamburger drawer toggle (`FR-015`).

---

## 8. Vercel Deployment Strategy

- **Zero-Config Compatibility:** The Next.js App Router project builds cleanly via standard `next build` with zero external database connections or Docker requirements.
- **Static + SSR Hybrid Optimization:** All static pages and the 12 `/properti/[slug]` + `/agen/[slug]` pages are statically generated at build time (`SSG`), delivering near-instant TTFB on Vercel's global CDN.
- **Environment Variables:** No mandatory secret environment variables are required to build or run the application. Optional public configuration constants (such as default WhatsApp number) have safe built-in defaults in `src/lib/`.
- **Production Readiness (`M09`):** Verified via local `npm run build` and `npm run start` prior to Vercel deployment.

