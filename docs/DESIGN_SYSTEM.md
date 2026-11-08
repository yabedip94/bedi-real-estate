# Design System Specification

**Project:** BEDI REAL ESTATE  
**Brand / Fictional Demo Agency:** NARA ESTATE  
**Tagline:** *Find a place to belong.*  
**Approved Design Direction:** Editorial Architecture × Modern Luxury  
**Document Version:** 1.0 (Approved Baseline — M01.5)  

> **Note:** The tokens and specifications below represent the approved initial design tokens for **NARA ESTATE**, subject to controlled visual refinement during implementation while strictly preserving the brand direction.

---

## 1. Brand Identity & Aesthetic Direction

| Element | Specification |
| :--- | :--- |
| **Brand Name** | **NARA ESTATE** |
| **Brand Tagline** | *Find a place to belong.* |
| **Design Direction** | **Editorial Architecture × Modern Luxury** |
| **Primary Language** | Bahasa Indonesia |
| **Hero Visual Strategy** | High-impact, curated architectural photography |

### Aesthetic Philosophy
**NARA ESTATE** rejects cluttered portal directories and high-saturation promotional banners in favor of a calm, tactile, architectural Monograph aesthetic. Inspired by contemporary architectural publications and luxury hospitality brands, the interface pairs warm organic mineral tones (`Limestone`, `Sand`, `Bronze`, `Sage`) with deep charcoal `Ink` and editorial serif typography.

---

## 2. Initial Color Tokens

These are the approved initial color tokens, subject to refinement during implementation (such as adding subtle opacity variants, borders, or semantic feedback states in `M02`):

| Token Name | Hex Value | CSS Custom Property | Primary Usage & Role |
| :--- | :--- | :--- | :--- |
| **Limestone** | `#F4F0E8` | `--color-limestone` | Primary canvas / page background; creates a warm, gallery-like architectural surface. |
| **Ink** | `#252722` | `--color-ink` | Primary text, editorial headings, high-contrast buttons, and structural hairlines. |
| **Sage** | `#858875` | `--color-sage` | Secondary/muted text, metadata labels, subtle badges, and botanical/architectural accents. |
| **Bronze** | `#B39A78` | `--color-bronze` | Warm luxury accent, active indicators, hover highlights, focus rings, and premium badges. |
| **Sand** | `#E4DED2` | `--color-sand` | Secondary section backgrounds, card surfaces, filter containers, and subtle dividers. |
| **White** | `#FFFFFF` | `--color-white` | Elevated card surfaces, input fields, modal dialogs, and crisp contrast elements. |

### Contrast & Accessibility Pairing Guidelines
- **Primary Reading Pair:** `Ink` (`#252722`) on `Limestone` (`#F4F0E8`) or `White` (`#FFFFFF`) — exceeds WCAG AAA contrast requirements (`> 12:1`).
- **Elevated Surface Pair:** `Ink` (`#252722`) on `Sand` (`#E4DED2`) — exceeds WCAG AA/AAA contrast requirements (`> 10:1`).
- **Dark Editorial Inversion:** `Limestone` (`#F4F0E8`) or `White` (`#FFFFFF`) on `Ink` (`#252722`) for footers, primary CTAs, and featured editorial callouts.
- **Accent Usage:** `Bronze` (`#B39A78`) and `Sage` (`#858875`) should be used thoughtfully for borders, eyebrows, icons, and secondary metadata, ensuring body copy remains in high-contrast `Ink`.

---

## 3. Typography

### 3.1 Font Families

| Role | Font Family | Source | Weights | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display / Headings** | **Cormorant Garamond** | Google Fonts (`next/font/google`) | `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold) + *Italic* | Hero headlines, page titles, section headers, property titles, and editorial pull-quotes. |
| **Body / UI & Numerals** | **DM Sans** | Google Fonts (`next/font/google`) | `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold) | Body copy, navigation links, buttons, filter controls, tables, badges, prices, and KPR calculator figures. |

### 3.2 Typographic Scale (Initial Baseline)

| Level | Font Family | Desktop Size | Mobile Size | Line Height | Tracking |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display Hero** | Cormorant Garamond | `3.75rem` (60px) | `2.5rem` (40px) | `1.08` | `-0.02em` |
| **H1 (Page Title)** | Cormorant Garamond | `3rem` (48px) | `2.25rem` (36px) | `1.12` | `-0.015em` |
| **H2 (Section Header)** | Cormorant Garamond | `2.25rem` (36px) | `1.75rem` (28px) | `1.18` | `-0.01em` |
| **H3 (Card / Subgroup)** | Cormorant Garamond | `1.5rem` (24px) | `1.35rem` (21.6px) | `1.25` | `0em` |
| **Eyebrow / Overline** | DM Sans | `0.75rem` (12px) | `0.75rem` (12px) | `1.4` | `+0.14em` (Uppercase) |
| **Body Large** | DM Sans | `1.125rem` (18px) | `1rem` (16px) | `1.65` | `0em` |
| **Body Default** | DM Sans | `1rem` (16px) | `0.9375rem` (15px) | `1.6` | `0em` |
| **Caption / Metadata** | DM Sans | `0.875rem` (14px) | `0.8125rem` (13px) | `1.5` | `+0.01em` |

### 3.3 Numeric Formatting Rule
- Use `tabular-nums` (`font-variant-numeric: tabular-nums`) on all IDR price displays (`Rp 12,5 Miliar`), floor/land areas (`450 m²`), and KPR calculator outputs so digits align cleanly in grids and tables.

---

## 4. Core Design Principles

1. **Editorial Asymmetric Grid:**
   - Utilize a 12-column desktop grid (`max-width: 1360px`) that supports asymmetric splits (e.g., 5/7 or 4/8 column proportions for brand stories and property detail layouts) alongside structured 3-column catalog grids.
2. **Generous Whitespace:**
   - Maintain ample vertical section padding (`py-16` to `py-28`) and breathing room around cards so each property feels distinct and prestigious.
3. **Architectural Photography:**
   - Showcase residences through uncrowded aspect ratios (`4:3`, `16:10`, and `3:4` editorial portraits) with minimal badge clutter over the image plane.
4. **Sophisticated Typography:**
   - Contrast the literary elegance of `Cormorant Garamond` titles with the modern precision of `DM Sans` specifications and uppercase tracking labels.
5. **Functional Property Discovery:**
   - Keep search bars, filter controls, price tags, and key metrics (`LT`, `LB`, `KT`, `KM`) immediately legible and reachable within one click.
6. **Responsive Design:**
   - Design mobile-first workflows where complex desktop layouts (multi-column filters, image galleries, KPR breakdowns) stack gracefully on small screens (`375px+`).
7. **Subtle Animations:**
   - Limit motion to refined micro-interactions: gentle image scale on card hover (`scale-[1.03]` over `500ms ease-out`), smooth drawer transitions, and subtle opacity reveals—respecting `prefers-reduced-motion`.
8. **Accessible Contrast:**
   - Maintain strong text legibility, visible keyboard focus indicators (`2px solid #B39A78` or `#252722`), semantic HTML landmarks, and descriptive `alt` attributes.

---

## 5. UI Component Styling Guidelines

- **Buttons & CTAs:**
  - *Primary Button:* Background `Ink` (`#252722`), text `Limestone` (`#F4F0E8`), hover transition to `Bronze` (`#B39A78`) or deep charcoal with subtle border refinement.
  - *Secondary / Outline Button:* Transparent background, `1px solid #252722` or `#B39A78`, text `Ink` (`#252722`), hover fill `Sand` (`#E4DED2`).
  - *WhatsApp Inquiry CTA:* Clean editorial styling integrated into the palette (using `Ink` or refined dark botanical accent with the WhatsApp / message icon from `lucide-react`).
- **Property Cards:**
  - Crisp framing on `White` (`#FFFFFF`) or `Limestone` (`#F4F0E8`) with subtle `Sand` (`#E4DED2`) hairline borders (`1px`), restrained status pill (`Dijual` / `Disewa`), `Cormorant Garamond` title, `DM Sans` price in `Ink`, and a clean divider separating `LT`, `LB`, `KT`, and `KM` specs.
- **Forms & Inputs:**
  - Clean rectangular or subtly rounded (`rounded-none` to `rounded-sm`, max `2px–4px` radius to preserve architectural sharpness) inputs with `Sand` borders and `Bronze`/`Ink` active focus states.

