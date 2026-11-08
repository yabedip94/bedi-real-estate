# Milestone M05 — Property Detail, Image Gallery & WhatsApp Inquiry

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE (*"Find a place to belong."*)  
**Milestone Status:** Planned  
**Mapped Requirements:** `FR-006` (Property Detail), `FR-007` (Property Image Gallery), `FR-008` (WhatsApp Inquiry)  

---

## 1. Objective

Implement the dynamic Property Detail page (`/properti/[slug]`) featuring comprehensive architectural storytelling, structured technical specifications, an interactive multi-image gallery with lightbox viewer (`FR-007`), contextual WhatsApp lead inquiry generation (`FR-008`), assigned advisor summary card, and related property recommendations (`FR-006`).

---

## 2. Scope

- **Dynamic Property Detail Route (`FR-006`):**
  - Static route generation (`generateStaticParams`) and dynamic SEO metadata (`generateMetadata`) for all 12 property slugs.
  - Custom Bahasa Indonesia 404 Not Found handling when an invalid slug is requested.
  - Breadcrumb navigation (`Beranda > Koleksi Properti > [Judul Properti]`).
  - Editorial header displaying title, property reference code, status badge (*Dijual* / *Disewa*), property type, neighborhood/city, and formatted IDR price.
  - Architectural overview grid and detailed specification table (`Luas Tanah`, `Luas Bangunan`, `Kamar Tidur`, `Kamar Mandi`, `Garasi/Carport`, `Jumlah Lantai`, `Tahun Bangun`, `Sertifikat` SHM/HGB/Strata Title).
  - Multi-paragraph editorial description and categorized facilities/amenities list.
  - Assigned NARA ESTATE advisor card with portrait, role, link to `/agen/[slug]`, and direct WhatsApp inquiry button.
  - **Related Properties (*Properti Serupa*):** Displays up to 3 curated properties matching city or type (excluding the current property).
- **Property Image Gallery (`FR-007`):**
  - Editorial mosaic or primary + thumbnail strip showing at least 4 architectural photos per property.
  - Interactive image switching and full-screen modal/lightbox viewer with Next/Previous controls, image counter (`1 / N`), and keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
- **WhatsApp Inquiry Integration (`FR-008`):**
  - Centralized `https://wa.me/<phone>?text=<encoded_message>` link generator in `src/lib/whatsapp.ts` using sanitized E.164 phone numbers (`62...`) and pre-filled Bahasa Indonesia message containing Property Title, Reference Code, Formatted Price, and Location.

---

## 3. Expected Deliverables

1. `src/components/properties/PropertyGallery.tsx` — Interactive multi-image gallery and lightbox modal (`FR-007`).
2. `src/components/properties/PropertySpecsTable.tsx` — Architectural specifications and facilities presentation (`FR-006`).
3. `src/components/properties/RelatedProperties.tsx` — Related property recommendations (`FR-006`).
4. `src/components/agents/AgentContactCard.tsx` — Contextual advisor card with WhatsApp CTA (`FR-008`).
5. `src/app/properti/[slug]/page.tsx` and `src/app/not-found.tsx` — Dynamic property detail page and custom 404 view.

---

## 4. Dependencies

- Completion and approval of **M02**, **M03**, and **M04**.

---

## 5. Acceptance Criteria

- [ ] Visiting `/properti/[slug]` for each of the 12 properties renders its complete title, price, specs, description, facilities, and assigned advisor without error (`FR-006`).
- [ ] Visiting an unknown `/properti/invalid-slug` renders a styled Bahasa Indonesia 404 Not Found view with a return link to `/properti`.
- [ ] Image gallery (`FR-007`) allows selecting thumbnails and opening/navigating/closing the full-screen lightbox via click and keyboard keys.
- [ ] Clicking "Hubungi via WhatsApp" (`FR-008`) opens a valid `https://wa.me/62...` URL in a new tab (`target="_blank" rel="noopener noreferrer"`) with a URL-encoded Bahasa Indonesia message containing the property's exact title, code, price, and location.
- [ ] Related Properties section renders up to 3 other valid properties and never includes the active property itself.

---

## 6. Explicit Out-of-Scope Items

- Standalone Agent Directory (`/agen`) and full Agent Profile page (`/agen/[slug]`) (`M06`).
- Interactive Mortgage Calculator component (`FR-011`) and Contact Form (`/kontak`) (`M06` — *note: the KPR calculator slot on `/properti/[slug]` is wired upon completion of `M06`*).
- Dashboard Preview (`/dashboard`) (`M07`).

---

## 7. Verification Checklist

- [ ] Test all 12 `/properti/[slug]` routes via static build (`npm run build`).
- [ ] Verify gallery thumbnail selection, lightbox open/close, and keyboard `Escape` handling.
- [ ] Inspect generated `wa.me` href attributes to verify E.164 phone formatting and `encodeURIComponent` payload accuracy.
- [ ] Verify Related Properties excludes the current property slug.

