# Functional Specification Document (FSD)

**Project:** BEDI REAL ESTATE  
**Brand / Fictional Demo Agency:** NARA ESTATE  
**Tagline:** *Find a place to belong.*  
**Document Version:** 1.0 (Approved Baseline — M01.5)  
**Status:** Approved  
**Authoritative Reference:** `docs/PRD.md`  

---

## 1. Functional Requirements (`FR-001` – `FR-015`)

### FR-001: Homepage
- **Description:** The landing page (`/`) serves as the primary brand and discovery gateway for **NARA ESTATE**, combining high-impact architectural photography, the brand tagline (*"Find a place to belong."*), a quick property search bar, a curated showcase of featured properties, an editorial brand philosophy section, service pillars, featured senior advisors, and a consultation call-to-action.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Renders a full-bleed or asymmetric editorial Hero section with architectural photography, Bahasa Indonesia headline copy, and the English tagline *"Find a place to belong."*
  - Includes an interactive Quick Search widget (keyword/location input, property type selector, status selector) that navigates to `/properti` with query parameters applied.
  - Displays a "Koleksi Properti Pilihan" (Featured Properties) grid showcasing 3 to 6 flagged properties (`isFeatured: true`) from the 12-property dataset.
  - Displays an editorial brand narrative section highlighting NARA ESTATE's curatorial standards and market metrics.
  - Displays a preview of senior property advisors with a link to `/agen` and a bottom conversion banner linking to `/kontak` or WhatsApp.
- **Business Rules:**
  - Only properties marked with `isFeatured: true` in the local dataset appear in the Featured Properties section.
  - Clicking any property card navigates directly to `/properti/[slug]`.
  - Submitting the Quick Search bar passes selected filter state via URL search params (e.g., `/properti?q=...&type=...&status=...`).
- **Acceptance Criteria:**
  - [ ] Hero section renders NARA ESTATE branding, tagline *"Find a place to belong."*, and architectural hero visual without layout shift.
  - [ ] Quick Search bar routes to `/properti` and applies the chosen search/filter criteria.
  - [ ] Featured properties section displays curated property cards with formatted IDR prices, location, LT/LB specs, and bedroom/bathroom counts.
  - [ ] All CTAs ("Lihat Semua Properti", "Temui Penasihat Kami", "Hubungi Kami") navigate to their respective valid routes.

---

### FR-002: Property Listing
- **Description:** The property catalog page (`/properti`) displays the complete portfolio of 12 fictional properties with summary metadata, active count indicator, and responsive card layout.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Loads all 12 fictional properties by default when no filters or search queries are active.
  - Displays each property using a standardized editorial card containing: primary thumbnail image, transaction badge (*Dijual* / *Disewa*), property type badge, title, city/neighborhood location, formatted price (`Rp`), bedroom count (`KT`), bathroom count (`KM`), land area (`LT m²`), and building area (`LB m²`).
  - Shows a live counter indicating the number of visible properties (e.g., *"Menampilkan 12 dari 12 properti"*).
- **Business Rules:**
  - Total initial inventory is strictly 12 fictional properties stored in local TypeScript data.
  - Rental properties (*Disewa*) must clearly append the rental period suffix (e.g., `/ tahun`).
  - Clicking anywhere on the property card primary link navigates to `/properti/[slug]`.
- **Acceptance Criteria:**
  - [ ] Default view at `/properti` renders all 12 properties accurately.
  - [ ] Each card displays image, title, location, price in IDR, status badge, type badge, LT, LB, KT, and KM.
  - [ ] Result counter dynamically reflects the count of currently displayed properties after search/filtering.

---

### FR-003: Property Search
- **Description:** Real-time or triggered keyword search allowing users to locate properties by title, neighborhood, city, or architectural keyword.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Provides a text input field on `/properti` (and initialized from the `/` quick search bar).
  - Performs case-insensitive substring matching across `title`, `location.area`, `location.city`, `location.province`, and `shortDescription` / `tags`.
  - Updates the displayed property grid immediately or upon submission without requiring a server database round-trip.
  - Provides a clear button (`×`) to reset the search keyword.
- **Business Rules:**
  - Search works in combination (logical `AND`) with active filters (`FR-004`) and preserves the selected sort order (`FR-005`).
  - Leading and trailing whitespace in the search input must be trimmed before evaluation.
- **Acceptance Criteria:**
  - [ ] Typing a city or area (e.g., `"Menteng"`, `"Bali"`, `"Kebayoran"`) filters the list to matching properties only.
  - [ ] Search is case-insensitive (`"villa"`, `"VILLA"`, `"Villa"` yield identical results).
  - [ ] Non-matching queries (e.g., `"xyz123notfound"`) render a user-friendly Empty State with a "Reset Pencarian" button.

---

### FR-004: Property Filtering
- **Description:** Multi-faceted filtering controls on `/properti` enabling buyers to narrow down properties by transaction status, property type, city/region, price range, and bedroom count.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Provides filter controls for:
    1. **Status Transaksi:** Semua, Dijual, Disewa.
    2. **Tipe Properti:** Semua, Rumah, Vila, Apartemen / Penthouse, Townhouse, Komersial.
    3. **Lokasi / Kota:** Semua, plus distinct cities from the 12-property inventory (e.g., Jakarta Selatan, Jakarta Pusat, Tangerang Selatan, Bandung, Bali, Surabaya).
    4. **Rentang Harga:** Semua, `< Rp 5 Miliar`, `Rp 5 Miliar – Rp 15 Miliar`, `> Rp 15 Miliar` (or custom min/max range presets).
    5. **Kamar Tidur Minimum:** Semua, `2+`, `3+`, `4+`, `5+`.
  - Displays active filter indicators/chips and a "Reset Filter" action when one or more filters are applied.
- **Business Rules:**
  - Multiple active filters combine using logical `AND` across categories.
  - Resetting filters restores all filter controls to their default `"Semua"` state and displays all 12 properties.
  - When zero properties satisfy the combined criteria, an editorial Empty State is displayed with a direct button to clear all filters.
- **Acceptance Criteria:**
  - [ ] Selecting each individual filter accurately narrows the displayed properties.
  - [ ] Combining multiple filters (e.g., Status = `Dijual` + Tipe = `Rumah` + Lokasi = `Jakarta Selatan`) returns only properties matching all criteria.
  - [ ] Empty state renders when no properties match and "Reset Filter" restores all 12 listings.

---

### FR-005: Property Sorting
- **Description:** Sorting selector on `/properti` allowing users to reorder the filtered property results.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Provides a dropdown/select control with the following sort options:
    1. **Unggulan (Default):** Featured properties first (`isFeatured`), followed by chronological/curated order.
    2. **Terbaru:** Sorted by `createdAt` / `yearBuilt` descending.
    3. **Harga: Rendah ke Tinggi:** Sorted by numeric `price` ascending.
    4. **Harga: Tinggi ke Rendah:** Sorted by numeric `price` descending.
    5. **Luas Tanah Terbesar:** Sorted by `specs.landArea` descending.
- **Business Rules:**
  - Sorting operates on the currently filtered/searched subset of properties without resetting active filters.
  - Price sorting compares raw numeric IDR values (`number`), not formatted strings.
- **Acceptance Criteria:**
  - [ ] Selecting "Harga: Rendah ke Tinggi" orders visible cards from lowest numeric IDR price to highest.
  - [ ] Selecting "Harga: Tinggi ke Rendah" orders visible cards from highest numeric IDR price to lowest.
  - [ ] Changing sort order preserves active search keywords and filters.

---

### FR-006: Property Detail
- **Description:** Comprehensive dedicated page (`/properti/[slug]`) presenting the architectural narrative, technical specifications, amenities, location overview, assigned advisor card, KPR calculator, and related properties for a single listing.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Resolves property data by `slug` from the 12-property dataset; renders a styled Bahasa Indonesia `404 Not Found` view if the slug does not exist.
  - Displays breadcrumb navigation (`Beranda > Properti > [Judul Properti]`).
  - Displays header metadata: Title, Property Code/ID, Status Badge (*Dijual* / *Disewa*), Property Type, Neighborhood & City, and formatted Price.
  - Renders key architectural highlights (`LT`, `LB`, `Kamar Tidur`, `Kamar Mandi`, `Garasi/Carport`, `Jumlah Lantai`, `Tahun Bangun`, `Sertifikat` such as SHM / HGB).
  - Displays multi-paragraph editorial description and categorized facility/amenity list.
  - Renders the assigned NARA ESTATE advisor profile card with direct WhatsApp (`FR-008`) and profile link (`FR-010`).
  - Embeds the interactive Mortgage Calculator (`FR-011`) pre-filled with the property's price (for *Dijual* properties).
  - Displays a "Properti Serupa" (Related Properties) section showing up to 3 other properties sharing the same city or property type (excluding the current property).
- **Business Rules:**
  - Related properties must never include the currently viewed property; if fewer than 3 exact type/city matches exist, fallback to other featured properties to display 3 recommendations.
  - Certificate type (`SHM`, `HGB`, `Strata Title`) must be explicitly visible in the specification table.
- **Acceptance Criteria:**
  - [ ] Navigating to `/properti/[slug]` for any of the 12 properties renders its complete data without error.
  - [ ] Invalid `/properti/non-existent-slug` displays a graceful 404 state with a link back to `/properti`.
  - [ ] Related properties section renders up to 3 distinct property cards.

---

### FR-007: Property Image Gallery
- **Description:** Interactive multi-image showcase within the Property Detail page (`/properti/[slug]`) enabling users to inspect exterior, interior, and architectural detail photographs.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Displays a large hero/primary image alongside a grid or strip of secondary thumbnails (minimum 4 images per property).
  - Clicking any thumbnail updates the active primary image or opens a full-screen lightbox/modal viewer.
  - Lightbox/gallery supports Next/Previous navigation buttons, image index indicator (e.g., `2 / 5`), keyboard `Escape` to close, and `ArrowLeft`/`ArrowRight` navigation.
- **Business Rules:**
  - Every image must include descriptive `alt` text in Bahasa Indonesia (`[Judul Properti] - Tampak ...`).
  - Graceful fallback handling if an image asset fails to load.
- **Acceptance Criteria:**
  - [ ] Gallery displays the primary architectural photo and all associated thumbnails for the property.
  - [ ] Users can switch between images and open/close the zoomed lightbox view via mouse click or keyboard controls.

---

### FR-008: WhatsApp Inquiry
- **Description:** Contextual lead-generation mechanism that opens WhatsApp (`https://wa.me/...`) with a pre-formatted Bahasa Indonesia inquiry message referencing the specific property or advisor.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Available on Property Detail pages (`/properti/[slug]`), Agent Profile pages (`/agen/[slug]`), and general contact touchpoints.
  - Constructs a deterministic WhatsApp deep link using the approved configuration requirements below.
  - Opens in a new browser tab (`target="_blank" rel="noopener noreferrer"`).
- **Approved WhatsApp Configuration Requirements:**
  - **Base URL Format:** `https://wa.me/<PHONE_NUMBER>?text=<URL_ENCODED_MESSAGE>`
  - **Phone Number Normalization:** Must use digits-only international E.164 format without `+`, spaces, or dashes (e.g., `6281234567890`). Any leading `0` (such as `0812...`) or `+62` is sanitized to `62...` via a centralized utility helper (`src/lib/whatsapp.ts`).
  - **Default Agency Fallback Number:** Configurable constant (e.g., `6281199887766`) when no specific agent phone is provided.
  - **Property Inquiry Message Template (Bahasa Indonesia):**
    > `Halo NARA ESTATE, saya tertarik untuk mendapatkan informasi lebih lanjut mengenai properti *[Property Title]* (Kode: [Property Code] | Harga: [Formatted Price]) di [Location]. Mohon informasi jadwal kunjungan privat yang tersedia. Terima kasih.`
  - **General / Advisor Inquiry Message Template (Bahasa Indonesia):**
    > `Halo [Agent Name] dari NARA ESTATE, saya ingin berkonsultasi mengenai koleksi properti premium yang tersedia saat ini. Terima kasih.`
- **Business Rules:**
  - Message parameters must be encoded using `encodeURIComponent()` so spaces, line breaks, and special characters (`*`, `|`, `:`) remain valid across Desktop and Mobile WhatsApp clients.
- **Acceptance Criteria:**
  - [ ] Clicking "Hubungi via WhatsApp" on a property detail page generates a valid `https://wa.me/62...` link containing the URL-encoded property title, code, price, and location.
  - [ ] Link opens safely in a new tab with `rel="noopener noreferrer"`.

---

### FR-009: Agent Directory
- **Description:** Dedicated page (`/agen`) presenting NARA ESTATE's team of senior property advisors (*Penasihat Properti Senior*).
- **Priority:** Medium-High (P1 — Core MVP)
- **Functional Behavior:**
  - Displays an editorial introduction to NARA ESTATE's advisory service standard.
  - Renders a responsive grid of advisor cards showing: portrait photograph, full name, title/role (e.g., *Senior Luxury Advisor*), specialization area (e.g., *Kebayoran Baru & Menteng*), years of experience, number of active listings, direct WhatsApp button, and link to full profile (`/agen/[slug]`).
- **Business Rules:**
  - Active listing count displayed on each advisor card is dynamically derived from or synchronized with the 12 properties assigned to that advisor's `agentId`.
- **Acceptance Criteria:**
  - [ ] `/agen` displays all fictional NARA ESTATE advisors with complete profile summary cards.
  - [ ] Clicking an advisor card navigates to `/agen/[slug]`.

---

### FR-010: Agent Profile
- **Description:** Individual advisor page (`/agen/[slug]`) detailing an advisor's background, market specialization, contact channels, and assigned property listings.
- **Priority:** Medium-High (P1 — Core MVP)
- **Functional Behavior:**
  - Resolves advisor by `slug`; displays 404 state if invalid.
  - Displays full advisor biography, credentials, languages spoken, focus areas, phone/WhatsApp trigger (`FR-008`), and email link.
  - Lists all properties from the 12-property catalog managed by this advisor (`property.agentId === agent.id`), rendered using the standard Property Card component.
- **Business Rules:**
  - Every advisor in the dataset is assigned at least 2 properties from the 12-property inventory so no advisor profile appears empty.
- **Acceptance Criteria:**
  - [ ] `/agen/[slug]` renders advisor details, bio, contact actions, and their assigned property listings.
  - [ ] Clicking any assigned property card navigates to `/properti/[slug]`.

---

### FR-011: Mortgage Calculator (Simulasi KPR)
- **Description:** Interactive client-side KPR (Kredit Pemilikan Rumah) calculator enabling prospective buyers to estimate monthly installments and financing breakdowns.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - Available both embedded on Property Detail pages (`/properti/[slug]`, initialized with the property's price) and as a standalone/accessible tool.
  - User-adjustable inputs:
    1. **Harga Properti (`Property Price`):** Numeric IDR input/slider (defaults to current property price).
    2. **Uang Muka / Down Payment (`DP`):** Adjustable by percentage (`10%` to `80%`, default `20%`) with synchronized IDR display.
    3. **Suku Bunga Tahunan (`Annual Interest Rate`):** Adjustable from `0%` to `15%` per annum (default `7.5%`, step `0.1%`).
    4. **Jangka Waktu / Tenor (`Loan Tenure`):** Adjustable from `5` to `30` years (default `15` years).
  - Real-time computed outputs:
    1. **Estimasi Cicilan per Bulan (`M`):** Primary highlighted metric in IDR.
    2. **Jumlah Uang Muka (`DP Amount`):** Formatted IDR.
    3. **Pokok Pinjaman (`Principal Loan P`):** Formatted IDR.
    4. **Total Estimasi Pembayaran (`Total Payment`):** `M × n` formatted IDR.
    5. **Total Estimasi Bunga (`Total Interest`):** `(M × n) - P` formatted IDR.
- **Approved Mortgage Calculation Formula:**
  - **Loan Principal ($P$):**
    $$P = \text{Harga Properti} - \text{Uang Muka (DP)}$$
  - **Monthly Interest Rate ($r$):**
    $$r = \frac{\text{Annual Interest Rate (\%)}}{100 \times 12}$$
  - **Total Number of Monthly Payments ($n$):**
    $$n = \text{Tenure (Years)} \times 12$$
  - **Standard Amortizing Monthly Installment ($M$) when $r > 0$:**
    $$M = P \cdot \frac{r(1 + r)^n}{(1 + r)^n - 1}$$
  - **Zero-Interest Edge Case ($M$) when $r = 0$:**
    $$M = \frac{P}{n}$$
- **Business Rules:**
  - Minimum Down Payment is enforced at `10%` and maximum at `80%` of property price (or bounded validation preventing negative principal $P \le 0$).
  - Tenure must be between `1` and `30` years (`5`–`30` years standard presets).
  - Output values are rounded to the nearest integer Rupiah (`Math.round(M)`) and formatted with Indonesian dot thousand separators (`Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })`).
  - Includes a transparent disclaimer in Bahasa Indonesia: *"Simulasi ini bersifat estimasi indikatif. Perhitungan akhir mengikuti kebijakan suku bunga dan biaya administrasi bank mitra."*
- **Acceptance Criteria:**
  - [ ] Calculator accurately computes monthly installments using $M = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$ (and $M = P/n$ when $r = 0$).
  - [ ] Changing DP %, interest rate, or tenure updates the monthly installment, principal, and total interest instantaneously without page reload.
  - [ ] Embedded calculator on `/properti/[slug]` initializes with that property's exact IDR price.

---

### FR-012: Contact Form
- **Description:** Client-side validated consultation and inquiry form located on `/kontak` (and optionally reusable on property/agent views).
- **Priority:** Medium-High (P1 — Core MVP)
- **Functional Behavior:**
  - Collects the following fields:
    1. **Nama Lengkap** (Required, min 2 characters)
    2. **Alamat Email** (Required, valid email format)
    3. **Nomor Telepon / WhatsApp** (Required, valid Indonesian/international phone digits, 9–15 digits)
    4. **Topik Konsultasi / Kategori** (Select: *Pembelian Properti*, *Sewa Properti*, *Titip Jual Properti*, *Konsultasi Investasi*, *Lainnya*)
    5. **Properti yang Diminati** (Optional selector populated with the 12 properties)
    6. **Pesan / Catatan Tambahan** (Required, min 10 characters)
  - Performs client-side validation with clear Bahasa Indonesia error messages per field.
  - Upon valid submission, transitions to a polished confirmation state (*"Permintaan Konsultasi Terkirim"*) displaying a summary of the inquiry and an option to immediately continue via WhatsApp (`FR-008`) or reset the form.
- **Business Rules:**
  - Because the MVP has no backend database or SMTP server, form submission is handled deterministically on the client side with simulated async confirmation (`300ms–600ms`) and clear showcase transparency.
- **Acceptance Criteria:**
  - [ ] Submitting an empty or invalid form prevents submission and displays field-specific validation messages in Bahasa Indonesia.
  - [ ] Submitting valid inputs displays the confirmation state and offers a follow-up WhatsApp deep link.

---

### FR-013: Dashboard Preview
- **Description:** Read-only executive and agency management dashboard showcase (`/dashboard`) demonstrating how NARA ESTATE monitors portfolio value, inventory distribution, and client leads.
- **Priority:** Medium (P1 — MVP Showcase Differentiator)
- **Functional Behavior:**
  - Displays a prominent **"Mode Pratinjau Eksekutif (MVP Showcase — Read Only)"** badge/banner.
  - Renders KPI summary cards derived from the 12-property dataset and mock inquiry metrics:
    1. Total Nilai Portofolio (*Total Portfolio Value* across For-Sale listings)
    2. Total Properti Aktif (`12 Properti`)
    3. Properti Unggulan (`Featured Count`)
    4. Permintaan Konsultasi Bulan Ini (*Mock Lead Count*)
  - Renders an interactive Property Inventory Table listing the 12 properties with status filter, quick search, price, advisor assignment, and view links (`/properti/[slug]`).
  - Renders a Mock Recent Inquiries (*Daftar Prospek Terbaru*) panel showing realistic sample buyer inquiries.
  - Action buttons that would require backend persistence (e.g., *"Tambah Properti Baru"*, *"Edit Properti"*, *"Ekspor Laporan CSV/PDF"*, *"Ubah Status"*) trigger the Unsupported Features handler (`FR-014`).
- **Business Rules:**
  - Dashboard requires no login wall so portfolio reviewers can inspect it directly via navigation.
  - No destructive mutations are persisted across refreshes.
- **Acceptance Criteria:**
  - [ ] `/dashboard` renders KPI cards, the 12-property inventory table, and recent inquiries preview cleanly on desktop and mobile.
  - [ ] Clicking non-MVP write actions ("Tambah Properti", "Edit", etc.) invokes the `FR-014` informational feedback modal/toast.

---

### FR-014: Unsupported Features
- **Description:** Standardized, transparent UX pattern for handling features that are intentionally outside the static MVP Showcase scope (such as user authentication, cloud saved favorites, database CRUD mutations, or live payment processing).
- **Priority:** Medium (P1 — Scope Governance)
- **Functional Behavior:**
  - When a user interacts with any showcase-only control (e.g., *"Tambah Properti Baru"* in Dashboard Preview, *"Simpan ke Akun"*, or *"Masuk Portal Klien"* if surfaced), the application displays an editorial modal, popover, or toast notification in Bahasa Indonesia.
  - The message clearly explains:
    - That **NARA ESTATE (BEDI REAL ESTATE)** is running in **MVP Showcase Mode** without a backend database or authentication server.
    - What the feature would do in a full production release.
    - A direct button to dismiss the notice or explore active MVP features (`/properti`, `/kontak`).
- **Business Rules:**
  - Must never result in unhandled exceptions, dead `#` links that jump the page to the top, or silent unresponsiveness.
- **Acceptance Criteria:**
  - [ ] Triggering any unsupported/demo action displays a clear, styled Bahasa Indonesia explanation modal/toast and can be dismissed via click or `Escape` key.
  - [ ] Zero dead links or console errors occur when interacting with showcase controls.

---

### FR-015: Responsive Navigation
- **Description:** Global navigation system comprising the sticky header, mobile slide-over/drawer navigation, active route highlighting, and editorial footer.
- **Priority:** High (P0 — Core MVP)
- **Functional Behavior:**
  - **Header Navigation:**
    - Displays the **NARA ESTATE** wordmark linking to `/`.
    - Primary navigation links:
      - `Beranda` (`/`)
      - `Koleksi Properti` (`/properti`)
      - `Penasihat` (`/agen`)
      - `Simulasi KPR` (`/simulasi-kpr` or anchor/dedicated tool route)
      - `Kontak` (`/kontak`)
      - `Dashboard` (`/dashboard` — styled with a subtle showcase badge/pill)
    - Primary CTA button (*"Jadwalkan Konsultasi"* / WhatsApp or `/kontak`).
  - **Mobile Navigation (`< 768px`):**
    - Accessible hamburger toggle button (`aria-expanded`, `aria-label`).
    - Smooth drawer/menu overlay with full navigation links, tagline, and direct WhatsApp CTA.
    - Automatically closes when a route link is selected or `Escape` is pressed.
  - **Footer:**
    - Displays NARA ESTATE brand identity, tagline (*"Find a place to belong."*), quick links, property categories, office address (fictional Jakarta flagship), copyright notice, and MVP Showcase attribution.
- **Business Rules:**
  - Current active route must be visually indicated in the navigation bar.
  - Header and mobile menu must be keyboard navigable.
- **Acceptance Criteria:**
  - [ ] Desktop header renders all primary navigation links and highlights the active route.
  - [ ] Mobile viewport (`375px` width) collapses links into a toggleable menu drawer that opens and closes reliably.
  - [ ] Footer renders consistently across all pages.

---

## 2. Application Architecture

- **Framework:** Next.js App Router (`src/app/`).
- **Rendering Strategy:**
  - **Server Components (Default):** Page layouts, static metadata generation, initial property catalog rendering, property detail shells, agent directory, and SEO structured content.
  - **Client Components (`'use client'`):** Interactive search/filter/sort bars, image gallery lightbox, KPR mortgage calculator, validated contact form, mobile navigation drawer, dashboard interactive table filters, and `FR-014` unsupported feature feedback triggers.
- **Strict Separation of Concerns:**
  - `src/types/`: Pure TypeScript interfaces and domain models.
  - `src/data/`: Static curated dataset (12 properties, agents, testimonials/metrics).
  - `src/lib/`: Pure business logic and formatting utilities (`mortgage.ts`, `whatsapp.ts`, `formatters.ts`, `property-filters.ts`).
  - `src/components/`: Reusable presentational and interactive UI components.

---

## 3. Data Requirements

### 3.1 Property Entity (`Property`)
The local dataset (`src/data/properties.ts`) must contain **exactly 12 fictional properties**, each conforming to the following core schema:
- `id`: Unique string identifier (e.g., `"prop-01"`).
- `code`: Human-readable reference code (e.g., `"NRE-JKT-001"`).
- `slug`: URL-safe unique slug (e.g., `"the-kayuputih-residence-menteng"`).
- `title`: Editorial property name.
- `tagline` / `shortDescription`: 1–2 sentence summary in Bahasa Indonesia.
- `description`: Detailed multi-paragraph architectural description in Bahasa Indonesia.
- `status`: `'dijual' | 'disewa'`.
- `type`: `'rumah' | 'vila' | 'apartemen' | 'townhouse' | 'komersial'`.
- `price`: Numeric value in IDR (e.g., `18500000000`).
- `pricePeriod` (optional): `'tahun' | 'bulan'` (for `'disewa'`).
- `location`:
  - `address`: Street/enclave descriptor.
  - `area`: Neighborhood/district (e.g., `"Menteng"`, `"Kebayoran Baru"`, `"Canggu"`).
  - `city`: City name (e.g., `"Jakarta Pusat"`, `"Jakarta Selatan"`, `"Badung, Bali"`).
  - `province`: Province name.
- `specs`:
  - `landArea`: Numeric `m²` (`LT`).
  - `buildingArea`: Numeric `m²` (`LB`).
  - `bedrooms`: Integer (`KT`).
  - `bathrooms`: Integer (`KM`).
  - `garages`: Integer.
  - `floors`: Integer.
  - `yearBuilt`: 4-digit year.
  - `certificate`: `'SHM' | 'HGB' | 'Strata Title'`.
- `facilities`: Array of Bahasa Indonesia feature strings (e.g., `["Kolam Renang Privat", "Taman Tropis", "Smart Home System"]`).
- `images`: Array of image objects (`url`, `alt`, `caption`, `isPrimary`).
- `agentId`: Foreign key reference to an `Agent` in `src/data/agents.ts`.
- `isFeatured`: Boolean flag.
- `createdAt`: ISO date string for sorting.

### 3.2 Agent Entity (`Agent`)
- `id`, `slug`, `name`, `role`, `specialization`, `bio`, `phone` (E.164 compatible), `email`, `photoUrl`, `experienceYears`, `languages`.

---

## 4. Route Specification

| Route Path | Page Name | Mapped Requirements | Rendering Mode |
| :--- | :--- | :--- | :--- |
| `/` | Homepage / Beranda | `FR-001`, `FR-015` | Static / Server + Client Islands |
| `/properti` | Property Catalog & Discovery | `FR-002`, `FR-003`, `FR-004`, `FR-005`, `FR-015` | Server Shell + Client Filter/Search |
| `/properti/[slug]` | Property Detail Page | `FR-006`, `FR-007`, `FR-008`, `FR-011`, `FR-015` | Static Params (`generateStaticParams`) + Client Islands |
| `/agen` | Agent Directory | `FR-009`, `FR-008`, `FR-015` | Static / Server Component |
| `/agen/[slug]` | Agent Profile Page | `FR-010`, `FR-008`, `FR-015` | Static Params (`generateStaticParams`) |
| `/kontak` | Contact & Consultation Page | `FR-012`, `FR-008`, `FR-015` | Server Shell + Client Form |
| `/dashboard` | Executive Dashboard Preview | `FR-013`, `FR-014`, `FR-015` | Server Shell + Client Dashboard Preview |
| `not-found.tsx` | Custom 404 Page | `FR-006`, `FR-010`, `FR-015` | Static Server Component |

*(Note: A dedicated `/simulasi-kpr` route or direct anchor/section integration may also expose `FR-011` globally in addition to its required integration on `/properti/[slug]`.)*

---

## 5. UI/UX Requirements

- **Brand Consistency:** All views strictly implement the **NARA ESTATE** *Editorial Architecture × Modern Luxury* system defined in `docs/DESIGN_SYSTEM.md`.
- **Responsive Breakpoints:**
  - Mobile: `320px – 639px` (single-column stacked cards, collapsible filter drawer/panel, mobile menu).
  - Tablet: `640px – 1023px` (2-column property grids, adaptive split sections).
  - Desktop: `1024px+` (max-width `1280px`–`1440px` centered containers, asymmetric editorial layouts, 3-column catalog grids).
- **Empty, Loading & Feedback States:**
  - Zero-match search/filter states must provide clear recovery actions (*"Reset Semua Filter"*).
  - Form inputs must show clear focus rings (`Bronze #B39A78` or `Ink #252722`) and accessible validation feedback.

---

## 6. Performance Requirements

- **Zero External API Bottlenecks:** All property queries, filtering, sorting, and KPR calculations execute in-memory in `< 16ms` (single frame) for instantaneous UI responsiveness.
- **Static Pre-rendering:** Dynamic routes (`/properti/[slug]` and `/agen/[slug]`) utilize Next.js `generateStaticParams` for instant static delivery on Vercel.
- **Image Optimization:** Proper width/height attributes, aspect-ratio containers to prevent Cumulative Layout Shift (`CLS < 0.1`), and lazy loading for below-the-fold catalog cards.
- **Font Loading:** Google Fonts (`Cormorant Garamond` and `DM Sans`) loaded via `next/font/google` with `display: 'swap'` to eliminate flash of unstyled text.

---

## 7. Security Constraints

- **No Secrets Exposure:** No private API keys, database credentials, or sensitive tokens stored in the repository.
- **Safe External Navigation:** All external links (specifically `https://wa.me/...`) enforce `target="_blank"` and `rel="noopener noreferrer"`.
- **Input Sanitization & Encoding:** Search queries, URL parameters, and WhatsApp message payloads are safely encoded (`encodeURIComponent`) and rendered via React's default XSS-safe JSX escaping (no `dangerouslySetInnerHTML` with untrusted input).

---

## 8. QA Requirements

- **Type Checking:** `tsc --noEmit` must pass with 0 errors.
- **Linting & Build:** `next lint` and `next build` must complete cleanly.
- **Playwright E2E Verification (`M08`):**
  - Automated tests stored in `tests/e2e/` covering:
    1. Homepage rendering & navigation (`FR-001`, `FR-015`).
    2. Property listing count (12 properties), keyword search, category/price filtering, sorting, and empty-state reset (`FR-002`–`FR-005`).
    3. Property detail navigation, gallery interaction, and WhatsApp link generation (`FR-006`–`FR-008`).
    4. Mortgage calculator formula accuracy and interactive updates (`FR-011`).
    5. Agent directory & profile rendering (`FR-009`, `FR-010`).
    6. Contact form validation and submission state (`FR-012`).
    7. Dashboard preview rendering and `FR-014` unsupported feature notice (`FR-013`, `FR-014`).
    8. Mobile responsive navigation drawer (`FR-015`).

---

## 9. Milestone Traceability Matrix

| Requirement ID | Requirement Name | Target Implementation Milestone | Verification Milestone |
| :--- | :--- | :--- | :--- |
| **FR-001** | Homepage | M03 (`M03_HOMEPAGE`) | M03, M08 |
| **FR-002** | Property Listing | M04 (`M04_PROPERTY_DISCOVERY`) | M04, M08 |
| **FR-003** | Property Search | M04 (`M04_PROPERTY_DISCOVERY`) | M04, M08 |
| **FR-004** | Property Filtering | M04 (`M04_PROPERTY_DISCOVERY`) | M04, M08 |
| **FR-005** | Property Sorting | M04 (`M04_PROPERTY_DISCOVERY`) | M04, M08 |
| **FR-006** | Property Detail | M05 (`M05_PROPERTY_DETAIL`) | M05, M08 |
| **FR-007** | Property Image Gallery | M05 (`M05_PROPERTY_DETAIL`) | M05, M08 |
| **FR-008** | WhatsApp Inquiry | M05 (`M05_PROPERTY_DETAIL`) & M06 | M05, M06, M08 |
| **FR-009** | Agent Directory | M06 (`M06_SUPPORTING_FEATURES`) | M06, M08 |
| **FR-010** | Agent Profile | M06 (`M06_SUPPORTING_FEATURES`) | M06, M08 |
| **FR-011** | Mortgage Calculator | M06 (`M06_SUPPORTING_FEATURES`) | M06, M08 |
| **FR-012** | Contact Form | M06 (`M06_SUPPORTING_FEATURES`) | M06, M08 |
| **FR-013** | Dashboard Preview | M07 (`M07_DASHBOARD_PREVIEW`) | M07, M08 |
| **FR-014** | Unsupported Features | M07 (`M07_DASHBOARD_PREVIEW`) | M07, M08 |
| **FR-015** | Responsive Navigation | M02 (Shell) & M03 (Full Polish) | M03, M08 |

---

## 10. Definition of Done (DoD)

A functional requirement or milestone is considered **Done** only when:
1. All specified UI states (default, hover/focus, empty, error/validation) are implemented in alignment with `docs/DESIGN_SYSTEM.md`.
2. All copy is written in natural, refined Bahasa Indonesia (preserving approved brand English terms).
3. All business rules and formulas (specifically KPR calculation `FR-011` and WhatsApp deep-link formatting `FR-008`) match this specification.
4. TypeScript compiles with zero errors and no `any` type escapes.
5. Layout is responsive across Mobile (`375px`), Tablet (`768px`), and Desktop (`1440px`).
6. No features from subsequent milestones have been prematurely introduced.

---

## 11. Scope Change Control

- Any proposed addition, removal, or alteration to `FR-001` through `FR-015`, data schemas, formulas, or route paths must be documented via a revision to this FSD and approved by the Project Owner prior to code execution.
- Unrequested features, third-party state libraries, database adapters, or authentication layers are strictly prohibited.

