# Milestone M06 — Supporting Features (Agents, Mortgage Calculator & Contact Form)

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Planned  
**Mapped Requirements:** `FR-009` (Agent Directory), `FR-010` (Agent Profile), `FR-011` (Mortgage Calculator), `FR-012` (Contact Form), plus `FR-008` advisor WhatsApp touchpoints  

---

## 1. Objective

Implement the complete advisory and financial evaluation ecosystem for **NARA ESTATE**: the Senior Property Advisor Directory (`/agen`), individual Advisor Profile pages (`/agen/[slug]`), the interactive KPR Mortgage Calculator (`FR-011` embedded on Property Detail pages and accessible globally), and the validated Consultation Contact Form (`/kontak`).

---

## 2. Scope

- **Agent Directory (`FR-009`):**
  - Dedicated route `/agen` showcasing all fictional NARA ESTATE senior property advisors.
  - Advisor cards displaying portrait, name, title, regional specialization, years of experience, active listing count, direct WhatsApp button (`FR-008`), and link to `/agen/[slug]`.
- **Agent Profile (`FR-010`):**
  - Dynamic route `/agen/[slug]` pre-rendered with `generateStaticParams`.
  - Full editorial biography, credentials, languages, direct WhatsApp/email contact links, and a grid of all properties from the 12-property catalog assigned to that advisor.
- **Mortgage Calculator / Simulasi KPR (`FR-011`):**
  - Interactive Client Component (`src/components/forms/MortgageCalculator.tsx`) embedded on `/properti/[slug]` (initialized with the property's price) and available via `/simulasi-kpr` (or dedicated calculator view).
  - Inputs: Property Price (IDR), Down Payment percentage (`10%–80%`, default `20%`) with IDR amount display, Annual Interest Rate (`0%–15%`, default `7.5%`), and Loan Tenure (`5–30` years, default `15` years).
  - Outputs computed via the approved amortizing formula $M = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$ (and $M = P/n$ when $r = 0$): Monthly Installment (`M`), Down Payment Amount, Principal Loan (`P`), Total Estimated Payment, and Total Estimated Interest.
- **Contact Form (`FR-012`):**
  - Dedicated `/kontak` page featuring NARA ESTATE flagship office details, consultation hours, direct WhatsApp CTA, and the validated client-side `ContactForm`.
  - Fields: Nama Lengkap, Alamat Email, Nomor Telepon/WhatsApp, Topik Konsultasi, Properti yang Diminati (optional selector of 12 properties), and Pesan.
  - Client-side validation with Bahasa Indonesia field error messages and a polished submission confirmation state with optional WhatsApp handoff.

---

## 3. Expected Deliverables

1. `src/components/agents/AgentCard.tsx` and `AgentListingsGrid.tsx`.
2. `src/app/agen/page.tsx` (`FR-009`) and `src/app/agen/[slug]/page.tsx` (`FR-010`).
3. `src/components/forms/MortgageCalculator.tsx` (`FR-011`) integrated into `/properti/[slug]` (and `/simulasi-kpr` if exposed in nav).
4. `src/components/forms/ContactForm.tsx` (`FR-012`).
5. `src/app/kontak/page.tsx` (`FR-012`).

---

## 4. Dependencies

- Completion and approval of **M02** (`src/lib/mortgage.ts`, `src/data/agents.ts`), **M03**, **M04**, and **M05** (`/properti/[slug]` integration).

---

## 5. Acceptance Criteria

- [ ] `/agen` renders all NARA ESTATE advisors with accurate active listing counts and profile links (`FR-009`).
- [ ] `/agen/[slug]` renders the advisor's full profile and only the properties assigned to that advisor (`FR-010`).
- [ ] Mortgage Calculator (`FR-011`) accurately calculates monthly installments using $M = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$ and updates in real time when DP %, interest rate, or tenure changes.
- [ ] Contact Form (`/kontak`, `FR-012`) blocks invalid submissions with clear Bahasa Indonesia error messages and renders a confirmation summary state upon valid submission.

---

## 6. Explicit Out-of-Scope Items

- Executive Dashboard Preview (`/dashboard`) and Unsupported Feature showcase handlers (`M07`).
- Backend email delivery (SMTP/SendGrid) or database storage of contact submissions.
- Live bank API integrations or credit-scoring checks.

---

## 7. Verification Checklist

- [ ] Verify `/agen` and all `/agen/[slug]` routes build statically and render assigned listings.
- [ ] Verify KPR calculator outputs against known mathematical test cases (including standard `7.5%` interest and `0%` interest edge case).
- [ ] Verify `/kontak` form validation for empty fields, invalid email, and short phone/message inputs.
- [ ] Run `npx tsc --noEmit` and `npm run build`.

