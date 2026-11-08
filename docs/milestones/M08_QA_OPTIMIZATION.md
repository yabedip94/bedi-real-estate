# Milestone M08 — Automated QA, Accessibility & Performance Optimization

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Planned  
**Mapped Requirements:** Verification of `FR-001` through `FR-015`  

---

## 1. Objective

Verify the entire **BEDI REAL ESTATE (NARA ESTATE)** platform through automated **Playwright** End-to-End (E2E) test suites, cross-viewport responsive audits, WCAG accessibility checks, performance optimization, and defect resolution across all 15 functional requirements (`FR-001`–`FR-015`).

---

## 2. Scope

- **Playwright End-to-End Test Suite (`tests/e2e/`):**
  - Configure `playwright.config.ts` to run against the local Next.js server.
  - Author comprehensive automated tests covering:
    1. **Homepage & Navigation (`FR-001`, `FR-015`):** Brand identity, tagline *"Find a place to belong."*, featured properties, desktop header, and mobile menu drawer (`375×812`).
    2. **Property Discovery (`FR-002`–`FR-005`):** Default 12-property listing count, keyword search, multi-criteria filtering, price/newest sorting, and zero-result empty state recovery.
    3. **Property Detail & Conversion (`FR-006`–`FR-008`):** Dynamic property detail rendering, image gallery thumbnail switching & lightbox modal, related properties, and WhatsApp `wa.me` URL structure.
    4. **Supporting Features (`FR-009`–`FR-012`):** Agent directory, agent profile listings, KPR mortgage calculator formula verification, and contact form validation/submission.
    5. **Dashboard Preview & Scope Governance (`FR-013`, `FR-014`):** Dashboard KPIs, inventory table, and Unsupported Feature modal trigger/dismissal.
- **Responsive & Visual Polish Audit:**
  - Verify layout integrity across Mobile (`375px`), Tablet (`768px`), and Desktop (`1440px`) viewports with zero horizontal overflow.
- **Accessibility (a11y) & SEO Audit:**
  - Semantic HTML landmarks (`header`, `main`, `nav`, `footer`), heading hierarchy (`h1`–`h3`), descriptive Bahasa Indonesia image `alt` texts, form labels, keyboard focus indicators, and page metadata.
- **Bug Fixing & Refinement:**
  - Resolve any UI edge cases, console warnings, or TypeScript strictness issues discovered during testing.

---

## 3. Expected Deliverables

1. `playwright.config.ts` and test scripts in `package.json` (`test:e2e`).
2. Automated E2E test suites in `tests/e2e/` and test helpers/fixtures in `tests/fixtures/`.
3. Bug fixes, accessibility improvements, and responsive refinements across `src/`.
4. Zero-error execution report for `npx tsc --noEmit`, `npm run lint`, `npm run build`, and `npx playwright test`.

---

## 4. Dependencies

- Feature completion of **M02** through **M07** (`FR-001`–`FR-015`).

---

## 5. Acceptance Criteria

- [ ] All Playwright E2E tests in `tests/e2e/` pass (`100%` pass rate) across configured desktop and mobile viewports.
- [ ] Every functional requirement (`FR-001` through `FR-015`) has automated test coverage.
- [ ] Zero runtime console errors, uncaught page exceptions, or React hydration errors during E2E journeys.
- [ ] Zero TypeScript errors (`npx tsc --noEmit`) and clean production build (`npm run build`).
- [ ] WCAG AA color contrast and keyboard navigation verified across modals, drawers, galleries, and forms.

---

## 6. Explicit Out-of-Scope Items

- Introducing new product features outside `FR-001`–`FR-015`.
- External load testing or third-party cloud monitoring agents.
- Production deployment to Vercel (`M09`).

---

## 7. Verification Checklist

- [ ] Run `npx tsc --noEmit` (0 errors).
- [ ] Run `npm run build` (clean static/hybrid build).
- [ ] Run `npx playwright test` and confirm all test suites pass.
- [ ] Verify mobile (`375px`) and desktop (`1440px`) layouts have no horizontal scrollbar or broken images.

