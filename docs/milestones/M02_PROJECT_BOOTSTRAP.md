# Milestone M02 — Project Bootstrap & Technical Foundation

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Planned  
**Authoritative References:** `docs/PRD.md`, `docs/FSD.md`, `docs/DESIGN_SYSTEM.md`, `docs/ARCHITECTURE.md`  

---

## 1. Objective

Bootstrap the **Next.js App Router** application with **React**, **TypeScript**, **Tailwind CSS**, and **Lucide React**; configure the **NARA ESTATE** design tokens (`Limestone`, `Ink`, `Sage`, `Bronze`, `Sand`, `White`) and typography (`Cormorant Garamond`, `DM Sans`); establish core TypeScript interfaces, utility helpers, the 12-property + advisor static dataset foundation, and the minimal root application shell.

---

## 2. Scope

- Inspect repository state and initialize Next.js App Router with TypeScript and Tailwind CSS in `D:\GitHub\bedi-real-estate` while preserving `docs/`, `.gitignore`, and directory structure.
- Install approved core dependencies (`next`, `react`, `react-dom`, `typescript`, `tailwindcss`, `lucide-react`, and `@playwright/test` dev configuration if applicable).
- Configure Google Fonts (`Cormorant Garamond` and `DM Sans`) and CSS custom properties / Tailwind theme tokens matching `docs/DESIGN_SYSTEM.md`.
- Define strict TypeScript domain types in `src/types/` (`Property`, `Agent`, `FilterState`, `MortgageInput`, `MortgageResult`).
- Create the curated local TypeScript dataset in `src/data/` containing the **12 fictional properties** and **NARA ESTATE** advisors, plus pure data lookup/formatting utilities in `src/lib/`.
- Implement the foundational Root Layout (`src/app/layout.tsx`), base global styles, and a minimal placeholder/shell page so `npm run dev` and `npm run build` succeed cleanly.

> **CRITICAL MILESTONE BOUNDARY RULE:**  
> **M02 must NOT implement feature UI views belonging to M03 or later milestones.** Specifically, M02 must not build the full Homepage sections (`M03`), Property Catalog/Filter UI (`M04`), Property Detail/Gallery UI (`M05`), Agent Pages/KPR UI/Contact Form UI (`M06`), or Dashboard Preview (`M07`).

---

## 3. Expected Deliverables

1. `package.json`, `tsconfig.json`, `next.config.ts` (or `.mjs`), and PostCSS/Tailwind configuration files.
2. Global stylesheet (`src/styles/globals.css` or `src/app/globals.css`) defining NARA ESTATE color tokens (`#F4F0E8`, `#252722`, `#858875`, `#B39A78`, `#E4DED2`, `#FFFFFF`) and typography variables.
3. Domain type definitions in `src/types/` (`property.ts`, `agent.ts`, `index.ts`).
4. Local static datasets in `src/data/` (`properties.ts` with 12 fictional properties, `agents.ts` with fictional advisors) and core pure helpers in `src/lib/` (`formatters.ts`, `mortgage.ts`, `whatsapp.ts`).
5. Root layout (`src/app/layout.tsx`) with Bahasa Indonesia `lang="id"` metadata, font loading, and base layout wrapper (`FR-015` foundation).

---

## 4. Dependencies

- Completion and Project Owner approval of **M01.5** (`docs/` and repository skeleton).
- Local environment running Node.js `v24.18.0` and npm `11.16.0`.

---

## 5. Acceptance Criteria

- [ ] Next.js App Router project compiles with zero TypeScript errors (`npx tsc --noEmit`).
- [ ] `npm run build` succeeds without errors.
- [ ] Initial color tokens (`Limestone`, `Ink`, `Sage`, `Bronze`, `Sand`, `White`) and fonts (`Cormorant Garamond`, `DM Sans`) are properly configured and applied to the document root.
- [ ] `src/data/properties.ts` exports exactly 12 strongly typed fictional properties in Bahasa Indonesia.
- [ ] Pure utility functions in `src/lib/` (IDR formatting, KPR formula, WhatsApp link builder) are implemented and type-safe.
- [ ] No feature screens from `M03`–`M07` have been prematurely implemented.

---

## 6. Explicit Out-of-Scope Items

- Full Homepage sections: Hero visual showcase, Quick Search widget, Featured Properties grid, Brand Narrative, Services, Advisor preview (`M03`).
- Property Catalog page (`/properti`), search bar UI, filter controls, and sort dropdown (`M04`).
- Property Detail page (`/properti/[slug]`), interactive image gallery/lightbox, and related properties UI (`M05`).
- Agent Directory (`/agen`), Agent Profile (`/agen/[slug]`), interactive Mortgage Calculator UI component, and Contact Form UI (`M06`).
- Executive Dashboard Preview (`/dashboard`) and Unsupported Feature modal workflows (`M07`).
- Any database, Prisma, authentication, or Docker configuration.

---

## 7. Verification Checklist

- [ ] Run `npx tsc --noEmit` and confirm 0 errors.
- [ ] Run `npm run build` and confirm clean production build.
- [ ] Verify `docs/` and `.gitignore` remain intact.
- [ ] Verify `src/data/properties.ts` contains exactly 12 valid property records.
- [ ] Confirm strict compliance with the M02 boundary (no M03+ UI features built early).

