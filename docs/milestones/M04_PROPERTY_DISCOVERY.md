# Milestone M04 — Property Discovery (Catalog, Search, Filter & Sort)

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Completed
**Latest Approved Commit:** `0b30dd7`
**Baseline Commit:** `33f0aea` (Milestone M03)
**Mapped Requirements:** `FR-002` (Property Listing), `FR-003` (Property Search), `FR-004` (Property Filtering), `FR-005` (Property Sorting)  

---

## 1. Objective

Implement the complete Property Discovery experience at the `/properties` route, enabling users to browse all 12 fictional properties, search case-insensitively by keyword, filter across multiple architectural and financial criteria using logical `AND`, sort listings deterministically, and recover seamlessly from zero-match empty states.

*Note: Property Detail pages (`/properties/[slug]`), interactive image galleries, and embedded KPR calculators remain strictly excluded from M04 and are deferred to Milestone M05.*

---

## 2. Scope & Execution History (Submilestones M04.1 – M04.4)

The execution of Milestone M04 was structured into sequential, independently verified submilestones:

- **M04.1 — Domain Model & Property Dataset (`commit 7ef66f6`):**
  - Designed the comprehensive domain model schema (`Property`, `PropertyType`, `PropertyStatus`, `PricePeriod`, etc.) in `src/types/property.ts` and `src/types/filters.ts`.
  - Authored the authoritative 12-property fictional dataset representing luxury residences across Indonesia in `src/data/properties.ts`.
- **M04.2 — Search, Filtering, Sorting & Formatters (`commit 4430d32`):**
  - Implemented pure, immutable business logic for search, multi-criteria filtering, and deterministic sorting in `src/lib/property-filters.ts`.
  - Built Indonesian formatting utilities for standard IDR currency, compact representations (Juta/Miliar), and area measurements in `src/lib/formatters.ts`.
  - Added 54 unit tests covering multi-criteria search, boundary price fixtures, and multi-tier sorting tie-breaking.
- **M04.3A — Card Adapter, Sort Selector & Empty State (`commit e1de325`):**
  - Created strongly typed adapter `toPropertyCardData` in `src/lib/property-adapter.ts` to bridge the rich domain model with presentation cards without mutating existing homepage cards.
  - Built accessible `PropertySortSelect.tsx` with typed sort options.
  - Created refined Bahasa Indonesia empty state `PropertyEmptyState.tsx` with reset recovery trigger.
  - Added 5 unit tests validating data mapping across all 12 properties.
- **M04.3B — Responsive Filter Bar & Mobile Drawer (`commit d380fc0`):**
  - Implemented desktop sticky filter bar `PropertyFilterBar.tsx` and mobile action bar.
  - Implemented accessible bottom sheet drawer `MobileFilterDrawer.tsx` with draft isolation, focus trapping, ESC key listener, and focus restoration.
  - Defined filter option schemas and active filter chip derivation in `src/lib/filter-helpers.ts`.
  - Added 13 unit tests for option schemas and active chip derivation.
- **M04.3C — Catalog Route, URL State & Client Integration (`commit 0b30dd7`):**
  - Implemented pure URL query parsing, fallback validation, and deterministic serialization in `src/lib/catalog-params.ts`.
  - Created client orchestration island `PropertiesCatalog.tsx` wiring dynamic draft result count calculation (`onGetDraftCount`), filter state, and `window.history.replaceState` synchronization.
  - Built responsive card grid `PropertyGrid.tsx` and Suspense shimmer fallback `CatalogLoadingSkeleton.tsx`.
  - Created Server Component route at `src/app/properties/page.tsx` with static page prerendering.
  - Added 14 unit tests for catalog URL parameter parsing, fallback, and round-tripping.
- **M04.4 — Integration QA, Release Verification & Documentation Alignment (`commit a019860`):**
  - Executed full quality gates (86 unit tests passing, zero ESLint warnings, clean TypeScript check, static build export).
  - Executed browser-based visual and interactive verification via Playwright MCP across 1440px desktop, 768px tablet, and 390px mobile viewports.
  - Reconciled and aligned milestone documentation with committed repository state.
  - *Formal Closeout Sign-off:* Approved and signed off by the project owner. Milestone M04 is formally closed.

---

## 3. Reconciled Deliverables Inventory

A comprehensive inspection of Git history between baseline commit `33f0aea` and `0b30dd7` confirms **25 total files** involved in Milestone M04:
- **Files Created:** 22 files (17 application/lib/types/route files + 5 unit test files).
- **Files Modified:** 3 files (`src/components/properties/PropertyCard.tsx`, `package.json`, `tsconfig.json`).
- **Core Application Files:** 18 files.
- **Unit Test Files:** 5 files (86 total unit tests).
- **Tooling & Configuration Files:** 2 files.

### 3.1 Domain and Data Files (4 files — all created)
1. `src/types/property.ts` — Property domain schema, unions, and interfaces.
2. `src/types/filters.ts` — Filter state, option schemas, and sort types.
3. `src/types/index.ts` — Domain type barrel re-export.
4. `src/data/properties.ts` — Authoritative 12-property curated Indonesian luxury dataset.

### 3.2 Business Logic, Utility & Adapter Files (5 files — all created)
5. `src/lib/property-filters.ts` — Pure filtering, keyword search, and deterministic sorting engine.
6. `src/lib/formatters.ts` — IDR currency, compact notation, and area measurement formatters.
7. `src/lib/property-adapter.ts` — Strongly typed `toPropertyCardData` adapter.
8. `src/lib/filter-helpers.ts` — Option definitions and active filter chip derivation.
9. `src/lib/catalog-params.ts` — Pure URL parameter parsing, validation fallback, and serialization.

### 3.3 Presentation & UI Components (8 files — 7 created, 1 modified)
10. `src/components/properties/PropertyCard.tsx` *(Modified)* — Adapted to accept data from adapter; homepage rendering preserved.
11. `src/components/properties/PropertySortSelect.tsx` *(Created)* — Accessible sort selector dropdown.
12. `src/components/properties/PropertyEmptyState.tsx` *(Created)* — Editorial zero-result recovery component.
13. `src/components/properties/PropertyFilterBar.tsx` *(Created)* — Desktop filter toolbar with inline search and mobile trigger.
14. `src/components/properties/MobileFilterDrawer.tsx` *(Created)* — Accessible mobile bottom sheet drawer with draft isolation and live count.
15. `src/components/properties/PropertyGrid.tsx` *(Created)* — Responsive 3-column card grid with empty state delegation.
16. `src/components/properties/PropertiesCatalog.tsx` *(Created)* — Client state island orchestrating filter, sorting, and URL sync.
17. `src/components/properties/CatalogLoadingSkeleton.tsx` *(Created)* — Editorial shimmer skeleton fallback for `<Suspense>`.

### 3.4 App Router Route Pages (1 file — created)
18. `src/app/properties/page.tsx` *(Created)* — Server Component route for `/properties` with SEO metadata and `<Suspense>` wrapper.

### 3.5 Unit Test Suites (5 files — all created, 86 unit tests)
19. `tests/unit/property-filters.test.ts` *(Created)* — 43 unit tests for filtering, searching, and tie-breaking.
20. `tests/unit/formatters.test.ts` *(Created)* — 11 unit tests for IDR currency and area formatters.
21. `tests/unit/card-adapter.test.ts` *(Created)* — 5 unit tests for property-to-card data mapping.
22. `tests/unit/filter-helpers.test.ts` *(Created)* — 13 unit tests for filter options and chip derivations.
23. `tests/unit/catalog-params.test.ts` *(Created)* — 14 unit tests for URL parsing, validation fallback, and round-tripping.

### 3.6 Tooling & Configuration (2 files — both modified)
24. `package.json` *(Modified)* — Added test script utilizing Node.js test runner with TypeScript stripping.
25. `tsconfig.json` *(Modified)* — Included `tests/**/*.ts` in TypeScript compilation context.

---

## 4. Dependencies & Dataset History

- **Dataset Origin:** The 12 fictional properties and rich domain types were authored directly in **M04.1** (`commit 7ef66f6`). They were not authored in M02 (M02 was restricted to repository bootstrap and design tokens).
- **Presentation Dependencies:** Consumes design tokens, color palette (Limestone, Ink, Bronze, Sage), typography (Cormorant Garamond, DM Sans), and layout shell established in M02 and M03.

---

## 5. Acceptance Criteria

- [x] Navigating to `/properties` with no active filters displays all 12 fictional properties (`FR-002`).
- [x] Keyword search (`FR-003`) accurately filters properties case-insensitively by title, property code, neighborhood/area, city, or province.
- [x] Multi-criteria filtering (`FR-004`) combines Status, Type, City, Price Range, and Minimum Bedrooms using logical `AND`.
- [x] Filter presets reflect actual domain values:
  - **Transaction Status:** *Semua*, *Dijual*, *Disewa*.
  - **Property Type:** *Semua*, *Rumah*, *Vila*, *Apartemen*, *Townhouse*, *Komersial*.
  - **City:** *Semua*, *Jakarta Selatan*, *Bandung*, *Bali*, *Surabaya*, *Lombok*.
  - **Price Range Presets:** *Semua*, `< Rp 5 Miliar` (`under-5b`), `Rp 5 – 15 Miliar` (`5b-15b`), `> Rp 15 Miliar` (`above-15b`).
  - **Minimum Bedrooms:** *Semua*, `3+`, `4+`, `5+`, `6+` (represented as numeric values `3, 4, 5, 6`).
- [x] Sorting (`FR-005`) accurately and deterministically reorders visible listings by *Unggulan* (Default), *Terbaru*, *Harga: Rendah ke Tinggi*, *Harga: Tinggi ke Rendah*, and *Luas Tanah Terbesar* without discarding active filters.
- [x] Query parameters from the Homepage Quick Search dock (`/properties?status=...&type=...&city=...`) automatically initialize the catalog filter state.
- [x] Unmatched filter combinations render `PropertyEmptyState` with contextual badges and a *"Reset Seluruh Filter"* button that restores all 12 listings.
- [x] Mobile drawer provides draft filter isolation, dynamic live result count on the Apply button (`Terapkan (X)`), focus trap, ESC listener, and focus restoration to the trigger button.
- [x] Filter state synchronization updates browser query parameters via `window.history.replaceState` without polluting the browser history stack, while supporting native Back/Forward traversal.

---

## 6. Explicit Out-of-Scope Items

To prevent scope creep, the following capabilities remain strictly excluded from Milestone M04:

- **Property Detail Experience (`/properties/[slug]`):** Dynamic slug routing, editorial photo lightbox, floor plan viewer, architectural specification matrix, and mortgage calculator (`M05`).
- **Agent Directory & Inquiries:** Agent catalog (`/agents`), Agent profiles (`/agents/[slug]`), and lead contact forms (`/contact`) (`M06`).
- **Client Dashboard:** Saved properties and account management preview (`/dashboard`) (`M07`).
- **Backend & Database Infrastructure:** Dynamic CMS integration, remote database queries, and pagination beyond the 12-property MVP dataset.

---

## 7. Quality Assurance & Verification Evidence

All technical quality gates and visual checks have been executed and verified against production builds:

1. **Unit Test Suite:** 86 tests passing across 5 suites (`tests/unit/*.test.ts`) with 0 failures in 448ms.
2. **Static Typecheck:** Strict `tsc --noEmit` exited with code 0 (zero type errors).
3. **Linting:** ESLint exited with code 0 (zero warnings, zero errors).
4. **Production Build & Prerender:** `next build` succeeded with code 0:
   - Route `/` — Static (182 B, First Load JS: 113 kB).
   - Route `/_not-found` — Static (993 B, First Load JS: 104 kB).
   - Route `/properties` — Prerendered as static content via `<Suspense>` boundary (12.7 kB, First Load JS: 125 kB).
5. **Multi-Viewport Browser QA (Playwright MCP):**
   - **Desktop (1440×900):** Sticky filter bar, 3-column card grid, header clearance (`pt-28 md:pt-36`), sort selector.
   - **Tablet (768×1024):** 2-column card grid, proportional spacing, horizontal filter overflow safety.
   - **Mobile (390×844):** Single-column grid, compact mobile toolbar, filter trigger button with active chip counter.
   - **Mobile Drawer Overlay (390×844):** Bottom sheet modal, draft selection, dynamic Apply button calculation (`Terapkan (6)` $\to$ `Terapkan (0)` $\to$ `Terapkan (2)`), focus trapping, and backdrop dismiss.
   - **Zero-Match Empty State:** Refined empty view rendering with search badge and functional *"Reset Seluruh Filter"* button.
