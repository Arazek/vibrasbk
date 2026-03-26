# Design System

> Source of truth: `apps/mobile-app/src/theme/variables.css`
> Foundation: [LanguageGUI](https://figma.com/community/file/1334658200949332345) — neutral scale, spacing, radius, shadows
> Font: Inter (400, 500, 600, 700) via Google Fonts

---

## Token Architecture

The system has 4 layers. Always use the highest-level token that applies — reach down to lower layers only when no semantic token fits.

```
Layer 1 — Core         --lgui-neutral-*    Raw neutral scale, system colors
Layer 2 — Semantic     --lgui-surface-*    Surface, border, and text roles
           (Globals)   --lgui-border-*
                       --lgui-text-*
Layer 3 — Brand        --ion-color-*       Ionic color system (coral + gold)
Layer 4 — App          --vibe-*            Domain-specific status colors
                       --type-*
```

---

## Layer 1 — Core Neutrals

8-step neutral scale from white to near-black (navy-toned).

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-neutral-100` | `#FFFFFF` | Pure white |
| `--lgui-neutral-200` | `#F7F8FA` | Off-white backgrounds |
| `--lgui-neutral-300` | `#F0F2F5` | Hover / pressed states |
| `--lgui-neutral-400` | `#E3E6EA` | Borders, dividers |
| `--lgui-neutral-500` | `#BAC0CC` | Disabled, placeholder |
| `--lgui-neutral-600` | `#666F8D` | Secondary text |
| `--lgui-neutral-700` | `#353E5C` | Dark elements |
| `--lgui-neutral-800` | `#19213D` | Primary text, darkest |

### System / Status Colors

| Token | Value | Meaning |
|-------|-------|---------|
| `--lgui-red-100` / `--lgui-red-400` | `#FFF5F6` / `#FE566B` | Error, destructive |
| `--lgui-yellow-100` / `--lgui-yellow-400` | `#FFFAE9` / `#EFC42C` | Warning, caution |
| `--lgui-green-100` / `--lgui-green-400` | `#EEF9F5` / `#4AD562` | Success, positive |
| `--lgui-blue-100` / `--lgui-blue-400` | `#E3EFFF` / `#64A7FF` | Info, neutral action |

---

## Layer 2 — Semantic Tokens

Use these in components. They remap automatically in dark mode.

### Surfaces

| Token | Light | Dark (Noir) | Use |
|-------|-------|-------------|-----|
| `--lgui-surface-1` | `#FFFFFF` | `#1C1C1E` | Cards, dialogs, modals |
| `--lgui-surface-2` | `#F5F5F5` | `#0F0F0F` | Page background |
| `--lgui-surface-3` | `#EBEBEB` | `#2C2C2E` | Hover / pressed state |
| `--lgui-surface-4` | `#A3A3A3` | `#3A3A3C` | Disabled fills |
| `--lgui-surface-5` | `#6B6B6B` | `#48484A` | Subtle fills |
| `--lgui-surface-6` | `#2C2C2C` | `#636366` | Dark fills |
| `--lgui-surface-7` | `#141414` | `#8E8E93` | Darkest fills |

### Borders

Dark mode borders use `rgba(255,255,255, opacity)` — opacity values: 0.05 / 0.09 / 0.14 / 0.22 / 0.32 / 0.48.

| Token | Use |
|-------|-----|
| `--lgui-border-1` | White border (on dark backgrounds) |
| `--lgui-border-2` | Subtle separator (list items, dividers) |
| `--lgui-border-3` | Default input/card border |
| `--lgui-border-4` | Medium emphasis border |
| `--lgui-border-5` | Strong border |
| `--lgui-border-6` | Maximum contrast border |

### Text

| Token | Light | Dark (Noir) | Use |
|-------|-------|-------------|-----|
| `--lgui-text-1` | `#FFFFFF` | `rgba(255,255,255,0.92)` | On dark/primary backgrounds |
| `--lgui-text-2` | `#A3A3A3` | `rgba(255,255,255,0.72)` | Placeholder text |
| `--lgui-text-3` | `#6B6B6B` | `rgba(255,255,255,0.60)` | Secondary / hint text (≥3:1 contrast) |
| `--lgui-text-4` | `#141414` | `#FFFFFF` | Primary body text |

---

## Layer 2 — Spacing & Sizing

### Spacing Scale

| Token | Value | Named alias | Use |
|-------|-------|-------------|-----|
| `--lgui-space-0` | `0.125rem` | — | Micro offsets |
| `--lgui-space-1` | `0.375rem` | `--lgui-gap-xs` | Icon gaps |
| `--lgui-space-2` | `0.5rem` | `--lgui-gap-sm`, `--lgui-pad-xs` | Tight padding |
| `--lgui-space-3` | `0.75rem` | `--lgui-gap-md`, `--lgui-pad-sm` | Default gap |
| `--lgui-space-4` | `1rem` | `--lgui-gap-lg`, `--lgui-pad-md` | Standard padding |
| `--lgui-space-5` | `1.5rem` | `--lgui-gap-xl`, `--lgui-pad-lg` | Section spacing |
| `--lgui-space-6` | `2rem` | `--lgui-pad-xl` | Large section gap |
| `--lgui-space-7` | `2.5rem` | — | |
| `--lgui-space-8` | `3rem` | — | |
| `--lgui-space-9` | `4rem` | — | Page-level padding |
| `--lgui-space-10` | `5rem` | — | |
| `--lgui-space-11` | `7.5rem` | — | Hero sections |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-radius-none` | `0` | Flat / flush |
| `--lgui-radius-xs` | `0.125rem` | Micro elements |
| `--lgui-radius-sm` | `0.25rem` | Buttons (compact) |
| `--lgui-radius-md` | `0.5rem` | Chips, tags, badges |
| `--lgui-radius-default` | `1rem` | Cards, modals, sheets |
| `--lgui-radius-lg` | `1.5rem` | Large cards |
| `--lgui-radius-xl` | `2rem` | Hero sections |
| `--lgui-radius-2xl` | `3rem` | Extra-large panels |
| `--lgui-radius-pill` | `12.5rem` | Fully-rounded badges, buttons |

### Shadows

| Token | Use |
|-------|-----|
| `--lgui-shadow-sm` | Subtle lift (list rows) |
| `--lgui-shadow-md` | Default card elevation |
| `--lgui-shadow-lg` | Modals, popovers |
| `--lgui-shadow-xl` | Primary card (ion-card default) |
| `--lgui-shadow-accent-sm` | Focused input, small accent glow |
| `--lgui-shadow-accent-md` | Active CTA button shadow |

---

## Layer 3 — Brand Palette

Dance/nightlife identity. Applied via Ionic's color system so all `ion-button`, `ion-chip`, `ion-badge`, etc. pick them up automatically.

| Role | Color | Value | Rationale |
|------|-------|-------|-----------|
| **Primary** | Hot pink | `#D91E5C` | Matches the VibraSBK logo gradient midpoint; energetic, dance-oriented; used for all primary CTAs |
| **Secondary** | Warm gold | `#F4A261` | Latin warmth; used for accents, highlights |
| **Tertiary** | Teal | `#2A9D8F` | Cool counterpoint; used sparingly |

Ionic color system variables for primary:
```css
--ion-color-primary:         #D91E5C;
--ion-color-primary-rgb:     217, 30, 92;
--ion-color-primary-shade:   #BF1A51;
--ion-color-primary-tint:    #DD356C;
--lgui-shadow-accent-sm: 0 0 0.125rem rgba(217, 30, 92, 0.28);
--lgui-shadow-accent-md: 0 0.25rem 0.5rem rgba(217, 30, 92, 0.22);
```

**When to use primary vs secondary:**
- `primary` → main actions (vote buttons, register, confirm)
- `secondary` → supporting actions, info chips, progress indicators
- `tertiary` → rarely — only when both primary and secondary are already present

---

## Layer 4 — App-Specific Tokens

### Vibe Colors

Map directly to the prediction engine's `Vibe` type.

| Token (dot) | Token (background) | Color | Status |
|------------|-------------------|-------|--------|
| `--vibe-quiet` | `--vibe-bg-quiet` | Grey `#BAC0CC` | `quiet` — quiet night |
| `--vibe-normal` | `--vibe-bg-normal` | Amber `#EFC42C` | `normal` — decent crowd |
| `--vibe-lively` | `--vibe-bg-lively` | Green `#4AD562` | `lively` — lively |
| `--vibe-packed` | `--vibe-bg-packed` | Red `#FE566B` | `packed` — packed |

Always use the `-bg-*` variant for backgrounds/chips and the base token for dots/icons.

### Event Type Colors

| Token (color) | Token (background) | Type |
|--------------|-------------------|------|
| `--type-social-color` `#4A90D9` | `--type-social-bg` `#E3EFFF` | Social |
| `--type-intensive-color` `#D07A2E` | `--type-intensive-bg` `#FFF3E6` | Intensive |
| `--type-congress-color` `#7B52AB` | `--type-congress-bg` `#F3EEFF` | Congress |

---

## Units — rem Scale

The app uses browser default `font-size: 16px`, so **1rem = 16px**.

```
16px  →  1rem
12px  →  0.75rem
24px  →  1.5rem
```

**Rules:**
- All sizes in component styles must use `rem` — never `px`
- Exception: `font-size: 10px` on `:root` itself (the base anchor)
- The conversion script `px-to-rem.js` at the repo root handles bulk migration

---

## Typography

**Font family:** Inter — `--ion-font-family`

The type scale follows LanguageGUI's Display/Body hierarchy but font weights and specific sizes are applied inline in components (no separate CSS classes). Guidelines:

Use `--lgui-fs-*` tokens for all font sizes, `--lgui-fw-*` for weights, and `--lgui-lh-*` for line-heights. Never hardcode numeric values.

| Token | Value | Role |
|-------|-------|------|
| `--lgui-fs-display` | `1.375rem` | Page-level question / hero heading |
| `--lgui-fs-heading` | `1.0625rem` | Section titles, venue names |
| `--lgui-fs-subheading` | `0.9375rem` | Card titles, subtitles |
| `--lgui-fs-body-lg` | `0.875rem` | Labels, prominent body text |
| `--lgui-fs-body` | `0.8125rem` | Primary body text |
| `--lgui-fs-caption` | `0.75rem` | Secondary / hint text |
| `--lgui-fs-micro` | `0.6875rem` | Chips, badges, smallest text |

| Token | Value | Role |
|-------|-------|------|
| `--lgui-fw-regular` | `300` | Light body text |
| `--lgui-fw-medium` | `400` | Default body / chips |
| `--lgui-fw-semibold` | `500` | Subheadings, field labels |
| `--lgui-fw-bold` | `600` | Headings, display text |

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-lh-tight` | `1.2` | Headings, display text |
| `--lgui-lh-snug` | `1.35` | Subheadings, labels |
| `--lgui-lh-normal` | `1.5` | Default body text (WCAG AA) |
| `--lgui-lh-relaxed` | `1.65` | Long-form reading |
| `--lgui-lh-loose` | `1.8` | Captions, helper text |

Decorative emoji sizes (3rem+) are the only accepted exception to the token rule — they are intentional one-offs.

---

---

## Layer 2 — Z-Index Scale

Define layering explicitly. Never use arbitrary values in components.

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-z-base` | `0` | Default document flow |
| `--lgui-z-raised` | `10` | Sticky elements, raised cards |
| `--lgui-z-dropdown` | `20` | Dropdowns, autocomplete |
| `--lgui-z-sticky` | `40` | Sticky headers, filter bars |
| `--lgui-z-overlay` | `100` | Modal backdrops, scrims |
| `--lgui-z-modal` | `200` | Modals, drawers, sheets |
| `--lgui-z-toast` | `400` | Toasts, snackbars |
| `--lgui-z-tooltip` | `800` | Tooltips, popovers |

---

## Layer 2 — Animation Tokens

All motion must use these tokens so the app feels consistent.

### Durations

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-duration-instant` | `80ms` | Press feedback (opacity/scale) |
| `--lgui-duration-fast` | `150ms` | State changes, chip toggles |
| `--lgui-duration-normal` | `220ms` | Micro-interactions (default) |
| `--lgui-duration-moderate` | `300ms` | Page elements entering/exiting |
| `--lgui-duration-slow` | `400ms` | Complex transitions, sheets |

### Easing

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Exiting elements |
| `--lgui-ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Entering elements |
| `--lgui-ease-inout` | `cubic-bezier(0.4, 0, 0.2, 1)` | State changes (default) |
| `--lgui-ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful / elastic (chip toggles, theme swatches) |

### Shorthands

```css
/* Enter */
transition: transform var(--lgui-duration-normal) var(--lgui-ease-out);
/* Exit */
transition: transform var(--lgui-duration-fast) var(--lgui-ease-in);
/* State change */
transition: color var(--lgui-transition-fast);
```

**Rules:**
- Always include `@media (prefers-reduced-motion: reduce)` to disable or reduce animations
- Animate only `transform` and `opacity` — never `width`, `height`, `top`, or `left`
- Press/tap feedback must be ≤80ms to feel instantaneous

---

## Layer 2 — Focus & Interaction

Accessibility-critical tokens (WCAG 2.4.7 — Focus Visible).

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-focus-ring` | `0 0 0 3px rgba(217,30,92,0.55)` | Keyboard focus ring (primary-tinted) |
| `--lgui-focus-ring-inset` | `inset 0 0 0 2px rgba(217,30,92,0.55)` | Inset variant for inputs |
| `--lgui-scrim` | `rgba(0,0,0,0.48)` | Modal backdrop (WCAG-safe 48%) |
| `--lgui-scrim-heavy` | `rgba(0,0,0,0.64)` | Action sheets, full-screen overlays |

```css
/* ✅ Use :focus-visible (keyboard only — not mouse) */
*:focus-visible { box-shadow: var(--lgui-focus-ring); }
```

---

## Layer 3 — Brand Gradients

Derived from the VibraSBK logo gradient (E52030 → D91E5C → D41870).

| Token | Value | Use |
|-------|-------|-----|
| `--vibe-gradient-primary` | `linear-gradient(135deg, #E52030, #D91E5C, #D41870)` | Primary CTA backgrounds, hero accents |
| `--vibe-gradient-warm` | `linear-gradient(135deg, #D91E5C, #F4A261)` | Secondary highlights |
| `--vibe-gradient-cool` | `linear-gradient(135deg, #D91E5C, #2A9D8F)` | Contrast accent (use sparingly) |

---

## Theme System

7 dark themes selectable by the user, applied via `data-theme` on `<html>`. Managed by `ThemeService`.

| Theme | Mood | Surface 2 (BG) |
|-------|------|----------------|
| `noir` | True black | `#0F0F0F` |
| `purple` | Midnight violet | `#0D0B1A` |
| `warm` | Charcoal amber | `#100E09` |
| `crimson` | Deep red underground | `#150808` |
| `electric` | Cobalt midnight | `#060810` |
| `emerald` | Dark Havana | `#070F08` |
| `copper` | Vintage jazz bar | `#0E0A05` |

**Rules:**
- All named themes fully remap `--lgui-surface-*`, `--lgui-border-*`, `--lgui-text-*`, shadows, and vibe/type backgrounds
- Brand colors (`--ion-color-primary`, secondary, tertiary) do **not** change per theme — they are fixed brand identity
- Automatic dark mode fallback (`@media (prefers-color-scheme: dark)`) uses Noir values when no `data-theme` is set
- `ThemeService` persists the selection to `localStorage` and restores it on startup via `app.component.ts`

---

## Dark Mode

Dark mode is automatic via `@media (prefers-color-scheme: dark)`. All Layer 2 semantic tokens remap — components using `--lgui-surface-*`, `--lgui-border-*`, and `--lgui-text-*` get dark mode for free.

**Rules:**
- Never hardcode `#FFFFFF` or `#19213D` in components — use `--lgui-text-1`/`--lgui-text-4`
- Never hardcode background colors — use `--lgui-surface-*`
- Brand colors (`--ion-color-primary`, `--ion-color-secondary`) do not change in dark mode by design
- **Inline Angular `[style.background]` / `[style.color]` bindings must use CSS variable strings** — not hex values. Hardcoded hex bypasses the `@media (prefers-color-scheme: dark)` cascade and breaks dark mode.

```typescript
// ✅ Dark-mode safe — CSS variable string
[style.background]="'var(--vibe-bg-quiet)'"
[style.color]="'var(--type-social-color)'"

// ❌ Breaks dark mode — hardcoded hex
[style.background]="'#BAC0CC'"
[style.color]="'#4A90D9'"
```

This applies to all computed color maps in components (e.g. `VIBE_BG`, `VIBE_HEX`, `TYPE_DOT_COLOR`). Use `Record<string, string>` with `'var(--token-name)'` values.

---

## Usage Rules

1. **Use semantic tokens in components** (`--lgui-surface-*`, `--lgui-text-*`) — never raw hex values
2. **Use core tokens only** when building new semantic token aliases — not directly in component styles
3. **Use app tokens** (`--vibe-*`, `--type-*`) only for domain-specific UI elements
4. **Spacing:** prefer named gap/pad aliases (`--lgui-gap-md`, `--lgui-pad-lg`) over raw space tokens
5. **New components** should follow the existing pattern in `event-card` and `analytics-panel` as reference implementations

---

## Global CSS Classes (`styles.scss`)

Patterns that are purely visual (no Angular logic) live as global classes in `styles.scss`. Using them globally means a single change fixes every page at once. Never redefine these locally in a component's `styles: [...]`.

| Class | Purpose | Key properties |
|-------|---------|----------------|
| `.breadcrumb` | Page title in toolbar start slot | `font-size: 1.25rem`, bold, `--lgui-text-4` |
| `.section-title` | Uppercase label above a content group | `fs-micro`, bold, uppercase, `letter-spacing: 0.0375rem`, `--lgui-text-3` |
| `.field-label` | Label above an individual form input | `fs-caption`, semibold, uppercase, `letter-spacing: 0.0313rem`, `--lgui-text-3` |
| `.form-list` | `ion-list` wrapper for inputs | `border-radius: 0.625rem`, `overflow: hidden`, `margin-bottom: --lgui-gap-lg` |
| `.loading-container` | Centered spinner placeholder | flex, centered, `padding: --lgui-space-9 0` |
| `.empty-state` | No-data placeholder wrapper | flex column, centered, `padding: --lgui-space-10 --lgui-space-6` |
| `.empty-state .empty-icon` | Emoji / icon inside empty state | `font-size: 3.5rem` |
| `.empty-state .empty-title` | Primary text of empty state | `fs-heading`, semibold, `--lgui-text-4` |
| `.empty-state .empty-subtitle` | Secondary text of empty state | `fs-body-lg`, `--lgui-text-3`, `line-height: 1.6` |

### Usage example

```html
<!-- Loading -->
<div *ngIf="loading" class="loading-container">
  <ion-spinner color="primary"></ion-spinner>
</div>

<!-- Empty -->
<div *ngIf="items.length === 0" class="empty-state">
  <div class="empty-icon">🎵</div>
  <div class="empty-title">Sin eventos esta semana</div>
  <div class="empty-subtitle">Vuelve pronto.</div>
</div>

<!-- Form field -->
<div class="field-label">Email</div>
<ion-list lines="none" class="form-list">
  <ion-item><ion-input ...></ion-input></ion-item>
</ion-list>
```

---

## Shared Components (`app/components/`)

Components live here when a pattern repeats **template + logic** together across two or more pages. Reference implementations: `event-card`, `analytics-panel`.

### `<app-form-field>`

File: `components/form-field/form-field.component.ts`

Wraps the `.field-label` + `.form-list` + `ion-item` shell. Use `ng-content` to project any `ion-input` or `ion-select` inside.

```html
<app-form-field label="Email">
  <ion-input type="email" [(ngModel)]="email" placeholder="tu@email.com"></ion-input>
</app-form-field>

<app-form-field label="Academia (opcional)">
  <ion-select [(ngModel)]="academyId" interface="action-sheet">
    <ion-select-option *ngFor="let a of academias" [value]="a.id">{{ a.name }}</ion-select-option>
  </ion-select>
</app-form-field>
```

**Note:** Admin modals (`event-form`, `venue-form`) use the modern `labelPlacement="stacked"` pattern directly on `ion-input`/`ion-select` — that approach is also acceptable for admin-only forms where layout is denser.

### `<app-style-chip-grid>`

File: `components/style-chip-grid/style-chip-grid.component.ts`

Multi-select chip grid for dance styles. Owns the toggle logic so pages don't repeat it.

```html
<app-style-chip-grid
  [styles]="styleOptions"
  [selected]="selectedStyles"
  [loading]="loadingStyles"
  (selectionChange)="selectedStyles = $event">
</app-style-chip-grid>
```

| Input / Output | Type | Description |
|---|---|---|
| `[styles]` | `DanceStyle[]` | Full list of available styles |
| `[selected]` | `string[]` | Currently selected slugs |
| `[loading]` | `boolean` | Shows spinner instead of chips |
| `(selectionChange)` | `EventEmitter<string[]>` | Emits updated selection on toggle |
