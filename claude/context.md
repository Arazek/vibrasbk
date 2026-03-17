# Implementation Context

> Session log for the Social Predictor MVP.

---

## COMPLETED — Phase 1: Backend Foundation

All 7 steps finished. TypeScript type-check passes with zero errors.

### Step 1 — User entity rewritten
**File:** `apps/api/src/modules/users/entities/user.entity.ts`

Old generic user (email, avatar, bio…) replaced with domain model:
- `alias` (unique, not null)
- `ciudad` (default 'Cartagena')
- `rol` — enum: `leader | follower | switch`
- `nivel` — enum: `nuevo | iniciacion | social_comodo | intermedio | avanzado`
- `estilos` — `simple-array` of enum values
- `academia` (nullable)
- `fcmToken` (nullable, for push notifications)

Enums `Rol`, `Nivel`, `Estilo` are exported from this file and imported by other modules.

---

### Step 2 — Venues module created
**Files:**
- `apps/api/src/modules/venues/entities/venue.entity.ts`
- `apps/api/src/modules/venues/venues.service.ts`
- `apps/api/src/modules/venues/venues.controller.ts`
- `apps/api/src/modules/venues/venues.module.ts`

`VenuesService` implements `OnApplicationBootstrap` and seeds the 6 Cartagena venues on first boot if the table is empty.

**Endpoint:** `GET /api/venues`

---

### Step 3 — Events module created
**Files:**
- `apps/api/src/modules/events/entities/recurring-event.entity.ts`
- `apps/api/src/modules/events/events.service.ts`
- `apps/api/src/modules/events/events.controller.ts`
- `apps/api/src/modules/events/events.module.ts`

Key design: events are **not stored per-occurrence** — `RecurringEvent` stores `diaSemana` (0=Mon…6=Sun) and `horaInicio` (HH:MM). `EventsService.getWeeklyEvents()` projects them dynamically to the current ISO week.

**Endpoints:**
- `GET /api/events/week` — current week's events
- `GET /api/events/:id` — single event

---

### Step 4 — Auth rewritten (alias-based, no Google OAuth)
**Files modified:**
- `apps/api/src/modules/auth/auth.service.ts`
- `apps/api/src/modules/auth/auth.controller.ts`
- `apps/api/src/modules/auth/dtos/register.dto.ts`

Google OAuth completely removed. New flow:
- `POST /api/auth/register` — creates user from onboarding payload, returns JWT
- `POST /api/auth/login` — accepts `{ alias }`, returns JWT (MVP: no password)

JWT payload: `{ sub: user.id, alias: user.alias }`

---

### Step 5 — Users module updated
**Files modified:**
- `apps/api/src/modules/users/users.service.ts`
- `apps/api/src/modules/users/users.controller.ts`
- `apps/api/src/modules/users/dtos/update-user.dto.ts`

`findByEmail` removed, `findByAlias` added.
`UpdateUserDto` now only allows: `nivel`, `estilos`, `academia`, `fcmToken`.

**Endpoints:**
- `GET /api/users/profile`
- `PATCH /api/users/profile`

---

### Step 6 — app.module.ts updated
Removed: `ChatModule`, `CalendarModule`. Added: `VenuesModule`, `EventsModule`.

---

### Step 7 — Shared types rewritten
**File:** `libs/shared-types/src/index.ts`

All old interfaces replaced with new domain types:
`UserProfile`, `Venue`, `WeeklyEvent`, `EventAnalytics`, `IntentionVote`, `AuthResponse`
Plus type aliases: `Rol`, `Nivel`, `Estilo`, `VoteEstado`, `Ambiente`

---

## COMPLETED — Phase 2: Votes + Prediction API

### Step 8 — Three vote entities
- `intention-vote.entity.ts` — `@Unique(['userId', 'eventId', 'semanaIso'])`, estado enum: `voy | tal_vez | no_voy`
- `attendance-verification.entity.ts` — `asistio: boolean | null`
- `reliability-metric.entity.ts` — `fiabilidad = asistenciasConfirmadas / max(1, votosVoyTotal)`

### Step 9 — PredictionService
Pure calculation service. Implements 4 spec rules:
- `estimateAttendance`, `classifyAmbiente`, `getRoleBalance`, `getNivelMedio`, `predict`

### Step 10 — VotesService + Controller + Module
**Endpoints:**
- `POST /api/votes` — cast vote
- `PATCH /api/votes/:id` — change vote
- `POST /api/votes/verify` — submit attendance answer

### Steps 11 & 12 — Enriched events + analytics endpoint
`getWeeklyEvents(userId)` now merges `ambienteColor`, `userVote`, `totalInteresados` onto each event.
Added `GET /api/events/:id/analytics`.

---

## COMPLETED — Phase 3: Scheduler + Push Notifications

### Step 12 — `@nestjs/schedule` installed
### Step 13 — SchedulerModule created

Two `@Cron` jobs:
| Schedule | What it does |
|---|---|
| `0 11 * * *` | Creates pending verifications + sends FCM push |
| `5 11 * * *` | Closes timed-out verifications, updates reliability |

### Step 14 — Wired into app.module.ts

---

## COMPLETED — Phase 4: Frontend

### New files created
| File | Purpose |
|---|---|
| `services/onboarding-state.service.ts` | In-memory store for 4-step onboarding |
| `services/auth.service.ts` | `register()` / `login()` → stores JWT in localStorage |
| `services/events.service.ts` | `getWeeklyEvents()`, `getEventDetail()`, `getAnalytics()` |
| `services/votes.service.ts` | `castVote()`, `updateVote()`, `verifyAttendance()` |
| `services/profile.service.ts` | `getProfile()`, `updateProfile()` |
| `interceptors/auth.interceptor.ts` | Attaches `Authorization: Bearer` header |
| `guards/auth.guard.ts` | Redirects to `/onboarding/ciudad` if no token |
| `guards/onboarding.guard.ts` | Redirects to `/home` if already authenticated |
| `components/event-card/event-card.component.ts` | Card with venue name, time, ambiente, vote badge |
| `components/analytics-panel/analytics-panel.component.ts` | Ambiente badge, role balance, nivel bars |
| `pages/onboarding/ciudad/` | Step 1 — city selection |
| `pages/onboarding/rol/` | Step 2 — Leader/Follower/Switch |
| `pages/onboarding/nivel/` | Step 3 — nivel radio list |
| `pages/onboarding/estilos/` | Step 4 — multi-select chips + alias → register |
| `pages/event-detail/event-detail.page.ts` | Vote buttons + analytics panel |

### Phase 5 — Cleanup items
- `pipes/replace.pipe.ts` — `ReplacePipe` created (replaces `_` with space in templates)
- Deleted: `pages/chat/`, `pages/calendar/`, `modules/auth/` from frontend

---

## Post-Launch Bug Fixes (Session 2)

### Fix 1 — `@shared/types` path alias
Added `"@shared/types": ["libs/shared-types/src/index.ts"]` to `tsconfig.base.json`.

### Fix 2 — `FormsModule` missing in onboarding-nivel
Added `FormsModule` to `imports[]` in `onboarding-nivel.page.ts`.

### Phase 6 — Bottom tab navigation
- Created `pages/tabs/tabs.page.ts` — two tabs: Agenda + Perfil
- Restructured routes in `app.routes.ts`

### Fix 3 — `GET /api/events/:id` not enriched
`getEventDetail(id, userId)` now calls `getAggregatesForEvents` like `getWeeklyEvents`.

### Fix 4 — `updateVote` used wrong ID
Added `userVoteId` to `WeeklyEvent` shared type. `event-detail.page.ts` now uses `event.userVoteId` instead of `event.id`.

---

## Session 3 — Bug Fixes & Admin Panel

### Fix 5 — TypeORM schema sync failure (`tipo` column NOT NULL)
**File:** `apps/api/src/modules/events/entities/recurring-event.entity.ts`
Added explicit `@Column({ name: 'tipo', nullable: true })` to `RecurringEvent` entity.
Root cause: TypeORM STI discriminator column had existing null rows in DB.

### Fix 6 — `crypto is not defined` on Node 18
**File created:** `apps/api/src/polyfills.ts`
```ts
if (!globalThis.crypto) {
  (globalThis as any).crypto = require('crypto').webcrypto;
}
```
**File modified:** `apps/api/src/main.ts` — `import './polyfills'` added as first import.
Root cause: `@nestjs/schedule` uses `crypto.randomUUID()` which is not auto-injected in Node 18.

### Fix 7 — ValidationPipe rejecting `rol` and `nivel` fields on register
**File:** `apps/api/src/modules/auth/dtos/register.dto.ts`
Added `@IsString()` decorator to `rol` and `nivel` fields.
Root cause: `ValidationPipe` with `forbidNonWhitelisted: true` silently strips undecorated properties.

### Fix 8 — Logout not clearing auth state
**File:** `apps/mobile-app/src/app/services/auth.service.ts`
`logout()` now calls `localStorage.clear()` instead of `localStorage.removeItem('token')`.

### Fix 9 — Logout button added to profile
**File:** `apps/mobile-app/src/app/pages/profile/profile.page.ts`
Added red "Cerrar sesión" button at bottom of profile page with `AlertController` confirmation dialog.

---

## Admin Panel (Session 3)

### Problem — `ion-modal [isOpen]` + `ng-template` pattern doesn't render in Ionic 7
Removed all `ng-template` wrappers. Rewrote admin pages to use `ModalController.create({ component, componentProps })` pattern with dedicated standalone modal component files.

### New files created
| File | Purpose |
|---|---|
| `pages/admin/admin-home.page.ts` | Admin panel home — lists Eventos / Locales |
| `pages/admin/admin-venues.page.ts` | Venue CRUD list |
| `pages/admin/admin-events.page.ts` | Event CRUD list |
| `pages/admin/venue-form.modal.ts` | Standalone modal for venue create/edit |
| `pages/admin/event-form.modal.ts` | Standalone modal for event create/edit |
| `services/admin.service.ts` | `createVenue`, `updateVenue`, `deleteVenue`, `createEvent`, `updateEvent`, `deleteEvent` |
| `guards/admin.guard.ts` | Redirects to `/tabs/home` if `rol !== 'admin'` |

### Admin routes (added to `app.routes.ts`)
```
/admin           → AdminHomePage   (canActivate: adminGuard)
/admin/events    → AdminEventsPage
/admin/venues    → AdminVenuesPage
```

### Admin user created
```bash
curl -X POST http://localhost:3333/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"alias":"admin","ciudad":"Cartagena","rol":"admin","nivel":"social_comodo","estilos":["salsa"]}'
```

### `diaSemana` added to shared types
**File:** `libs/shared-types/src/index.ts`
Added `diaSemana?: number` to `WeeklyEvent` interface.

---

## UX Improvements (Session 3 cont.)

### Location field — Google Maps link instead of lat/lng inputs
**File:** `pages/admin/venue-form.modal.ts`

Replaced two separate `Latitud` / `Longitud` number inputs with a single "Enlace Google Maps" text field.
Auto-extracts coordinates from pasted URL via regex patterns:
- `/@(-?\d+\.\d+),(-?\d+\.\d+)/` — standard Maps share URL
- `/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/` — `?q=lat,lng` format
- `/destination=(-?\d+\.\d+),(-?\d+\.\d+)/` — directions URL

Shows feedback:
- ✅ Green — coordinates extracted successfully
- ⚠️ Warning — shortened `goo.gl` link detected (can't resolve without HTTP)
- ❌ Red — no coordinates found, prompts user to use full link

### Back navigation — all admin screens
**Root cause:** `ion-back-button` is hidden by Ionic when there is no navigation stack history (admin lives outside the `tabs` outlet). Fixed by using `NavController.navigateBack()` with explicit `ion-button` components.

| Screen | Button label | Destination |
|---|---|---|
| `admin-home.page.ts` | `‹ Perfil` | `/tabs/profile` |
| `admin-venues.page.ts` | `‹ Admin` | `/admin` |
| `admin-events.page.ts` | `‹ Admin` | `/admin` |

**Implementation pattern used in all 3 files:**
```ts
// Import
import { NavController } from '@ionic/angular/standalone';

// Template
<ion-buttons slot="start">
  <ion-button (click)="goBack()">
    <ion-icon slot="start" name="chevron-back"></ion-icon>
    Admin
  </ion-button>
</ion-buttons>

// Method
goBack() { this.navCtrl.navigateBack('/admin'); }
```

### Date/time visibility fix
**Root cause:** Several elements used `--lgui-text-3` (`#666F8D`) — a muted grey that's nearly invisible on light backgrounds. Also, `ion-content` inside modals with `color="primary"` toolbar was inheriting white text color.

| File | Element | Fix |
|---|---|---|
| `home.page.ts` | `.day-header` (section date) | `--lgui-text-3` → `--lgui-text-4` (`#19213D`) |
| `event-card.component.ts` | `.event-time` (event time) | `--lgui-text-3` → `--lgui-text-4` |
| `event-detail.page.ts` | `.event-when` (day · time) | `--lgui-text-3` → `--lgui-text-4` |
| `event-form.modal.ts` | `ion-content`, `ion-input`, `ion-select` | Added explicit `--color` and `--background` CSS reset |
| `venue-form.modal.ts` | `ion-content`, `ion-input` | Same fix |

---

## Session 4 — Sprint 2 Gap Closure (02-03-2026)

### Gap 1 — Role mini-bar in EventCard

**Problem:** CSS `.role-mini-bar` was defined in `event-card.component.ts` but never rendered. `WeeklyEvent` had no `roleBalance` field — that data only existed in `EventAnalytics`.

**Fix (3 files):**

| File | Change |
|---|---|
| `apps/api/src/modules/votes/votes.service.ts` | Added `roleBalance: RoleBalanceDetail` to `EventAggregate` interface; calls `predictionService.getRoleBalance(voterData)` inside `getAggregatesForEvents()` |
| `libs/shared-types/src/index.ts` | Added `roleBalance?: RoleBalanceDetail` to `WeeklyEvent` interface |
| `apps/mobile-app/src/app/components/event-card/event-card.component.ts` | Renders `<div class="role-mini-bar">` with `[style.flex]` bound to `leadersPercent / followersPercent / switchesPercent`; guarded by `*ngIf="hasRoleData"` (only shows when there are votes) |

**Bug fixed:** Both fallback objects in `events.service.ts` (`getEventDetail` and `getWeeklyEvents`) were missing `roleBalance` — TypeScript compile error prevented API from starting. Added default `{ leadersPercent: 0, followersPercent: 0, switchesPercent: 0, balance: 'equilibrado' }` to both.

---

### Gap 2 — Photo upload UI in admin events

**Problem:** `POST /api/events/:id/photo` endpoint and `AdminService.uploadEventPhoto()` both existed but there was no UI to trigger them.

**Fix (1 file):**

**`apps/mobile-app/src/app/pages/admin/admin-events.page.ts`**
- Added `@ViewChild('photoInput') photoInput: ElementRef<HTMLInputElement>`
- Added hidden `<input #photoInput type="file" accept="image/*">` in template
- Added camera button per event row (alongside existing pencil/trash)
- `openPhotoUpload(ev)` — stores `selectedEventId`, triggers `.click()` on hidden input
- `onPhotoSelected(event)` — reads `File`, calls `adminService.uploadEventPhoto()`, refreshes list, clears input value (allows re-uploading same file)

---

---

## Session 5 — FR 02-03-2026 (Dark Theme, Navbar, Calendar)

**Date:** 2026-03-02

### Feature 1 — Dark Theme

**`apps/mobile-app/src/theme/variables.css`**
- Added `@media (prefers-color-scheme: dark)` block at end of file
- Overrides all `--lgui-surface-*`, `--lgui-border-*`, `--lgui-text-*` tokens to dark navy palette
- Ionic overrides: `--ion-background-color: #161B2C`, `--ion-card-background: #1E2336`, `--ion-tab-bar-background: #1E2336`
- Toolbar stays coral: `--ion-toolbar-background: #E84855`
- Darker ambiente/tipo backgrounds (flojo, animado, lleno, taller, congreso)

### Feature 2 — Home Navbar

**`apps/mobile-app/src/app/pages/home/home.page.ts`**
- Replaced plain `<ion-title>` header with:
  - `slot="start"`: brand-slot div → `<ion-icon name="musical-notes">` + `<span class="brand-name">Predictor</span>`
  - `slot="end"`: calendar icon button calling `openCalendar()`
- Added `addIcons({ musicalNotes, calendar })` in constructor
- Added `.brand-slot`, `.brand-icon`, `.brand-name` CSS styles
- Added `openCalendar()` → `this.router.navigate(['/calendar'])`
- Added `IonButtons, IonButton, IonIcon` to standalone `imports`

### Feature 3 — Route `/calendar`

**`apps/mobile-app/src/app/app.routes.ts`**
- Added route `{ path: 'calendar', canActivate: [authGuard], loadComponent: () => import('./pages/calendar/calendar.page').then(m => m.CalendarPage) }`

### Feature 4 — Calendar Page (new)

**`apps/mobile-app/src/app/pages/calendar/calendar.page.ts`** — NEW FILE
- Monthly Google Calendar-style grid (6 weeks × 7 cols = 42 cells max; trailing all-out-of-month rows trimmed to 35)
- Reuses `EventsService.getWeeklyEvents()` — no new API endpoint needed
- Events projected by `diaSemana` (0=Mon…6=Sun): each recurring event appears on every matching weekday in any month
- Colored dots per tipo: social=#4A90D9, taller=#D07A2E, congreso=#7B52AB (max 3, deduplicated)
- Today: grey circle background; Selected: coral (primary) circle
- Click day → `selectedEvents` list below grid via `EventCardComponent` (photos included automatically)
- Month navigation: prev/next buttons rebuild the grid
- Back nav: `NavController.navigateBack('/tabs/home')`

---

## Architecture Notes

- **NX package installs**: Always install at workspace root (`npm install <pkg>`), NOT `--prefix apps/api`. NX resolves all imports from root `node_modules`.
- **Node version**: API requires **v18** (`nvm use 18`). Frontend dev server runs on Node v22.
- **TypeORM `synchronize: true`** in dev — no migrations needed.
- **Seed strategy**: `OnApplicationBootstrap` in VenuesService and EventsService — runs once if table is empty.
- **JWT guard** — `JwtAuthGuard` is NOT global; applied per-controller. Public endpoints use `@Public()`.
- **`simple-array` TypeORM type** — `estilos` stored as CSV in a text column.
- **Reliability default** — new users default to `fiabilidad = 1.0` (no metric row = full trust).
- **`ion-back-button` limitation** — only renders when Ionic has navigation stack history. Always use `NavController.navigateBack()` + explicit `ion-button` for pages outside the tabs outlet.
- **Modal pattern** — `ion-modal [isOpen]` + `ng-template` does NOT work in Ionic 7 standalone. Always use `ModalController.create({ component, componentProps })`.

## Running the app

```bash
# Start API (Node 18)
nvm use 18
npm run start:dev --prefix apps/api > /tmp/api.log 2>&1 &

# Start frontend (Node 22)
nvm use 22
npx nx serve mobile-app
```

API runs on port **3333**, frontend on port **4200**.
