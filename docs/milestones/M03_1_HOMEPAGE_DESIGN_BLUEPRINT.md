# Milestone M03.1 — Homepage Design Blueprint & Section Architecture

**Project:** BEDI REAL ESTATE  
**Brand:** NARA ESTATE  
**Tagline:** *Find a place to belong.*  
**Positioning:** Premium Property Discovery & Marketing Platform (MVP Demonstration Showcase)  
**Creative Direction:** Editorial Architecture × Modern Luxury  
**Language:** Bahasa Indonesia (with approved brand terms & tagline)  
**Document Version:** 1.1 (Revised Blueprint — M03.1)  
**Authoritative References:** [`docs/PRD.md`](../PRD.md), [`docs/FSD.md`](../FSD.md), [`docs/DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md), [`docs/ARCHITECTURE.md`](../ARCHITECTURE.md), [`docs/milestones/M03_HOMEPAGE.md`](./M03_HOMEPAGE.md)

---

## 1. Design Vision & Brand Experience

### 1.1 The Essence of NARA ESTATE
**NARA ESTATE** is an architectural-grade digital monograph designed to showcase a curated portfolio of fictional luxury properties. Conceived as an **MVP Showcase**, it avoids the visual and transactional cliches of mass-market property classifieds (loud urgency badges, dense commercial grids, flashing discount banners) in favor of **architectural calm, spatial honesty, and editorial prestige**:
- **Tactile Mineral Tone:** Built on natural mineral stone surfaces (`Limestone #F4F0E8` and `Sand #E4DED2`) that evoke limestone facades, natural travertine, and fine uncoated paper.
- **Deep Contrast Typography:** Crisp, ink-pressed typography (`Ink #252722`) that communicates literary permanence and discernment.
- **Warm Bronze Accents:** Muted metallic warmth (`Bronze #B39A78`) reserved for active states, fine architectural hairlines, and moments of quiet visual interest.
- **Editorial Whitespace:** Generous vertical rhythm and deliberate pauses that allow architectural photography to lead the experience.

### 1.2 Showcase Nature & Emotional Impact
As a portfolio demonstration showcase, the interface communicates quality through design craftsmanship rather than fabricated transaction statistics:
1. **Calm Arrival (The Sanctuary):** An immediate release from digital marketplace clutter into an expansive, ordered architectural landscape.
2. **Curatorial Resonance (The Discovery):** Recognition that presented residences celebrate spatial harmony, honest materiality, and architectural intent.
3. **Frictionless Exploration (The Pathway):** Clear, transparent pathways to explore properties and initiate contact via configured demonstration channels.

---

## 2. Target Audience & Homepage User Journeys

### 2.1 Audience Segments
1. **Affluent Discerning Homebuyers (Primary Target Persona):** Individuals seeking residences with strong architectural character, privacy, natural light, and refined material craftsmanship.
2. **Lifestyle & Design Enthusiasts (Primary Target Persona):** Connoisseurs exploring iconic Indonesian enclaves (Menteng, Kebayoran Baru, Dago Pakar, Uluwatu, Canggu).
3. **Technical Stakeholders, Recruiters & Design Evaluators (Showcase Audience):** Engineers and product leaders evaluating frontend architecture, semantic accessibility, responsive fluidity, and design system fidelity.

### 2.2 Core Homepage User Journeys

```text
[ Journey 1: Visual Discovery ]
Hero ("Find Your Place") 
  └──> Quick Search Visual Dock (Preview) 
        └──> Navigation to Catalog (/properties)

[ Journey 2: Curated Exploration ]
Hero 
  └──> Brand Manifesto ("More Than a Property")
        └──> Curated Properties ("Selected for Living")
              └──> Property Card Click ──> Property Detail (/properties/[slug])

[ Journey 3: Enclave-Focused Discovery ]
Hero 
  └──> Featured Locations ("Places with Character" - 4-Card Asymmetric Mosaic) 
        └──> Enclave Selection ──> Filtered Catalog (/properties?city=...)

[ Journey 4: Private Consultation Pathway ]
Hero 
  └──> The NARA Approach (Four Editorial Principles) 
        └──> Closing CTA ("Begin Your Next Chapter") 
              └──> Contact Page (/contact) or Demo WhatsApp Link
```

---

## 3. Creative Direction: Editorial Architecture × Modern Luxury

### 3.1 Divergence from Generic Marketplaces
| Design Dimension | Generic Marketplace (Market Standard) | NARA ESTATE (Editorial Architecture) |
| :--- | :--- | :--- |
| **Grid System** | Rigid 3 or 4-column cards repeating indefinitely | Asymmetric editorial rhythm, 12-column modular canvas, 5/7 and 4/8 column pairings |
| **Color Temperature** | Stark cold white (`#FFFFFF`) or corporate blue (`#0066FF`) | Warm mineral `Limestone` (`#F4F0E8`), natural `Sand` (`#E4DED2`), and deep `Ink` (`#252722`) |
| **Imagery** | Staged, wide-angle distorted fish-eye photos with badges | Curated architectural photography with natural light, structural depth, and honest texture |
| **Typography** | Generic system sans-serif (Inter / Roboto) across all levels | High-contrast pairing: `Cormorant Garamond` (display) × `DM Sans` (precision body & numerals) |
| **Badges & CTAs** | Multi-colored urgent stickers ("BU", "Hot Deal", "Diskon 10%") | Restrained, hairline-bordered stone pills in `Sage` and `Bronze` |
| **Pacing** | Cluttered, dense, infinite scrolling widgets | Measured, chapter-like progression with generous section breathing room |

---

## 4. Homepage Section Architecture (Nine Sections)

The homepage consists of **nine cohesive, rhythmically paced sections**:

```text
┌─────────────────────────────────────────────────────────────┐
│ 01. NAVIGATION — Quiet Luxury (Sticky Header & Drawer)       │
├─────────────────────────────────────────────────────────────┤
│ 02. HERO — Find Your Place (Visual Monograph & Search Dock) │
├─────────────────────────────────────────────────────────────┤
│ 03. BRAND MANIFESTO — More Than a Property (Editorial Note) │
├─────────────────────────────────────────────────────────────┤
│ 04. CURATED PROPERTIES — Selected for Living (Featured Grid)│
├─────────────────────────────────────────────────────────────┤
│ 05. FEATURED LOCATIONS — Places with Character (Mosaic)     │
├─────────────────────────────────────────────────────────────┤
│ 06. ARCHITECTURE & LIVING — A Different Perspective (Essay) │
├─────────────────────────────────────────────────────────────┤
│ 07. THE NARA APPROACH — Curated with Intention (Principles) │
├─────────────────────────────────────────────────────────────┤
│ 08. CLOSING CTA — Begin Your Next Chapter (Contact Bridge)  │
├─────────────────────────────────────────────────────────────┤
│ 09. FOOTER — Brand Signature (Monograph Colophon)           │
└─────────────────────────────────────────────────────────────┘
```

---

### Section 01: Navigation — Quiet Luxury

- **Purpose:** Provide an effortless, non-intrusive global orientation that anchors the brand identity, facilitates immediate navigation across core routes, and offers a discreet consultation entry point.
- **User Intent:** Quick access to properties, advisors, contact, or dashboard without obscuring the hero visuals.
- **Content Hierarchy:**
  1. Primary Brand Wordmark: **NARA ESTATE** (Cormorant Garamond, uppercase tracking).
  2. Editorial Navigation Links: `Koleksi Properti` (`/properties`), `Penasihat` (`/agents`), `Kontak` (`/contact`).
  3. Utility Tag: `Dashboard Preview` (`/dashboard` with subtle demonstration pill indicator).
  4. Primary Action: `Hubungi Kami` (Ink button linking cleanly to `/contact`).
  5. Mobile Trigger: Minimalist 2-line architectural hamburger toggle.
- **Desktop Composition:**
  - Sticky glassmorphic bar on top (`backdrop-blur-md bg-limestone/90 border-b border-sand-dark/40`).
  - Height: `80px` (`h-20`), max-width `1360px` centered container.
  - Three-zone distribution: Left brand wordmark, center navigation links with subtle underline hover states, right action button with `Bronze` hairline border.
- **Mobile Composition (`< 768px`):**
  - Height: `64px` (`h-16`).
  - Wordmark left-aligned; accessible hamburger right-aligned.
  - Sliding drawer transitions from top/right over `300ms ease-out`, displaying oversized serif links, tagline *"Find a place to belong."*, and direct link to `/contact`.
- **Visual Treatment:**
  - Hairline lower border (`border-sand-dark/30`).
  - Active route state marked with a discreet `2px` bronze dot beneath the label.
- **CTA & Interaction:**
  - Clicking `Hubungi Kami` routes to `/contact`.
  - Transparent scroll state that solidifies slightly upon scrolling past 40px.
- **Scope & Boundaries:** Global layout shell (`FR-015`). No dropdown megamenus or promotional banner inserts.

---

### Section 02: Hero — Find Your Place

- **Purpose:** Create an immediate cinematic first impression that communicates the luxury architectural ethos and provides an intuitive discovery preview dock.
- **User Intent:** Absorb the brand's aesthetic quality and immediately initiate property discovery.
- **Content Hierarchy:**
  1. Overline / Eyebrow: `NARA ESTATE — KURASI RESIDENSIAL PREMIUM` (DM Sans, `text-xs`, uppercase, tracking `+0.16em`, `text-sage`).
  2. Headline: *"Menemukan Ruang untuk Berpulang."* (Cormorant Garamond, `text-4xl` to `text-6xl`, light italic touch).
  3. English Brand Anchor: *"Find a place to belong."* (Cormorant Garamond Italic, `text-lg`, `text-bronze`).
  4. Editorial Narrative Snippet: 1–2 sentences in Bahasa Indonesia articulating that every residence is selected for its architectural dialogue, material honesty, and enduring spatial value.
  5. Quick Search Visual Dock (Preview): Interactive visual selector showcasing Discovery options (Kata Kunci/Lokasi, Tipe Properti, Status Transaksi) with an explicit action directing users to `/properties`.
  6. Hero Architectural Imagery: Asymmetric framing showcasing an iconic Indonesian architectural residence.
- **Desktop Composition:**
  - Asymmetric 12-column layout:
    - Left column (5 cols): Typography stack, narrative snippet, and anchored Quick Search visual dock.
    - Right column (7 cols): Full-height portrait-to-landscape architectural photo container (`aspect-[4/5]` or `aspect-[16/10]`) with subtle rounded-sm corners (`rounded-sm`), framed against a soft `Sand` backing.
- **Mobile Composition:**
  - Stacked vertical flow:
    - Overline, headline, and brand tagline left-aligned.
    - Full-width architectural hero image (`aspect-[4/3]`).
    - Quick Search visual dock positioned cleanly beneath the image, offering a direct tap action to browse all properties at `/properties`.
- **Visual Treatment:**
  - Background: Pure `Limestone` (`#F4F0E8`).
  - Subtle architectural photography hover effect: slow zoom `scale-[1.02]` over `700ms ease-out`.
  - Search dock surface: Elevated `White` (`#FFFFFF`) with `1px border-sand-dark` and soft ambient shadow (`shadow-sm`).
- **CTA & Interaction:**
  - In M03, the Quick Search dock serves as a visual discovery gateway that directs users to `/properties` (full multi-criteria client-side search and filtering logic is strictly implemented in M04).
- **Scope & Boundaries:** Homepage gateway (`FR-001`). Actual filtering execution belongs to M04.

---

### Section 03: Brand Manifesto — More Than a Property

- **Purpose:** Establish the curatorial philosophy of NARA ESTATE as an architectural showcase celebrating design, spatial integrity, and material honesty.
- **User Intent:** Understand the aesthetic vision, design standards, and curatorial principles behind the platform.
- **Content Hierarchy:**
  1. Section Eyebrow: `FILOSOFI KURASI` (DM Sans, uppercase, `text-sage`).
  2. Manifesto Statement: Typographic pull-quote in Cormorant Garamond:
     > *"Kami memandang hunian bukan sekadar komoditas fisik, melainkan ruang hidup tempat arsitektur, lanskap alam, dan ritme keseharian berpadu dalam harmoni."*
  3. Supporting Editorial Column: Two refined paragraphs articulating NARA ESTATE’s architectural appreciation: prioritizing spatial flow, natural light, material authenticity, and timeless proportion.
  4. Curatorial Editorial Statements (Replacing Fabricated Business Metrics):
     - *Integritas Arsitektur:* Kurasi hunian dengan karakter spasial yang kuat dan kejujuran material.
     - *Konteks & Lanskap:* Harmoni antara struktur bangunan dan lingkungan sekitarnya.
     - *Transparansi Spasial:* Penyajian visual dan spesifikasi teknis yang jujur dan menyeluruh.
     - *Perspektif Berkelanjutan:* Apresiasi terhadap desain yang menua dengan anggun melintasi waktu.
- **Desktop Composition:**
  - Split 6/6 editorial spread reminiscent of an architectural monograph:
    - Left 6 cols: Display quote with bronze quote accent and curatorial statement.
    - Right 6 cols: Two editorial paragraphs paired with a 2x2 grid of the four curatorial statements with subtle divider borders.
- **Mobile Composition:**
  - Sequential stacking: Eyebrow -> Display quote -> Narrative paragraphs -> 4 curatorial statements stacked with clean divider lines.
- **Visual Treatment:**
  - Background: Soft tinted `Sand` (`#E4DED2`).
  - Hairline dividers in `border-sage/20`.
- **CTA & Interaction:**
  - Subtle text link with arrow: *"Jelajahi Koleksi Residensial →"* linking to `/properties`.
- **Scope & Boundaries:** Pure brand storytelling (`FR-001`). Zero fabricated transaction metrics or business volume claims.

---

### Section 04: Curated Properties — Selected for Living

- **Purpose:** Present the tangible property showcase on the homepage, displaying residences flagged with `isFeatured: true`.
- **User Intent:** Browse premier listings, assess pricing and architectural specs at a glance, and transition to detailed inspection.
- **Content Hierarchy:**
  1. Header Group:
     - Eyebrow: `KOLEKSI PILIHAN`
     - Title: *"Koleksi Residensial Pilihan"* (Cormorant Garamond H2)
     - Subtitle: *"Pilihan hunian dengan keunggulan arsitektural dan lokasi terkurasi."*
     - Global Link: *"Lihat Seluruh Koleksi →"* (linking to `/properties`).
  2. Property Grid:
     - Curated property cards (`isFeatured: true`) demonstrating diverse property types (Rumah, Vila, Apartemen/Penthouse).
  3. Property Card Architecture:
     - Architectural photograph (`aspect-[4/3]`) with subtle tag overlay (`Dijual` / `Disewa` in `White`/`Ink` stone badge).
     - Evocative property title (e.g., *The Kayuputih Residence*, *Villa Terra Uluwatu*).
     - Neighborhood & City: `Menteng, Jakarta Pusat` (`text-sage`, DM Sans).
     - Formatted Price: `Rp 18,5 Miliar` (Tabular numbers, font-serif or clean DM Sans semi-bold).
     - Architectural Spec Ribbon: `LT 450 m²` · `LB 520 m²` · `4 KT` · `5 KM`.
- **Desktop Composition:**
  - Asymmetric 3-card or 4-card rhythm:
    - High-taste asymmetric grid with staggered vertical offsets (`translate-y-4` on card 2) to break generic template monotony.
- **Mobile Composition:**
  - Single-column vertical stack with full-width cards, large tap-friendly links, and horizontal metadata ribbons.
- **Visual Treatment:**
  - Background: Crisp `Limestone` (`#F4F0E8`).
  - Card container: `bg-white` with `1px border-sand-dark`.
  - Image hover: Image scales smoothly (`1.025`), and title shifts subtly to `Bronze`.
- **CTA & Interaction:**
  - Clicking anywhere on a card navigates to `/properties/[slug]`.
  - Secondary button at bottom: *"Jelajahi Seluruh Koleksi"* (`Ink` button with limestone text).
- **Scope & Boundaries:** Homepage preview (`FR-001`, `FR-002`). Filtering controls reserved for `/properties` (`FR-004`).

---

### Section 05: Featured Locations — Places with Character

- **Purpose:** Anchor properties within their geographical and lifestyle contexts through an asymmetric editorial mosaic celebrating Indonesia’s prime enclaves.
- **User Intent:** Explore properties by lifestyle destination (heritage Jakarta, highland Bandung, tropical Bali, or modern BSD).
- **Approved 4-Card Asymmetric Mosaic Composition:**
  - **Card 1 (Large Featured Enclave — 6 cols desktop, full height):**  
    *Menteng & Kebayoran Baru, Jakarta* — *Keanggunan Bersejarah & Preseden Urban*. Prominent visual anchor with deep architectural imagery.
  - **Card 2 (Medium Enclave — 6 cols top-right):**  
    *Uluwatu & Canggu, Bali* — *Arsitektur Tropis & Panorama Cakrawala*.
  - **Card 3 (Medium Enclave — 3 cols bottom-right):**  
    *Dago Pakar, Bandung* — *Hunian Lereng Bukit & Iklim Sejuk*.
  - **Card 4 (Shorter Landscape Card — 3 cols bottom-right):**  
    *BSD City, Tangerang Selatan* — *Urbanisme Hijau & Presisi Kontemporer*.
- **Desktop Composition:**
  - Structured 12-column asymmetric grid: Left half features Card 1 as the commanding anchor; Right half splits into Card 2 (top) and Cards 3 & 4 (bottom side-by-side).
  - Varied aspect ratios break visual monotony while maintaining clean outer alignment.
- **Mobile Composition:**
  - Linear vertical stack with Card 1 commanding top prominence, followed by Cards 2, 3, and 4 with touch-friendly dimensions.
- **Visual Treatment:**
  - Background: `Sand` (`#E4DED2`) providing tactile visual separation.
  - Cards feature full architectural photography backgrounds with dark subtle gradient scrims (`from-ink/80 via-ink/25 to-transparent`).
  - Typography overlay in pure `White` and `Limestone` with crisp contrast.
- **CTA & Interaction:**
  - Clicking any location card directs to the catalog with the location preset: `/properties?city=Jakarta+Selatan` or `/properties?city=Badung%2C+Bali`.
- **Scope & Boundaries:** Visual discovery gateway. Prepares route parameters for M04.

---

### Section 06: Architecture & Living — A Different Perspective

- **Purpose:** Provide an intellectual editorial pause, reinforcing the *"Editorial Architecture"* thesis through deep design appreciation and material storytelling.
- **User Intent:** Connect with the lifestyle, materiality, and structural philosophy of modern tropical and contemporary luxury architecture.
- **Content Hierarchy:**
  1. Eyebrow: `ESAI ARSITEKTURAL` (DM Sans, `text-sage`).
  2. Editorial Headline: *"Dialog Antara Cahaya, Material Alami, dan Lanskap Tropis."*
  3. Lead Monograph: A thoughtfully authored 2-to-3 paragraph essay exploring how climate-responsive architecture, natural cross-ventilation, authentic Indonesian timber (Ulin, Teak), and volcanic stone create residences that age with dignity.
  4. Architectural Detail Photography: Triptych collage of architectural textures (e.g., board-formed concrete, louvered teak screens filtering tropical light, stone water elements).
- **Desktop Composition:**
  - Asymmetric 2-column editorial magazine spread:
    - Left column (5 cols): Triptych collage of architectural detail photography with varying heights.
    - Right column (7 cols): Generous typography layout with drop caps, pull quotes in Cormorant Garamond, and curator signature.
- **Mobile Composition:**
  - Single column: Lead photo -> Title -> Editorial excerpt -> Clean stacked layout.
- **Visual Treatment:**
  - Background: Warm `Limestone` (`#F4F0E8`) with fine bronze framing.
  - Hairline architectural grid markers at container boundaries.
- **CTA & Interaction:**
  - Non-transactional editorial link: *"Pelajari Pendekatan Desain NARA →"* linking to `/contact`.
- **Scope & Boundaries:** Brand depth (`FR-001`). No CMS dynamic blog engine required for MVP.

---

### Section 07: The NARA Approach — Curated with Intention

- **Purpose:** Present the core editorial principles that guide the NARA ESTATE showcase, clearly communicating its curatorial philosophy without making fabricated legal or financial advisory claims.
- **User Intent:** Understand the values, presentation standards, and methodology of the NARA ESTATE platform.
- **Four Approved Editorial Principles (Replacing Unsubstantiated Service Claims):**
  1. **Curated Architecture (*Kurasi Arsitektural*):** Setiap residensi dipilih berdasarkan karakter spasial yang kuat, harmoni proporsi, dan integritas desain yang autentik.
  2. **Location & Lifestyle (*Karakter Kawasan & Gaya Hidup*):** Menghubungkan hunian dengan konteks lingkungannya—dari ketenangan enklave bersejarah hingga lanskap pesisir tropis.
  3. **Property Information (*Kejelasan Informasi Properti*):** Menyajikan data spesifikasi fisik (LT, LB, KT, KM) dan dokumentasi visual arsitektural secara transparan dan terstruktur.
  4. **Thoughtful Guidance (*Panduan Berkesadaran*):** Pendekatan eksplorasi yang tenang, menghargai waktu dan preferensi estetika penikmat arsitektur tanpa tekanan penjualan agresif.
- **Showcase Transparency Note:**
  - A subtle editorial notice confirming NARA ESTATE's identity: *"NARA ESTATE merupakan platform demonstrasi portofolio premium yang mengedepankan kurasi arsitektur dan pengalaman digital modern."*
- **Desktop Composition:**
  - 12-column grid:
    - 4-column balanced card grid for the four editorial principles, styled with fine numbers (`01`, `02`, `03`, `04` in Cormorant Garamond Bronze).
    - Bottom row featuring the showcase transparency statement and an invitation to meet the fictional advisory team at `/agents`.
- **Mobile Composition:**
  - 2x2 or single-column stacked cards with clean divider lines.
- **Visual Treatment:**
  - Background: `Limestone` (`#F4F0E8`) with `White` card surfaces and `Sand` border accents.
- **CTA & Interaction:**
  - Button: *"Lihat Profil Penasihat"* linking to `/agents` (`FR-009`).
- **Scope & Boundaries:** Editorial philosophy overview (`FR-001`). No real financial/legal guarantees.

---

### Section 08: Closing CTA — Begin Your Next Chapter

- **Purpose:** Serve as the primary conversion catalyst on the homepage, inviting visitors to connect through approved demonstration contact channels.
- **User Intent:** Inquire about a property or initiate contact regarding the showcase.
- **Content Hierarchy:**
  1. Eyebrow: `HUBUNGI KAMI`
  2. Headline: *"Mulai Percakapan Mengenai Hunian Impian Anda."* (Cormorant Garamond H2)
  3. Brand Tagline Echo: *"Find a place to belong."*
  4. Value Proposition: *"Tertarik untuk mengetahui lebih lanjut mengenai koleksi properti NARA ESTATE? Hubungi kami untuk mendiskusikan kurasi hunian yang sesuai dengan visi Anda."*
  5. Dual Action Buttons:
     - Primary Action: `Kirim Pesan / Kontak` (Navigates cleanly to `/contact`, `FR-012`).
     - Secondary Action: `Tanya via WhatsApp` (Optional demonstration link using an explicitly configured demo number, e.g., `https://wa.me/6281199887766?text=...`, treated as an external integration dependency).
  6. Flagship Office Descriptor: Fictional flagship gallery in Senopati/Kebayoran Baru, Jakarta Selatan.
- **Desktop Composition:**
  - High-impact dark inverted canvas:
    - Background: Deep `Ink` (`#252722`).
    - Text: `Limestone` (`#F4F0E8`) and `Bronze` (`#B39A78`).
    - Centered 8-column wide container with generous vertical breathing room (`py-28`).
    - Dual button cluster centered with ample whitespace.
- **Mobile Composition:**
  - Full-width dark section with stacked buttons and clear office details.
- **Visual Treatment:**
  - Atmospheric dark editorial surface with subtle bronze hairline perimeter border.
  - High-contrast accessible text pairing.
- **CTA & Interaction:**
  - Primary button routes to `/contact` (`FR-012`).
  - WhatsApp CTA uses the explicitly configured demo number, opening in a new tab (`target="_blank" rel="noopener noreferrer"`).
- **Scope & Boundaries:** Conversion bridge. Full interactive contact form implementation belongs to M06.

---

### Section 09: Footer — Brand Signature

- **Purpose:** Provide an authoritative colophon, comprehensive secondary site navigation, legal disclaimers, and clear showcase attribution.
- **User Intent:** Locate legal info, explore specific property types/locations, access dashboard preview, or review showcase credentials.
- **Content Hierarchy:**
  1. Column 1: Brand Wordmark **NARA ESTATE**, official tagline *"Find a place to belong."*, and curatorial monograph summary.
  2. Column 2 (Koleksi Properti): Links to `/properties?type=rumah`, `/properties?type=vila`, `/properties?type=apartemen`, `/properties?status=dijual`, `/properties?status=disewa`.
  3. Column 3 (Navigasi Utama): `Beranda` (`/`), `Koleksi Properti` (`/properties`), `Penasihat` (`/agents`), `Kontak` (`/contact`), `Dashboard Preview` (`/dashboard`).
  4. Column 4 (Galeri & Kantor): Fictional flagship address (Kebayoran Baru, Jakarta Selatan), contact phone, and consultation hours.
  5. Bottom Bar:
     - Copyright: `© 2026 NARA ESTATE. Seluruh hak cipta dilindungi.`
     - Showcase Attribution: `BEDI REAL ESTATE — Architectural MVP Showcase. Dibangun dengan Next.js App Router & Tailwind CSS.`
- **Desktop Composition:**
  - 4-column balanced grid on deep `Ink` (`#252722`) with `Sand-dark/20` divider lines.
  - Sub-footer row with copyright on left and MVP showcase attribution on right.
- **Mobile Composition:**
  - 2-column or stacked accordion layout; bottom bar stacked with centered text.
- **Visual Treatment:**
  - Deep `Ink` background continuing seamlessly from Section 08.
  - Text in muted `Sage-light` (`#9ea192`) with hover transitions to `Limestone`.
- **CTA & Interaction:**
  - All internal links resolve to approved App Router routes (`/properties`, `/agents`, `/contact`, `/dashboard`).
- **Scope & Boundaries:** Global footer shell (`FR-015`).

---

## 5. Homepage Information Architecture & Approved Routes

```text
                                  HOMEPAGE (/)
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        ▼                              ▼                              ▼
   Quick Search                  Property Cards                 Location Tiles
   (Visual Dock)              (/properties/[slug])           (/properties?city=)
        │                              │                              │
        ▼                              ▼                              ▼
  Catalog Route                  Property Detail               Filtered Catalog
  (/properties)                   (FR-006..008)                  (/properties)
```

### Approved Route Mapping:
- **Homepage:** `/`
- **Property Catalog:** `/properties`
- **Property Detail:** `/properties/[slug]`
- **Agent Directory:** `/agents`
- **Agent Profile:** `/agents/[slug]`
- **Contact:** `/contact` *(corrected from /kontak)*
- **Dashboard Preview:** `/dashboard`

---

## 6. Layout Principles across Breakpoints

| Breakpoint | Width Range | Container Width | Layout Strategy |
| :--- | :--- | :--- | :--- |
| **Mobile** | `320px – 639px` | `100%` (Padding `px-5`) | Single-column linear stack, 44px minimum tap targets, collapsible menus, full-bleed images. |
| **Tablet** | `640px – 1023px`| `100%` (Padding `px-8`) | 2-column balanced grids, adaptive search bar, 2x2 location cards, readable editorial type. |
| **Desktop** | `1024px – 1359px`| Max `1200px` centered | Asymmetric 12-column grid, split hero (5/7), staggered property cards, rich whitespace. |
| **Wide Desktop** | `1360px+` | Max `1360px` (`max-w-editorial`) | Full architectural monograph proportions, expansive side margins (`mx-auto`), gallery breathing room. |

---

## 7. Image Art Direction & Asset Requirements

1. **Architectural Photography Standard:**
   - Real, authentic architectural structures showcasing natural light, truthful materials (concrete, teak, stone, glass, water), and spatial depth.
   - Strictly avoid low-resolution renders, distorted ultra-wide fish-eye lenses, and heavy digital CGI watermarks.
2. **Aspect Ratios:**
   - Hero Visual: `16:10` (Desktop landscape) or `4:5` (Editorial portrait).
   - Property Cards: `4:3` (Standardized architectural card ratio).
   - Featured Locations: Varied mosaic ratios (large anchor `16:10` / `4:5`, medium cards `16:9`, landscape card `21:9` or `3:2`).
   - Architectural Essays / Details: `1:1` or `16:9` cinematic details.
3. **Responsive Image Optimization:**
   - Served via Next.js `<Image />` component with `sizes` configured, `alt` text in descriptive Bahasa Indonesia, and lazy loading for sections below the fold.

---

## 8. Typography & Color Token Application

### 8.1 Color Application Matrix
| Section | Background Token | Primary Text | Accent / Highlight | Dividers / Borders |
| :--- | :--- | :--- | :--- | :--- |
| **01. Navigation** | `Limestone` (`#F4F0E8` / 90% blur) | `Ink` (`#252722`) | `Bronze` (`#B39A78`) | `Sand-dark/30` |
| **02. Hero** | `Limestone` (`#F4F0E8`) | `Ink` (`#252722`) | `Bronze` (`#B39A78`) | `Sand` (`#E4DED2`) |
| **03. Brand Manifesto** | `Sand` (`#E4DED2`) | `Ink` (`#252722`) | `Bronze` (`#B39A78`) | `Sage/20` |
| **04. Curated Properties** | `Limestone` (`#F4F0E8`) | `Ink` (`#252722`) | `Sage` & `Bronze` | `Sand-dark/40` |
| **05. Featured Locations** | `Sand` (`#E4DED2`) | `White` (on photo) | `Bronze-light` | `White/10` |
| **06. Architecture & Living**| `Limestone` (`#F4F0E8`) | `Ink` (`#252722`) | `Bronze` (`#B39A78`) | `Sand-dark/40` |
| **07. The NARA Approach** | `Limestone` (`#F4F0E8`) | `Ink` (`#252722`) | `Bronze` (`#B39A78`) | `Sand` (`#E4DED2`) |
| **08. Closing CTA** | `Ink` (`#252722`) | `Limestone` (`#F4F0E8`) | `Bronze` (`#B39A78`) | `Bronze/20` |
| **09. Footer** | `Ink` (`#252722`) | `Sage-light` (`#9ea192`)| `Limestone` / `Bronze`| `Ink-light` |

### 8.2 Typography Mapping
- **Hero & Section H2s:** `Cormorant Garamond` (weights 500/600), optical tracking `-0.015em`, line-height `1.12`.
- **Overlines / Eyebrows:** `DM Sans` (weight 600), `text-xs` (12px), uppercase, tracking `+0.16em`, color `Sage`.
- **Body Text:** `DM Sans` (weights 400/500), `text-base` (16px), line-height `1.65`.
- **Prices & Dimensions:** `DM Sans` semi-bold with `.tabular-nums` class to ensure tabular alignment across currency digits and square meter symbols.

---

## 9. Motion & Interaction Principles

1. **Subtle & Deliberate:**
   - Micro-interactions must feel mechanical, precise, and understated.
   - Hover scale on architectural cards: `transform: scale(1.025)` over `500ms cubic-bezier(0.16, 1, 0.3, 1)`.
2. **Accessible Motion:**
   - Full respect for `prefers-reduced-motion: reduce`. When active, animations degrade gracefully to instant state changes or subtle opacity fades.
3. **Restrained Pacing:**
   - Avoid aggressive parallax bouncing, rotating badges, or automatic carousel spinning that detracts from the calm editorial atmosphere.

---

## 10. Accessibility Requirements (WCAG AA Compliance)

- **Contrast Ratios:**
  - `Ink #252722` on `Limestone #F4F0E8`: Contrast ratio `13.1:1` (Exceeds WCAG AAA).
  - `Ink #252722` on `Sand #E4DED2`: Contrast ratio `10.8:1` (Exceeds WCAG AAA).
  - `Limestone #F4F0E8` on `Ink #252722`: Contrast ratio `13.1:1` (Exceeds WCAG AAA).
  - `Bronze #B39A78` used primarily on backgrounds where contrast exceeds `4.5:1` or for decorative/hairline elements.
- **Semantic Structure:**
  - Strictly one `<h1>` per page (in Hero Section).
  - Proper heading hierarchy (`h1` -> `h2` -> `h3`).
  - Native `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` HTML5 landmarks.
- **Keyboard Navigation:**
  - All interactive cards, search preview docks, and CTA buttons support standard Tab navigation and visible `:focus-visible` rings (`outline: 2px solid #B39A78; outline-offset: 2px`).

---

## 11. Content Guidelines & Bahasa Indonesia Copy Direction

- **Tone of Voice:** Refined, authoritative, calm, respectful, and articulate.
- **Key Terminology Equivalents:**
  - *Curated Residences* -> *"Koleksi Residensial Terkurasi"*
  - *Land Area / Building Area* -> *"Luas Tanah (LT) / Luas Bangunan (LB)"*
  - *Private Viewing / Schedule Tour* -> *"Jadwalkan Kunjungan Privat"*
  - *Senior Advisors* -> *"Penasihat Properti"*
  - *Contact* -> *"Hubungi Kami"*
  - *Direct Inquiry* -> *"Konsultasi Langsung"*
- **Preserved English Elements:**
  - Brand Name: **NARA ESTATE**
  - Brand Tagline: *"Find a place to belong."*
  - Universal architectural classifications: *Penthouse*, *Townhouse*, *Smart Home System*.

---

## 12. Section-to-Section Visual Rhythm

```text
[Section 01: Navigation]   ─────── Light Stone Canvas (Limestone #F4F0E8)
[Section 02: Hero]         ─────── Light Stone Canvas (Limestone #F4F0E8) + Photo
[Section 03: Manifesto]    ─────── Warm Tint Surface (Sand #E4DED2) [Visual Pause 1]
[Section 04: Curated Grid] ─────── Light Stone Canvas (Limestone #F4F0E8)
[Section 05: Locations]    ─────── Warm Tint Surface (Sand #E4DED2) + Asymmetric Mosaic [Visual Pause 2]
[Section 06: Architecture] ─────── Light Stone Canvas (Limestone #F4F0E8) + Essay
[Section 07: The Approach] ─────── Light Stone Canvas (Limestone #F4F0E8) + 4 Editorial Principles
[Section 08: Closing CTA]  ─────── Deep Ink Surface (Ink #252722) [High-Impact Climax]
[Section 09: Footer]       ─────── Deep Ink Surface (Ink #252722) [Monograph Colophon]
```

---

## 13. Milestone Boundaries & M03.2 Scope Rules

The upcoming **M03.2** implementation phase must strictly follow the boundaries below:
1. **In-Scope for M03.2:**
   - Global layout components: `Header.tsx`, `MobileNav.tsx`, `Footer.tsx`.
   - Reusable `PropertyCard.tsx` presentational component.
   - Dedicated homepage section components corresponding to the nine blueprint sections.
   - Assembling the full homepage in `src/app/page.tsx`.
   - Verified integration with local mock demonstration data.
2. **Explicitly Out-of-Scope for M03.2:**
   - Interactive search and multi-faceted filtering functionality (`/properties`, `M04`).
   - Dynamic property detail page (`/properties/[slug]`, `M05`).
   - Standalone Agent directory & profile pages (`/agents`, `M06`).
   - Standalone Mortgage calculator tool & Contact consultation form validation (`/contact`, `M06`).
   - Executive Dashboard preview page (`/dashboard`, `M07`).
   - Automated Playwright E2E test authoring (`M08`).

---

## 14. Acceptance Criteria & QA Checklist for Blueprint Sign-off

- [x] All fabricated business metrics ("12 Koleksi Mahakarya", "Rp 240+ Miliar") removed and replaced with authentic editorial statements.
- [x] Section 07 (The NARA Approach) revised to present the four approved editorial principles without legal/financial advisory claims.
- [x] All contact references corrected to `/contact` (not `/kontak`), and WhatsApp treated as an external demo dependency.
- [x] Hero Quick Search clearly defined as a visual preview dock directing users to `/properties`, with actual filtering logic scoped to M04.
- [x] Section 05 (Featured Locations) specified as an asymmetric four-card editorial mosaic (one large, two medium, one shorter landscape).
- [x] Preserved all nine approved sections, color tokens, typography, and responsive rules.
- [x] Strictly zero application source code, components, or package dependencies modified.
