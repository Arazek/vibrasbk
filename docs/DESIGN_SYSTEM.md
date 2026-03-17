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
Layer 4 — App          --ambiente-*        Domain-specific status colors
                       --tipo-*
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
| `--lgui-space-0` | `2px` | — | Micro offsets |
| `--lgui-space-1` | `6px` | `--lgui-gap-xs` | Icon gaps |
| `--lgui-space-2` | `8px` | `--lgui-gap-sm`, `--lgui-pad-xs` | Tight padding |
| `--lgui-space-3` | `12px` | `--lgui-gap-md`, `--lgui-pad-sm` | Default gap |
| `--lgui-space-4` | `16px` | `--lgui-gap-lg`, `--lgui-pad-md` | Standard padding |
| `--lgui-space-5` | `24px` | `--lgui-gap-xl`, `--lgui-pad-lg` | Section spacing |
| `--lgui-space-6` | `32px` | `--lgui-pad-xl` | Large section gap |
| `--lgui-space-7` | `40px` | — | |
| `--lgui-space-8` | `48px` | — | |
| `--lgui-space-9` | `64px` | — | Page-level padding |
| `--lgui-space-10` | `80px` | — | |
| `--lgui-space-11` | `120px` | — | Hero sections |

### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--lgui-radius-none` | `0` | Flat / flush |
| `--lgui-radius-xs` | `2px` | Micro elements |
| `--lgui-radius-sm` | `4px` | Buttons (compact) |
| `--lgui-radius-md` | `8px` | Chips, tags, badges |
| `--lgui-radius-default` | `16px` | Cards, modals, sheets |
| `--lgui-radius-lg` | `24px` | Large cards |
| `--lgui-radius-xl` | `32px` | Hero sections |
| `--lgui-radius-2xl` | `48px` | Extra-large panels |
| `--lgui-radius-pill` | `200px` | Fully-rounded badges, buttons |

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

### Ambiente Colors

Map directly to the prediction engine's `Ambiente` type.

| Token (dot) | Token (background) | Color | Estado |
|------------|-------------------|-------|--------|
| `--ambiente-flojo` | `--ambiente-bg-flojo` | Grey `#BAC0CC` | `flojo` — quiet night |
| `--ambiente-normal` | `--ambiente-bg-normal` | Amber `#EFC42C` | `normal` — decent crowd |
| `--ambiente-animado` | `--ambiente-bg-animado` | Green `#4AD562` | `animado` — lively |
| `--ambiente-muy-lleno` | `--ambiente-bg-muy-lleno` | Red `#FE566B` | `muy_lleno` — packed |

Always use the `-bg-*` variant for backgrounds/chips and the base token for dots/icons.

### Event Type Colors

| Token (color) | Token (background) | Tipo |
|--------------|-------------------|------|
| `--tipo-social-color` `#4A90D9` | `--tipo-social-bg` `#E3EFFF` | Social |
| `--tipo-taller-color` `#D07A2E` | `--tipo-taller-bg` `#FFF3E6` | Intensivo / Taller |
| `--tipo-congreso-color` `#7B52AB` | `--tipo-congreso-bg` `#F3EEFF` | Congreso |

---

## Typography

**Font family:** Inter — `--ion-font-family`

The type scale follows LanguageGUI's Display/Body hierarchy but font weights and specific sizes are applied inline in components (no separate CSS classes). Guidelines:

| Role | Size | Weight |
|------|------|--------|
| Page title | 20–24px | 700 |
| Section heading | 16–18px | 600 |
| Body / label | 14–15px | 400–500 |
| Caption / hint | 12–13px | 400 |
| Chip / badge | 11–12px | 600 |

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
3. **Use app tokens** (`--ambiente-*`, `--tipo-*`) only for domain-specific UI elements
4. **Spacing:** prefer named gap/pad aliases (`--lgui-gap-md`, `--lgui-pad-lg`) over raw space tokens
5. **New components** should follow the existing pattern in `event-card` and `analytics-panel` as reference implementations
