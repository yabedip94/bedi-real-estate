# Milestone M07 — Dashboard Preview & Unsupported Features Handling

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Planned  
**Mapped Requirements:** `FR-013` (Dashboard Preview), `FR-014` (Unsupported Features)  

---

## 1. Objective

Implement the read-only **Executive Dashboard Preview** (`/dashboard`, `FR-013`) and the standardized **Unsupported Features** feedback mechanism (`FR-014`), demonstrating enterprise product completeness while transparently communicating the zero-database MVP Showcase boundaries.

---

## 2. Scope

- **Executive Dashboard Preview (`FR-013`):**
  - Dedicated route `/dashboard` accessible directly from the navigation bar without an authentication barrier.
  - Prominent editorial banner/badge indicating **"Mode Pratinjau Eksekutif — MVP Showcase (Read-Only)"**.
  - **KPI Summary Cards:**
    1. Total Nilai Portofolio (*Total Portfolio Value* calculated from the For-Sale properties).
    2. Properti Aktif (`12 Properti`).
    3. Koleksi Unggulan (count of `isFeatured` listings).
    4. Prospek & Permintaan Konsultasi (mock monthly inquiry metrics).
  - **Interactive Portfolio Inventory Table:**
    - Displays all 12 properties with reference code, title, location, status badge (*Dijual* / *Disewa*), formatted price, assigned advisor, and quick filter/search controls.
    - Direct *"Lihat"* action linking to `/properti/[slug]`.
  - **Mock Recent Inquiries Panel (*Permintaan Konsultasi Terbaru*):**
    - Displays realistic sample buyer leads (name, property of interest, inquiry channel, timestamp, status badge).
- **Unsupported Features Handling (`FR-014`):**
  - Reusable `UnsupportedFeatureModal` (or toast/dialog system in `src/components/ui/UnsupportedFeatureModal.tsx`).
  - Triggered whenever a user clicks non-MVP administrative or account actions (e.g., *"Tambah Properti Baru"*, *"Edit Data Properti"*, *"Hapus"*, *"Ekspor Laporan PDF/CSV"*, *"Simpan ke Favorit Cloud"*).
  - Explains in refined Bahasa Indonesia that **NARA ESTATE** is an architectural MVP Showcase running without a backend database, and provides quick links to active MVP features.

---

## 3. Expected Deliverables

1. `src/components/ui/UnsupportedFeatureModal.tsx` — Accessible Bahasa Indonesia modal/notice for `FR-014`.
2. `src/data/dashboard.ts` (or dashboard helpers in `src/data/`) — Mock inquiry records and portfolio KPI aggregations.
3. `src/app/dashboard/page.tsx` (and modular dashboard components) — Executive Dashboard Preview (`FR-013`).

---

## 4. Dependencies

- Completion and approval of **M02** through **M06**.

---

## 5. Acceptance Criteria

- [ ] `/dashboard` renders KPI summary cards, the 12-property inventory table, and recent mock inquiries cleanly on both desktop and mobile (`FR-013`).
- [ ] Users can filter the dashboard inventory table by status or keyword and click through to any `/properti/[slug]` page.
- [ ] Clicking any administrative write/export action (*"Tambah Properti"*, *"Edit"*, *"Ekspor Laporan"*) opens the `FR-014` informational modal in Bahasa Indonesia without console errors or dead links.
- [ ] Modal can be dismissed via close button, backdrop click, or `Escape` key.

---

## 6. Explicit Out-of-Scope Items

- Real authentication/login screens or role-based access restriction.
- Persistent database CRUD operations (creating, updating, or deleting properties on disk or server).
- Complex charting libraries requiring heavy third-party bundles (clean CSS/SVG editorial visualizations only if used).

---

## 7. Verification Checklist

- [ ] Verify `/dashboard` loads and displays accurate counts and total valuation from the 12-property dataset.
- [ ] Verify all demo action buttons trigger `FR-014` cleanly and can be dismissed via mouse and keyboard.
- [ ] Run `npx tsc --noEmit` and `npm run build`.

