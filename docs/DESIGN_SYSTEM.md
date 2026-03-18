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

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--lgui-surface-1` | `#FFFFFF` | `#1E2336` | Cards, dialogs, modals |
| `--lgui-surface-2` | `#F7F8FA` | `#161B2C` | Page background |
| `--lgui-surface-3` | `#F0F2F5` | `#262D44` | Hover / pressed state |
| `--lgui-surface-4` | `#BAC0CC` | `#2F3754` | Disabled fills |
| `--lgui-surface-5` | `#666F8D` | `#394265` | Subtle fills |
| `--lgui-surface-6` | `#353E5C` | `#464E72` | Dark fills |
| `--lgui-surface-7` | `#19213D` | `#50587C` | Darkest fills |

### Borders

| Token | Use |
|-------|-----|
| `--lgui-border-1` | White border (on dark backgrounds) |
| `--lgui-border-2` | Subtle separator (list items, dividers) |
| `--lgui-border-3` | Default input/card border |
| `--lgui-border-4` | Medium emphasis border |
| `--lgui-border-5` | Strong border |
| `--lgui-border-6` | Maximum contrast border |

### Text

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--lgui-text-1` | `#FFFFFF` | `rgba(255,255,255,0.92)` | On dark/primary backgrounds |
| `--lgui-text-2` | `#BAC0CC` | `rgba(255,255,255,0.50)` | Placeholder text |
| `--lgui-text-3` | `#666F8D` | `rgba(255,255,255,0.38)` | Secondary / hint text |
| `--lgui-text-4` | `#19213D` | `#FFFFFF` | Primary body text |

---

## Layer 2 — Spacing & Sizing

### Spacing Scale

| Token | Value | Named alias | Use |
|-------|-------|-------------|-----|
| `--lgui-space-0` | `0.2rem` | — | Micro offsets |
| `--lgui-space-1` | `0.6rem` | `--lgui-gap-xs` | Icon gaps |
| `--lgui-space-2` | `0.8rem` | `--lgui-gap-sm`, `--lgui-pad-xs` | Tight padding |
| `--lgui-space-3` | `1.2rem` | `--lgui-gap-md`, `--lgui-pad-sm` | Default gap |
| `--lgui-space-4` | `1.6rem` | `--lgui-gap-lg`, `--lgui-pad-md` | Standard padding |
| `--lgui-space-5` | `2.4rem` | `--lgui-gap-xl`, `--lgui-pad-lg` | Section spacing |
| `--lgui-space-6` | `3.2rem` | `--lgui-pad-xl` | Large section gap |
| `--lgui-space-7` | `4rem` | — | |
| `--lgui-space-8` | `4.8rem` | — | |
| `--lgui-space-9` | `6.4rem` | — | Page-level padding |
| `--lgui-space-10` | `8rem` | — | |
| `--lgui-space-11` | `12rem` | — | Hero sections |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-radius-none` | `0` | Flat / flush |
| `--lgui-radius-xs` | `0.2rem` | Micro elements |
| `--lgui-radius-sm` | `0.4rem` | Buttons (compact) |
| `--lgui-radius-md` | `0.8rem` | Chips, tags, badges |
| `--lgui-radius-default` | `1.6rem` | Cards, modals, sheets |
| `--lgui-radius-lg` | `2.4rem` | Large cards |
| `--lgui-radius-xl` | `3.2rem` | Hero sections |
| `--lgui-radius-2xl` | `4.8rem` | Extra-large panels |
| `--lgui-radius-pill` | `20rem` | Fully-rounded badges, buttons |

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
| **Primary** | Coral rose | `#E84855` | Energetic, dance-oriented; used for all primary CTAs |
| **Secondary** | Warm gold | `#F4A261` | Latin warmth; used for accents, highlights |
| **Tertiary** | Teal | `#2A9D8F` | Cool counterpoint; used sparingly |

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

`:root` has `font-size: 10px`, so **1rem = 10px**. This makes px → rem trivial: divide by 10.

```
16px  →  1.6rem
12px  →  1.2rem
24px  →  2.4rem
```

**Rules:**
- All sizes in component styles must use `rem` — never `px`
- Exception: `font-size: 10px` on `:root` itself (the base anchor)
- The conversion script `px-to-rem.js` at the repo root handles bulk migration

---

## Typography

**Font family:** Inter — `--ion-font-family`

The type scale follows LanguageGUI's Display/Body hierarchy but font weights and specific sizes are applied inline in components (no separate CSS classes). Guidelines:

Use `--lgui-fs-*` tokens for all font sizes and `--lgui-fw-*` tokens for all font weights. Never hardcode numeric values.

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
| `--lgui-fw-regular` | `400` | Body text |
| `--lgui-fw-medium` | `500` | Chips, secondary labels |
| `--lgui-fw-semibold` | `600` | Subheadings, field labels |
| `--lgui-fw-bold` | `700` | Headings, display text |

Decorative emoji sizes (3rem+) are the only accepted exception to the token rule — they are intentional one-offs.

---

## Dark Mode

Dark mode is automatic via `@media (prefers-color-scheme: dark)`. All Layer 2 semantic tokens remap — components using `--lgui-surface-*`, `--lgui-border-*`, and `--lgui-text-*` get dark mode for free.

**Rules:**
- Never hardcode `#FFFFFF` or `#19213D` in components — use `--lgui-text-1`/`--lgui-text-4`
- Never hardcode background colors — use `--lgui-surface-*`
- Brand colors (`--ion-color-primary`, `--ion-color-secondary`) do not change in dark mode by design

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
