# Milestone M03 — Homepage & Brand Experience

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Planned  
**Mapped Requirements:** `FR-001` (Homepage), `FR-015` (Responsive Navigation)  

---

## 1. Objective

Implement the complete **NARA ESTATE** Homepage (`/`) and global **Responsive Navigation** (`Header`, `MobileNav`, `Footer`), delivering an editorial luxury first impression (*Editorial Architecture × Modern Luxury*) in Bahasa Indonesia while enabling direct discovery pathways into the property catalog.

---

## 2. Scope

- **Global Responsive Navigation (`FR-015`):**
  - Sticky editorial header with **NARA ESTATE** wordmark, desktop navigation links (`Beranda`, `Koleksi Properti`, `Penasihat`, `Kontak`, `Dashboard`), active route state, and consultation CTA.
  - Accessible mobile navigation drawer/overlay for viewports `< 768px`.
  - Comprehensive editorial footer with brand tagline (*"Find a place to belong."*), navigation columns, flagship office details, and MVP Showcase note.
- **Homepage (`FR-001`):**
  - **Hero Section:** High-impact architectural photography, Bahasa Indonesia editorial headline, English tagline *"Find a place to belong."*, and primary CTAs.
  - **Quick Search Bar:** Interactive search/filter bar (keyword, property type, transaction status) that navigates to `/properti` with URL query parameters.
  - **Featured Properties Showcase (*Koleksi Properti Pilihan*):** Asymmetric or structured editorial grid displaying featured listings (`isFeatured: true`) using the reusable `PropertyCard` component.
  - **Editorial Brand Story & Philosophy:** Architectural storytelling section with curated metrics (e.g., curated portfolio value, years of advisory excellence, prime enclaves).
  - **Service Highlights (*Layanan Terkurasi*):** Overview of NARA ESTATE's private acquisition, architectural curation, and investment advisory pillars.
  - **Featured Advisors Preview:** Showcase of senior property advisors with links to `/agen`.
  - **Consultation Call-to-Action Banner:** High-contrast `Ink` / `Bronze` editorial section driving users to `/kontak` or WhatsApp.

---

## 3. Expected Deliverables

1. `src/components/layout/Header.tsx`, `MobileNav.tsx`, and `Footer.tsx` (`FR-015`).
2. `src/components/properties/PropertyCard.tsx` (reusable across Homepage, Catalog, Detail, and Agent Profile).
3. `src/components/home/HeroSection.tsx` and `QuickSearchBar.tsx`.
4. `src/components/home/FeaturedPropertiesSection.tsx`.
5. `src/components/home/EditorialStorySection.tsx` and `ServicesSection.tsx`.
6. `src/components/home/FeaturedAgentsSection.tsx` and `ConsultationCta.tsx`.
7. Complete Homepage implementation in `src/app/page.tsx` (`FR-001`).

---

## 4. Dependencies

- Completion and approval of **M02** (Next.js bootstrap, design tokens, 12-property dataset, and type definitions).

---

## 5. Acceptance Criteria

- [ ] Homepage (`/`) renders the NARA ESTATE brand identity, tagline *"Find a place to belong."*, and architectural hero photography in alignment with `docs/DESIGN_SYSTEM.md`.
- [ ] Quick Search bar submits user selections to `/properti?q=...&type=...&status=...`.
- [ ] Featured Properties section displays only properties with `isFeatured: true` from the 12-property dataset, showing formatted IDR prices and key specs (`LT`, `LB`, `KT`, `KM`).
- [ ] Desktop header and mobile drawer navigation (`FR-015`) operate smoothly across Desktop (`1440px`), Tablet (`768px`), and Mobile (`375px`) viewports.
- [ ] All primary copy is in natural Bahasa Indonesia (preserving the English tagline *"Find a place to belong."*).

---

## 6. Explicit Out-of-Scope Items

- Full Property Listing catalog page (`/properti`), multi-faceted filter sidebar/bar, and sorting logic (`M04`).
- Property Detail page (`/properti/[slug]`) and interactive image lightbox (`M05`).
- Standalone Agent Directory (`/agen`), Agent Profile (`/agen/[slug]`), Mortgage Calculator UI (`FR-011`), and Contact Form page (`/kontak`) (`M06`).
- Dashboard Preview page (`/dashboard`) (`M07`).

---

## 7. Verification Checklist

- [ ] Verify `/` loads with zero console errors or hydration warnings.
- [ ] Verify mobile drawer opens, navigates, and closes cleanly at `375px` width.
- [ ] Verify Quick Search bar constructs valid `/properti` query strings.
- [ ] Run `npx tsc --noEmit` and `npm run build` to confirm zero build regressions.

