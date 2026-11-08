# BEDI REAL ESTATE — NARA ESTATE

> **Status:** 🚧 **MVP Showcase — In Development (Milestone M01.5: Documentation & Repository Foundation)**
> *Note: This repository is currently at the architectural specification and directory foundation stage. Application source code and UI features are scheduled for implementation across Milestones M02–M09.*

---

## 1. Project Overview

**BEDI REAL ESTATE** (operating under the fictional luxury real estate agency brand **NARA ESTATE**) is a **Premium Property Discovery & Marketing Platform** conceived and engineered as a portfolio-grade **MVP Showcase**.

The platform is designed to present a curated inventory of **12 fictional luxury and middle-up properties** across premier Indonesian residential enclaves in **Bahasa Indonesia**, combining architectural monograph storytelling with client-side property discovery, mortgage simulation (Simulasi KPR), advisor directories, WhatsApp lead generation, and a read-only executive dashboard preview.

---

## 2. Product Positioning

- **Product Category:** Premium Property Discovery & Marketing Platform.
- **Development Philosophy:** **MVP Showcase** (focused on frontend architectural excellence, editorial UI/UX craftsmanship, type safety, and automated E2E verification—intentionally built without backend database dependencies, authentication walls, or Docker containerization).
- **Target Market:** Premium and middle-up residential & commercial property segments in Indonesia.
- **Primary Interface Language:** Bahasa Indonesia (preserving the brand tagline *"Find a place to belong."* and natural international architectural terminology).

---

## 3. Brand Concept

| Attribute | Specification |
| :--- | :--- |
| **Fictional Agency Brand** | **NARA ESTATE** |
| **Tagline** | *"Find a place to belong."* |
| **Design Direction** | **Editorial Architecture × Modern Luxury** |
| **Hero Visual Strategy** | Curated architectural photography |
| **Typography** | `Cormorant Garamond` (Display) × `DM Sans` (Body & Numerals) |
| **Initial Color Palette** | Limestone (`#F4F0E8`), Ink (`#252722`), Sage (`#858875`), Bronze (`#B39A78`), Sand (`#E4DED2`), White (`#FFFFFF`) |

---

## 4. Planned Key Features (`FR-001` – `FR-015`)

The following functional requirements are specified in [`docs/FSD.md`](docs/FSD.md) and scheduled for upcoming implementation milestones:

- **FR-001 — Homepage:** Editorial hero with architectural photography, quick search widget, featured property collection, brand narrative, service pillars, and advisor preview.
- **FR-002 — Property Listing:** Curated catalog displaying the 12 fictional properties with key architectural specs (`LT`, `LB`, `KT`, `KM`) and IDR pricing.
- **FR-003 — Property Search:** Instant case-insensitive keyword search across property titles, neighborhoods, and cities.
- **FR-004 — Property Filtering:** Multi-faceted filtering by transaction status (*Dijual* / *Disewa*), property type, location, price range, and minimum bedrooms.
- **FR-005 — Property Sorting:** Sort listings by Featured, Newest, Price (Low to High / High to Low), and Land Area.
- **FR-006 — Property Detail:** Dynamic detail pages (`/properti/[slug]`) with full architectural narrative, specification tables, certificate info (`SHM`/`HGB`), and related properties.
- **FR-007 — Property Image Gallery:** Multi-image architectural showcase with interactive thumbnail switching and lightbox inspection.
- **FR-008 — WhatsApp Inquiry:** Contextual `wa.me` deep-linking with pre-formatted Bahasa Indonesia inquiry templates.
- **FR-009 & FR-010 — Agent Directory & Profiles:** Senior property advisor directory (`/agen`) and individual advisor portfolio pages (`/agen/[slug]`).
- **FR-011 — Mortgage Calculator (Simulasi KPR):** Interactive amortizing KPR calculator computing monthly installments, down payment, principal, and total interest.
- **FR-012 — Contact Form:** Client-side validated private consultation inquiry form (`/kontak`).
- **FR-013 & FR-014 — Dashboard Preview & Scope Transparency:** Read-only executive dashboard showcase (`/dashboard`) with polite modal explanations for out-of-scope backend actions.
- **FR-015 — Responsive Navigation:** Sticky editorial header, accessible mobile drawer navigation, and global footer.

---

## 5. Approved Technology Stack

- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Iconography:** Lucide React
- **Motion:** Subtle CSS animations / Motion when justified
- **Data Layer:** Local TypeScript demonstration data (12 fictional properties; no database required)
- **End-to-End Testing:** Playwright
- **Deployment Target:** Vercel (No Docker required)

---

## 6. Project Status

- **Current Phase:** **M01.5 — Documentation & Repository Foundation (Completed)**
- **Next Scheduled Phase:** **M02 — Project Bootstrap & Technical Foundation** (Awaiting Project Owner approval)
- **Implementation Status:** Documentation and directory skeleton established. Next.js initialization, npm package installation, and UI component implementation have **not** started yet.

---

## 7. Documentation Index

All authoritative product, functional, design, and architectural specifications are located in the [`docs/`](docs/) directory:

- **[Product Requirements Document (`docs/PRD.md`)](docs/PRD.md)** — Vision, target market, scope boundaries, user journeys, and governance.
- **[Functional Specification Document (`docs/FSD.md`)](docs/FSD.md)** — Detailed specifications for `FR-001` through `FR-015`, KPR formula, WhatsApp configuration, and routes.
- **[Design System (`docs/DESIGN_SYSTEM.md`)](docs/DESIGN_SYSTEM.md)** — **NARA ESTATE** brand tokens, color palette, typography scale, and editorial layout principles.
- **[Technical Architecture (`docs/ARCHITECTURE.md`)](docs/ARCHITECTURE.md)** — Next.js App Router structure, Server/Client Component boundaries, data separation, and testing/deployment strategy.

---

## 8. Planned Milestones

| Milestone | Document | Description | Status |
| :--- | :--- | :--- | :--- |
| **M01** | [`M01_PRODUCT_DISCOVERY.md`](docs/milestones/M01_PRODUCT_DISCOVERY.md) | Product discovery, design direction, documentation suite & repo skeleton (`M01.5`) | ✅ Completed |
| **M02** | [`M02_PROJECT_BOOTSTRAP.md`](docs/milestones/M02_PROJECT_BOOTSTRAP.md) | Next.js App Router bootstrap, dependencies, design tokens, types & static data | ⏳ Planned |
| **M03** | [`M03_HOMEPAGE.md`](docs/milestones/M03_HOMEPAGE.md) | Homepage experience (`FR-001`) and global responsive navigation (`FR-015`) | ⏳ Planned |
| **M04** | [`M04_PROPERTY_DISCOVERY.md`](docs/milestones/M04_PROPERTY_DISCOVERY.md) | Property catalog, search, multi-criteria filtering, sorting & empty states (`FR-002`–`FR-005`) | ⏳ Planned |
| **M05** | [`M05_PROPERTY_DETAIL.md`](docs/milestones/M05_PROPERTY_DETAIL.md) | Property detail page, image gallery lightbox, related listings & WhatsApp inquiry (`FR-006`–`FR-008`) | ⏳ Planned |
| **M06** | [`M06_SUPPORTING_FEATURES.md`](docs/milestones/M06_SUPPORTING_FEATURES.md) | Agent directory, agent profiles, KPR mortgage calculator & contact form (`FR-009`–`FR-012`) | ⏳ Planned |
| **M07** | [`M07_DASHBOARD_PREVIEW.md`](docs/milestones/M07_DASHBOARD_PREVIEW.md) | Read-only executive dashboard preview & unsupported feature handling (`FR-013`–`FR-014`) | ⏳ Planned |
| **M08** | [`M08_QA_OPTIMIZATION.md`](docs/milestones/M08_QA_OPTIMIZATION.md) | Playwright E2E testing, responsive QA, accessibility & performance optimization | ⏳ Planned |
| **M09** | [`M09_DEPLOYMENT.md`](docs/milestones/M09_DEPLOYMENT.md) | Production build verification, Vercel deployment & final portfolio handover | ⏳ Planned |

---

## 9. Repository Structure

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
