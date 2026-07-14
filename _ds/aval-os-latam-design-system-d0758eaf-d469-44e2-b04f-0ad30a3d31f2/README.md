# Avalúos LATAM — Design System

Internal design system for **Avalúos LATAM**, a Spanish-language asset-valuation / appraisal platform operating across Latin America. The product helps coordinators and field auxiliaries catalog, classify, and audit fixed assets — furniture, IT equipment, heavy machinery, vehicles, real estate, medical equipment, and intangibles — during on-site surveys.

---

## Context & sources

This design system was derived from a single source: a React + TypeScript + TailwindCSS screen (`FixedAssetsCatalog.tsx`) implementing the **Catálogo de activos** (asset catalog) administration view. The screen includes:

- A **family control panel** (coordinator-only) letting admins toggle which asset families are available to field auxiliaries.
- A **searchable, paginated table** of catalog items with row-level availability indicators.
- Full **CRUD modals** (create / view / update / delete) with inline duplicate & similarity detection (Levenshtein-based, 0.75 threshold).
- A dual role model: `coordinator` (full admin) vs field `auxiliary` (read-only of enabled items).

The user email domain (`avaluoslatam.com`) and Spanish UI copy (`es-MX` locale) confirm the brand and region.

> No Figma file, logo, brand guide, or additional screens were provided. Brand voice, typography, iconography, and full-product scope are **inferred from the one screen** and may need correction from the team.

---

## Content fundamentals

**Language.** Spanish (Mexico), formal register. The UI addresses the user implicitly — not "tú" or "usted" — by using infinitives and noun phrases: *Nueva entrada*, *Cancelar*, *Guardar cambios*, *Eliminar esta entrada del catálogo*.

**Casing.** Sentence case everywhere. Section titles (*"Control de familias"*, *"Ítems del catálogo"*), button labels (*"Nueva entrada"*, *"Guardar de todas formas"*), and table headers (*"Familia / Grupo"*, *"Estado conserv."*) never use ALL CAPS in the body. The only upper-case treatment is the small-caps-like `uppercase tracking-wide` utility on **table header cells** and micro-badges (e.g. *"DESHABILITADA"*).

**Tone.** Direct, functional, slightly formal. Short help text under titles: *"Define qué familias están disponibles para los auxiliares · 4 de 9 habilitadas"*. Separators use the middot `·`, not `|` or `—`.

**Confirmation copy** is plain and consequence-forward: *"¿Eliminar esta entrada del catálogo?"* followed by *"Esta acción no se puede deshacer."* No exclamation marks.

**Empty states** use one emoji + one neutral sentence: 📭 + *"El catálogo está vacío."* / *"Sin resultados para esa búsqueda."*

**Validation copy** is differentiated by severity:
- **Error** (blocking): prefix `✕`, red tones. *"Ya existe una entrada con ese nombre exacto"*
- **Warning** (soft): prefix `⚠`, amber tones. *"Nombre similar a 3 entradas existentes"* — followed by a reassurance: *"Si es una variante distinta, puedes guardar de todas formas."*

**Numerical/relational phrasing** is spelled out, e.g. *"Mostrando 10 de 137 resultados"*, *"4 de 9 habilitadas"*.

**Emoji** are used sparingly, only in empty states (📭) and as typographic prefixes (✕, ⚠). No decorative icons in buttons or headings.

**Dates** are formatted via `toLocaleDateString("es-MX")` → `dd/mm/yyyy`.

---

## Visual foundations

**Color.**
- **Primary action:** a saturated red — Tailwind `red-600` (#DC2626) with `red-700` hover and `red-800` active. Used on all primary CTAs and on the active pagination page.
- **Secondary / export:** dark green — `green-700` (#15803D). Used for the Excel export button (currently disabled with `opacity-60`) and for the enabled-state accent on family cards (`green-50/40` wash, `green-200` border, `green-500` toggle track).
- **Warning:** amber — `amber-400` border / `amber-500` bg for "save anyway" buttons, `amber-50` wash for soft-warning rows and similarity banners.
- **Destructive:** `red-600` for delete.
- **Neutrals:** Tailwind gray scale. `gray-50` page bg accents, `gray-200/700` borders, `gray-500/400` secondary text, `gray-800` / white primary text. **Full dark-mode parity** via `dark:gray-700/800/900` mirroring.
- **Status dots:** 1.5 × 1.5 px dots — `green-500` for available, `gray-300`/`gray-600` for unavailable.
- **Badges:** pill `rounded-full px-2 py-0.5`. `blue-100/700` for *Industrial*, `amber-100/700` for *Mobiliario*.

**Typography.** The codebase ships no custom font — it inherits Tailwind's default `font-sans` stack (system-ui → Segoe UI → Roboto → …). This design system standardizes on **Inter** as the closest web-font substitute (free on Google Fonts). *If the brand has an official display face, please share it and we will swap.*

- Sizes used: `text-xs` (12), `text-sm` (14), `text-[11px]` micro-badges, `text-[10px]` micro-hints, `text-lg` (modal close `✕`), `text-3xl` (empty-state emoji).
- Weights: `font-medium` (500), `font-semibold` (600). No bold/800.
- Tracking: `tracking-wide` on uppercased micro-labels only.

**Spacing.** Tailwind scale, 4-px base. Dominant values: `gap-3` (12) for form grids, `space-y-4` (16) for modal sections, `space-y-6` (24) between top-level sections, `px-4 py-3` for table cells, `px-5 py-4` for modal headers.

**Borders & radii.**
- `rounded-lg` (8px) → inputs, selects, inline buttons, inner info banners.
- `rounded-xl` (12px) → cards, modals, primary CTA buttons, family tiles.
- `rounded-full` → pill badges, toggle pills, status dots.
- Borders are always 1 px, `gray-200` (light) / `gray-700` (dark). Red/amber/green variants for state (`red-200 dark:red-700`).

**Shadows.** Minimal. `shadow-sm` on primary buttons, `shadow` on the toggle knob, `shadow-xl` on modals. No layered or colored shadows.

**Backgrounds.** Flat fills only. No gradients, no imagery, no patterns. The app sits on plain `white` / `gray-900`. Soft tinted washes (`green-50/40`, `amber-50/50`, `red-50`) signal state on cards and rows.

**Opacity for state.**
- Unavailable rows: `opacity-40` (family disabled) or `opacity-55` (item excluded).
- Disabled buttons: `opacity-50` – `opacity-60` + `cursor-not-allowed`.

**Transitions.** Utility-class only: `transition-colors`, `transition-opacity`, `transition-transform` (toggle knob), `transition-all` (family card state). No keyframes, no spring physics, no bounces. The single animation is `animate-pulse` on the loading-state text.

**Hover / press.**
- Primary buttons: darker shade (`red-600` → `red-700` → `red-800` active).
- Secondary buttons: light-gray wash (`hover:bg-gray-50`).
- Rows: very subtle (`hover:bg-gray-50/50`).
- No scale/shrink on press.

**Focus.** `focus:outline-none focus:ring-2 focus:ring-red-400` on every input, select, textarea. Amber or red ring mirrors the validation state of the field.

**Transparency & blur.** Used only for modal scrims — `bg-black/50`, no backdrop-blur.

**Layout rules.**
- Horizontal padding responds to viewport: `px-2 sm:px-0`.
- Content grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` for tile lists; `grid-cols-2` inside modal forms.
- Modals: `max-w-sm` (confirms), `max-w-md` (detail), `max-w-lg` (forms). Max height `90vh` with internal scroll.
- Tables: `overflow-hidden rounded-xl border`, sticky-looking header bar (`bg-gray-50 dark:bg-gray-800/50`).

**Cards.** `rounded-xl border border-gray-200 dark:border-gray-700`, white bg, no shadow. Title + description header, optional right-aligned `actionElement`.

---

## Iconography

The source screen uses **zero icon fonts or SVG libraries**. All "icons" are:

- **Unicode glyphs** — `✕` close, `✓` checkmarks, `⚠` warning, `›` breadcrumb separator & pagination right, `‹` pagination left, `·` middot separator.
- **Emoji** — `📭` empty state (single usage).
- **CSS shapes** — status dots (`w-1.5 h-1.5 rounded-full`), toggle pills.

For a real product scale-up we recommend **Lucide** (via CDN) — it matches the visual weight of the existing UI (1.5 px stroke, rounded line caps) and is free. This substitution is **flagged** and needs sign-off. No logo was provided; the `Brand` card in the preview uses a text mark as placeholder.

---

## Index

```
README.md                    ← you are here
SKILL.md                     ← agent-invocable skill manifest
colors_and_type.css          ← CSS custom properties (base + semantic)
preview/                     ← design-system preview cards (registered assets)
  colors-primary.html
  colors-neutrals.html
  colors-semantic.html
  type-scale.html
  spacing-radii.html
  shadows.html
  buttons.html
  inputs.html
  toggles-badges.html
  cards.html
  brand-wordmark.html
ui_kits/
  catalog/                   ← the Fixed Assets Catalog recreation
    README.md
    index.html
    CatalogTable.jsx
    FamilyControl.jsx
    Modal.jsx
    Toggle.jsx
assets/                      ← logos & brand marks (placeholder wordmark only)
fonts/                       ← Inter (Google Fonts substitute, flagged)
```

---

## Caveats

1. **No official logo or brand guidelines were provided** — the wordmark, color names, and any display/serif choices are inferred.
2. **Fonts: Inter is a substitute** for Tailwind's default system stack. If Avalúos LATAM has an official face, please share the `.woff2` files.
3. **Only one product screen was analyzed** — sidebar / header / auth / survey-capture screens will need to be added once source code or Figma is available.
4. **Role model** is coded as `isCoordinator = true` in the source; the real backend role boundary is unverified.
