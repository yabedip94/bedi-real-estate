# Milestone M04 — Property Discovery (Catalog, Search, Filter & Sort)

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Planned  
**Mapped Requirements:** `FR-002` (Property Listing), `FR-003` (Property Search), `FR-004` (Property Filtering), `FR-005` (Property Sorting)  

---

## 1. Objective

Implement the complete Property Discovery experience at `/properti`, allowing users to browse all 12 fictional properties, search by keyword, filter across multiple architectural and financial criteria, sort results dynamically, and recover effortlessly from zero-match empty states.

---

## 2. Scope

- **Property Listing Catalog (`FR-002`):**
  - Editorial page header for `/properti` (*Koleksi Properti Terkurasi*).
  - Responsive grid displaying all 12 fictional properties by default using `PropertyCard`.
  - Dynamic result counter (*"Menampilkan X dari 12 properti"*).
- **Property Search (`FR-003`):**
  - Case-insensitive keyword search input matching property title, neighborhood/area, city, province, and tags/description.
  - Seamless synchronization with query parameters passed from the Homepage Quick Search bar (`?q=...`).
- **Property Filtering (`FR-004`):**
  - Filter controls for:
    1. Transaction Status (*Semua*, *Dijual*, *Disewa*).
    2. Property Type (*Semua*, *Rumah*, *Vila*, *Apartemen*, *Townhouse*, *Komersial*).
    3. City / Location (*Semua* + distinct cities in the dataset).
    4. Price Range presets (*Semua*, `< Rp 5 Miliar`, `Rp 5 – 15 Miliar`, `> Rp 15 Miliar`).
    5. Minimum Bedrooms (*Semua*, `2+`, `3+`, `4+`, `5+`).
  - Active filter pills/chips and a one-click *"Reset Filter"* button.
- **Property Sorting (`FR-005`):**
  - Sort selector supporting: *Unggulan* (Default), *Terbaru*, *Harga: Rendah ke Tinggi*, *Harga: Tinggi ke Rendah*, and *Luas Tanah Terbesar*.
- **Empty State Handling:**
  - Refined Bahasa Indonesia empty state when no properties match the combined search/filter criteria, with a prominent button to reset all filters.

---

## 3. Expected Deliverables

1. `src/lib/property-filters.ts` — Pure filtering, searching, and sorting functions.
2. `src/components/properties/PropertyFilterBar.tsx` — Multi-criteria filter and keyword search controls (responsive desktop bar + mobile collapsible panel).
3. `src/components/properties/PropertySortSelect.tsx` — Sort dropdown control (`FR-005`).
4. `src/components/properties/PropertyGrid.tsx` — Responsive catalog grid with result counter (`FR-002`).
5. `src/components/properties/PropertyEmptyState.tsx` — Zero-result recovery view.
6. `src/app/properti/page.tsx` — Complete Property Discovery route page.

---

## 4. Dependencies

- Completion and approval of **M02** (12-property dataset) and **M03** (`PropertyCard`, layout shell, and Homepage Quick Search handoff).

---

## 5. Acceptance Criteria

- [ ] Navigating to `/properti` with no active filters displays all 12 fictional properties (`FR-002`).
- [ ] Keyword search (`FR-003`) accurately filters properties case-insensitively by title, neighborhood, or city.
- [ ] Multi-criteria filtering (`FR-004`) combines Status, Type, Location, Price Range, and Minimum Bedrooms using logical `AND`.
- [ ] Sorting (`FR-005`) accurately reorders visible properties by Featured, Newest, Price Ascending, Price Descending, and Land Area without losing active filters.
- [ ] Query parameters from the Homepage Quick Search bar (`?q=&type=&status=`) automatically initialize the filter state on `/properti`.
- [ ] Unmatched filter combinations render `PropertyEmptyState` and clicking *"Reset Filter"* restores all 12 listings.

---

## 6. Explicit Out-of-Scope Items

- Property Detail page (`/properti/[slug]`), interactive image gallery, and embedded KPR calculator (`M05`).
- Agent Directory (`/agen`), Agent Profile (`/agen/[slug]`), and Contact Form (`/kontak`) (`M06`).
- Dashboard Preview (`/dashboard`) (`M07`).
- Server-side database queries or pagination beyond the 12-property MVP inventory.

---

## 7. Verification Checklist

- [ ] Verify default `/properti` view renders 12 property cards.
- [ ] Test each filter category individually and in combination.
- [ ] Test price sorting (Low-to-High and High-to-Low) against numeric IDR prices.
- [ ] Test empty state rendering and reset action.
- [ ] Run `npx tsc --noEmit` and `npm run build`.

