# Product Requirements Document (PRD)

**Project:** BEDI REAL ESTATE  
**Brand / Fictional Demo Agency:** NARA ESTATE  
**Tagline:** *Find a place to belong.*  
**Document Version:** 1.0 (Approved Baseline — M01.5)  
**Status:** Approved  
**Repository:** https://github.com/yabedip94/bedi-real-estate  

---

## 1. Product Overview

**BEDI REAL ESTATE** (operating under the fictional luxury agency brand **NARA ESTATE**) is a **Premium Property Discovery & Marketing Platform** built as an architectural-grade MVP Showcase. The platform presents a curated portfolio of 12 fictional luxury and middle-up residential and commercial properties in Indonesia, combining editorial storytelling with functional property search, filtering, mortgage simulation (KPR), agent profiling, WhatsApp lead generation, and an executive dashboard preview.

The platform is engineered to demonstrate modern frontend architecture, refined editorial UI/UX design (*Editorial Architecture × Modern Luxury*), high performance, and end-to-end quality assurance without requiring backend database infrastructure or containerization.

---

## 2. Product Vision

To redefine how discerning buyers and investors experience online property discovery in Indonesia—transforming transactional listing directories into an calm, architectural, magazine-worthy digital space where every residence is presented with clarity, spatial respect, and effortless inquiry pathways.

---

## 3. Brand Identity

| Attribute | Specification |
| :--- | :--- |
| **Project Name** | BEDI REAL ESTATE |
| **Fictional Agency Brand** | **NARA ESTATE** |
| **Tagline** | *Find a place to belong.* |
| **Design Direction** | Editorial Architecture × Modern Luxury |
| **Brand Archetype** | The Curatorial Architect — calm, authoritative, discerning, warm, and transparent |
| **Visual Signature** | High-contrast serif display typography (`Cormorant Garamond`), clean geometric body copy (`DM Sans`), warm organic stone/earth palette (`Limestone`, `Ink`, `Sage`, `Bronze`, `Sand`), and expansive architectural photography |
| **Primary Interface Language** | Bahasa Indonesia (preserving established international luxury & architectural terms where natural, alongside the brand tagline *"Find a place to belong."*) |

---

## 4. Target Audience

1. **Affluent Homebuyers & End-Users (Primary):**
   - Individuals and families seeking primary residences, signature villas, penthouses, or modern townhouses with strong architectural merit and lifestyle value.
2. **Property Investors (Primary):**
   - Mid-to-high-net-worth buyers evaluating capital appreciation, strategic locations, land/building specifications, and financing structures via transparent KPR simulation.
3. **Property Owners & Developers (Secondary):**
   - Prospective sellers evaluating NARA ESTATE's curatorial marketing presentation and advisory team.
4. **Portfolio Reviewers, Recruiters & Technical Stakeholders (Showcase Audience):**
   - Engineering leaders, product designers, and clients assessing the software architecture, UI craftsmanship, responsive fidelity, and Playwright test coverage of the BEDI REAL ESTATE project.

---

## 5. Target Market

- **Segment:** Premium and middle-up property segments in Indonesia (e.g., Jakarta Selatan, Menteng, Pondok Indah, BSD/Alam Sutera, Bandung Utara, Canggu/Uluwatu Bali, Surabaya Barat).
- **Property Types:** Luxury Houses (*Rumah Tapak Premium*), Architectural Villas (*Vila*), Penthouses & High-End Apartments (*Apartemen / Penthouse*), Modern Townhouses (*Townhouse*), and Boutique Commercial/Prime Land (*Komersial / Kavling Premium*).
- **Transaction Types:** Primary focus on Direct Sale (*Dijual*) and Select Luxury Lease (*Disewa*).
- **Currency & Units:** Indonesian Rupiah (`IDR` / `Rp`, formatted idiomatically such as `Rp 8,5 Miliar` or `Rp 8.500.000.000`) and square meters (`m²` for *Luas Tanah* / LT and *Luas Bangunan* / LB).

---

## 6. Product Objectives

1. **Deliver an Editorial Brand Experience:** Establish immediate visual credibility through an asymmetric architectural layout, warm tactile color palette, and curated photography.
2. **Enable Seamless Property Discovery:** Allow users to search, filter (by location, property type, listing status, price range, bedrooms), and sort a curated inventory of 12 fictional properties instantaneously on the client side.
3. **Provide Deep Property Context:** Present comprehensive property detail pages featuring multi-image galleries, architectural specifications (LT, LB, bedrooms, bathrooms, certificate type, facilities), related listings, and integrated KPR calculators.
4. **Drive High-Intent Lead Conversion:** Offer frictionless WhatsApp inquiry links pre-populated with property context, alongside structured contact forms and direct agent profiles.
5. **Showcase Product Completeness:** Include an interactive, read-only Dashboard Preview (`FR-013`) demonstrating how agency administrators view portfolio metrics, inquiries, and inventory health.
6. **Maintain Strict Engineering Discipline:** Deliver a fast, accessible, zero-database Next.js App Router application deployed on Vercel and verified with automated Playwright E2E tests.

---

## 7. Success Criteria

| Category | Metric / Criterion |
| :--- | :--- |
| **Functional Completeness** | 100% of approved requirements (`FR-001` through `FR-015`) implemented and verified against acceptance criteria. |
| **Inventory Accuracy** | Exactly 12 richly detailed, realistic fictional properties and a dedicated roster of fictional NARA ESTATE advisors stored in strongly typed local TypeScript modules. |
| **Build & Type Safety** | Zero TypeScript compilation errors (`tsc --noEmit`) and clean Next.js production builds (`next build`). |
| **Automated QA** | All core user journeys pass automated Playwright end-to-end tests across desktop and mobile viewports. |
| **UX & Accessibility** | WCAG AA contrast compliance on core text/background pairings, full keyboard navigation support, and graceful handling of unsupported/non-MVP actions (`FR-014`). |
| **Deployment Readiness** | Live, zero-configuration deployment compatibility with Vercel without Docker or external database dependencies. |

---

## 8. Product Scope (In-Scope MVP Features)

1. **Homepage (`FR-001`):** Hero showcase with architectural photography, quick search bar, featured properties, editorial brand story, service highlights, featured agents preview, and CTA banner.
2. **Property Listing & Catalog (`FR-002`):** Full catalog view displaying the 12 curated properties with key specs, badges, and pagination/count summary.
3. **Property Search (`FR-003`):** Keyword search across property title, location/area, and description.
4. **Property Filtering (`FR-004`):** Multi-criteria filtering by transaction status (*Dijual* / *Disewa*), property type, city/location, price range, and minimum bedrooms, plus active filter chips and one-click reset.
5. **Property Sorting (`FR-005`):** Sort listings by Featured (*Unggulan*), Newest (*Terbaru*), Price Low-to-High (*Harga Terendah*), Price High-to-Low (*Harga Tertinggi*), and Land/Building Area.
6. **Property Detail (`FR-006`):** Dedicated dynamic route (`/properti/[slug]`) with full architectural narrative, specifications table, location context, assigned agent card, embedded mortgage calculator, and related properties.
7. **Property Image Gallery (`FR-007`):** Interactive multi-image gallery with primary preview, thumbnail selector, and modal/lightbox inspection.
8. **WhatsApp Inquiry (`FR-008`):** Direct WhatsApp deep-linking (`wa.me`) with pre-filled Bahasa Indonesia message templates tailored to the specific property or agent.
9. **Agent Directory (`FR-009`):** Dedicated directory (`/agen`) showcasing NARA ESTATE property advisors, their specializations, and contact links.
10. **Agent Profile (`FR-010`):** Individual advisor profile view (`/agen/[slug]`) displaying biography, credentials, active listings managed by the agent, and direct inquiry actions.
11. **Mortgage Calculator / Simulasi KPR (`FR-011`):** Interactive calculator computing estimated monthly installments, principal loan amount, down payment (DP), interest rate, and tenure using the standard amortizing formula.
12. **Contact Form (`FR-012`):** Validated client-side inquiry and private consultation form (`/kontak` and contextual sections) with realistic submission feedback state.
13. **Dashboard Preview (`FR-013`):** Showcase executive dashboard (`/dashboard`) displaying mock KPI summary cards, property inventory table, and recent lead inquiries in read-only demonstration mode.
14. **Unsupported Features Handling (`FR-014`):** Explicit, polite UI feedback (toast/modal/banner or disabled state explanation) for out-of-scope actions (e.g., live account login, saving favorites across devices, CRUD database mutations).
15. **Responsive Navigation (`FR-015`):** Sticky editorial header, mobile drawer menu, active route indicators, and comprehensive footer across all viewports.

---

## 9. Out-of-Scope Features

To protect the **MVP Showcase** philosophy and prevent scope creep, the following are strictly **out of scope**:

- **No Database or Backend Persistence:** No PostgreSQL, MySQL, MongoDB, Supabase, Firebase, or Prisma. All data resides in static TypeScript modules.
- **No Real Authentication or User Accounts:** No NextAuth, Clerk, JWT login, registration, password reset, or role-based access control.
- **No Docker or Containerization:** No `Dockerfile`, `docker-compose.yml`, or container orchestration.
- **No Live Payment Gateways or Booking Engines:** No Midtrans, Stripe, Xendit, or online escrow transactions.
- **No Real-Time Chat Server or WebSockets:** All instant messaging inquiries route through standard WhatsApp URLs (`wa.me`) or simulated client-side form submissions.
- **No Live Map API Billing Dependencies:** No mandatory paid Google Maps or Mapbox API keys required to build or run the project; architectural location cards and static/embedded visual representations are used.
- **No Multi-Language i18n Switcher:** The application is authored natively in Bahasa Indonesia (with approved brand English tagline/terms) without runtime locale switching.
- **No Full CMS / Admin CRUD:** The Dashboard Preview (`FR-013`) is a visual & interactive frontend showcase, not a persistent content management system.

---

## 10. Technical Constraints

- **Framework:** Next.js (App Router) with React and TypeScript (`strict` mode).
- **Styling:** Tailwind CSS with custom CSS variables / design tokens matching `docs/DESIGN_SYSTEM.md`.
- **Icons:** Lucide React (`lucide-react`).
- **Animations:** Subtle CSS transitions/animations or lightweight Motion only when justified by editorial UX.
- **Data Layer:** Local TypeScript demonstration data (`src/data/`) comprising **12 fictional properties** and associated fictional agents.
- **Testing:** Playwright for automated End-to-End (E2E) verification.
- **Deployment Target:** Vercel (static/SSR hybrid compatible out-of-the-box).
- **Development Environment:** Windows (`D:\GitHub\bedi-real-estate`), Antigravity IDE, Node.js `v24.18.0`, npm `11.16.0`.

---

## 11. Design Principles

1. **Editorial Asymmetric Grid:** Move beyond generic 3-column SaaS templates by using magazine-style proportions, varied visual rhythm, and structured alignment.
2. **Generous Whitespace:** Let architectural imagery and typography breathe against warm `Limestone` (`#F4F0E8`) and `Sand` (`#E4DED2`) surfaces.
3. **Architectural Photography First:** Treat property imagery as art—high-resolution framing, subtle hover scale transitions, and clean aspect ratios.
4. **Sophisticated Typography:** Pair expressive `Cormorant Garamond` headings with crisp `DM Sans` body text and tabular numbers for pricing and floor areas.
5. **Functional Property Discovery:** Aesthetic restraint must never obscure usability—filters, prices, specifications, and CTAs must remain immediately scannable.
6. **Responsive Design:** Seamless adaptation across Mobile (`< 640px`), Tablet (`640px – 1024px`), and Desktop (`> 1024px`).
7. **Subtle Animations:** Calm, deliberate transitions (`200ms–400ms` cubic-bezier) that reinforce luxury without visual noise.
8. **Accessible Contrast:** High legibility using deep `Ink` (`#252722`) on light stone backgrounds and clear focus states.

---

## 12. Language Requirements

- **Primary Language:** **Bahasa Indonesia** (formal, refined, editorial register suitable for luxury real estate—e.g., *"Hunian Terkurasi"*, *"Luas Tanah"*, *"Luas Bangunan"*, *"Jadwalkan Kunjungan Privat"*, *"Simulasi KPR"*).
- **Preserved Brand Elements:**
  - Brand Name: **NARA ESTATE**
  - Official Tagline: **"Find a place to belong."**
  - Select universal real estate terms natural to the Indonesian luxury market (e.g., *Penthouse*, *Townhouse*, *Smart Home*, *Private Pool*, *Master Bedroom*).
- **Formatting Conventions:**
  - Currency: Indonesian Rupiah (`Rp`), abbreviated cleanly in cards (`Rp 12,5 Miliar`, `Rp 950 Juta`) and formatted with dot separators (`Rp 12.500.000.000`) in detailed breakdowns and calculators.
  - Area Measurements: Square meters (`m²`), using standard abbreviations `LT` (*Luas Tanah*) and `LB` (*Luas Bangunan*).

---

## 13. Content Strategy

- **12 Fictional Properties:** Carefully balanced across Indonesia's premier residential enclaves (e.g., Kebayoran Baru, Menteng, Pondok Indah, Senopati/SCBD, BSD City, Canggu, Uluwatu, Dago Pakar, Pakuwon Indah) covering Houses, Villas, Penthouses, and Townhouses.
- **Architectural Storytelling:** Every property includes an evocative editorial title (e.g., *The Kayuputih Residence*, *Villa Terra Uluwatu*), a curated summary, a multi-paragraph architectural narrative, complete technical specifications, and realistic pricing.
- **Curated Visual Assets:** High-taste architectural and interior photography curated from royalty-free architectural sources or local assets under `public/images/`.
- **Senior Property Advisors:** 4–6 fictional NARA ESTATE advisors with distinct regional/segment specializations, realistic Indonesian profiles, and direct WhatsApp contact triggers.

---

## 14. User Journeys

### Journey 1: Discerning Buyer — Discovery to WhatsApp Inquiry
1. User lands on the **Homepage (`FR-001`)** and experiences the NARA ESTATE hero showcase (*"Find a place to belong."*).
2. User enters a location or selects a property type in the quick search bar and navigates to **Property Listing (`FR-002`)**.
3. User refines results using **Property Filtering (`FR-004`)** (e.g., *Dijual*, *Jakarta Selatan*, *4+ Kamar Tidur*) and **Sorting (`FR-005`)**.
4. User selects a residence to view **Property Detail (`FR-006`)** and browses the **Image Gallery (`FR-007`)**.
5. User clicks **"Hubungi via WhatsApp" (`FR-008`)**, opening a pre-populated WhatsApp inquiry addressed to the assigned advisor.

### Journey 2: Financial Evaluation — KPR Simulation
1. While inspecting a property on the **Property Detail (`FR-006`)** page (or dedicated calculator section), the user scrolls to the **Mortgage Calculator (`FR-011`)**.
2. The calculator auto-populates with the property's listed price.
3. User adjusts the Down Payment percentage (e.g., `20%`), annual interest rate (e.g., `7.5%`), and tenure (e.g., `15 Tahun`).
4. The interface immediately recalculates and displays the estimated monthly installment (*Estimasi Cicilan per Bulan*), loan principal (*Pokok Pinjaman*), and total payment breakdown.

### Journey 3: Advisor-Led Consultation
1. User navigates to the **Agent Directory (`FR-009`)** via the main navigation bar (`FR-015`).
2. User selects a senior advisor to view their **Agent Profile (`FR-010`)** and active property portfolio.
3. User either initiates a direct WhatsApp chat (`FR-008`) or submits a private consultation request via the **Contact Form (`FR-012`)**.

### Journey 4: Executive Portfolio Inspection (Dashboard Preview)
1. Stakeholder clicks **"Dashboard Preview"** in the navigation (`FR-015`) to visit `/dashboard` (`FR-013`).
2. User inspects portfolio KPIs (Total Inventory Value, Active Listings, Monthly Inquiries), filters the mock inventory table, and tests an administrative action button—which gracefully displays the **Unsupported Features (`FR-014`)** showcase notice explaining the read-only MVP mode.

---

## 15. Milestone Governance

The project follows a strict, sequential 9-milestone lifecycle (`M01` through `M09`):

| Milestone | Title | Core Focus |
| :--- | :--- | :--- |
| **M01** | Product Discovery & Foundation | Product requirements, functional specification, design system, architecture, milestone plan, and repository skeleton (`M01.5`). |
| **M02** | Project Bootstrap | Next.js App Router initialization, TypeScript, Tailwind CSS tokens, typography, base layout shell, and static data types/seed structure. |
| **M03** | Homepage & Brand Experience | Full implementation of `FR-001` and `FR-015` (Hero, Featured Listings, Editorial Narrative, Services, Advisor Preview, Header/Footer). |
| **M04** | Property Discovery | Full implementation of `FR-002`, `FR-003`, `FR-004`, and `FR-005` (Catalog, Search, Multi-Filter, Sorting, Empty States). |
| **M05** | Property Detail & Conversion | Full implementation of `FR-006`, `FR-007`, and `FR-008` (Dynamic Detail Page, Gallery/Lightbox, WhatsApp Inquiry, Related Properties). |
| **M06** | Supporting Features | Full implementation of `FR-009`, `FR-010`, `FR-011`, and `FR-012` (Agent Directory, Agent Profiles, KPR Calculator, Contact Form). |
| **M07** | Dashboard Preview | Full implementation of `FR-013` and `FR-014` (Executive Dashboard Showcase and graceful MVP Unsupported Feature handlers). |
| **M08** | QA & Optimization | Playwright E2E test suite, responsive/cross-viewport audit, accessibility checks, performance optimization, and bug resolution. |
| **M09** | Deployment & Handover | Production build verification, Vercel deployment configuration, final README documentation, and portfolio release. |

**Governance Rule:** No milestone may prematurely implement features assigned to a subsequent milestone, nor Proceed without explicit project-owner approval.

---

## 16. Change Management

1. **Authoritative Baseline:** This `docs/PRD.md` and `docs/FSD.md` serve as the single source of truth for product scope and behavior.
2. **Scope Freeze per Milestone:** Once a milestone begins, no unapproved features, third-party libraries, or architectural deviations may be introduced.
3. **Refinement Protocol:** Visual polish and design token calibration (as noted in `docs/DESIGN_SYSTEM.md`) are permitted during implementation only if they preserve the **NARA ESTATE** brand identity and do not alter functional requirements (`FR-001`–`FR-015`).
4. **Formal Change Request:** Any modification to functional requirements, property inventory count (12 properties), technology stack, or milestone boundaries requires explicit written approval from the Project Owner and a corresponding update to `docs/PRD.md` and `docs/FSD.md`.

