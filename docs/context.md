# Implementation Context

> Session log for the Social Predictor MVP.
> Reference: `docs/IMPLEMENTATION_PLAN.md` for the full spec.
> Node version required: **v22** (use `nvm use 22` before running any commands).

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

`VenuesService` implements `OnApplicationBootstrap` and seeds the 6 Cartagena venues on first boot if the table is empty:
Alma, El Almacén, El Musical, Bondi, Cabaña, Blanco y Negro.

**Endpoint:** `GET /api/venues`

---

### Step 3 — Events module created
**Files:**
- `apps/api/src/modules/events/entities/recurring-event.entity.ts`
- `apps/api/src/modules/events/events.service.ts`
- `apps/api/src/modules/events/events.controller.ts`
- `apps/api/src/modules/events/events.module.ts`

Key design: events are **not stored per-occurrence** — `RecurringEvent` stores `diaSemana` (0=Mon…6=Sun) and `horaInicio` (HH:MM). `EventsService.getWeeklyEvents()` projects them dynamically to the current ISO week.

Helper functions in `events.service.ts`:
- `toIsoWeek(date)` → `"2025-W22"`
- `projectToCurrentWeek(diaSemana, horaInicio)` → concrete `Date`

`EventsService` also seeds one default event per venue on first boot.

**Endpoints:**
- `GET /api/events/week` — current week's events
- `GET /api/events/:id` — single event

---

### Step 4 — Auth rewritten (alias-based, no Google OAuth)
**Files modified:**
- `apps/api/src/modules/auth/auth.service.ts`
- `apps/api/src/modules/auth/auth.controller.ts`
- `apps/api/src/modules/auth/dtos/register.dto.ts` ← new

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

**Endpoints (unchanged paths, new logic):**
- `GET /api/users/profile`
- `PATCH /api/users/profile`

---

### Step 6 — app.module.ts updated
**File modified:** `apps/api/src/app.module.ts`

Removed: `ChatModule`, `CalendarModule`
Added: `VenuesModule`, `EventsModule`

---

### Step 7 — Shared types rewritten
**File:** `libs/shared-types/src/index.ts`

All old interfaces (User, Message, CalendarEvent) replaced with new domain types:
`UserProfile`, `Venue`, `WeeklyEvent`, `EventAnalytics`, `IntentionVote`, `AuthResponse`
Plus type aliases: `Rol`, `Nivel`, `Estilo`, `VoteEstado`, `Ambiente`

Type-check verified: `node ./node_modules/.bin/tsc --project apps/api/tsconfig.json --noEmit` → 0 errors.

---

## COMPLETED — Phase 2: Votes + Prediction API

All steps finished. TypeScript type-check passes with zero errors.

### Step 8 — Three vote entities
**Files:**
- `apps/api/src/modules/votes/entities/intention-vote.entity.ts`
  - `@Unique(['userId', 'eventId', 'semanaIso'])` — DB-level enforcement of 1 vote per user/event/week
  - `estado` enum: `voy | tal_vez | no_voy`
- `apps/api/src/modules/votes/entities/attendance-verification.entity.ts`
  - `asistio: boolean | null` — null = pending, false = timeout or no, true = attended
- `apps/api/src/modules/votes/entities/reliability-metric.entity.ts`
  - `fiabilidad` = `asistenciasConfirmadas / max(1, votosVoyTotal)`

---

### Step 9 — PredictionService
**File:** `apps/api/src/modules/votes/prediction.service.ts`

Pure calculation service — no DB access, no HTTP. Implements the 4 spec rules:
- `estimateAttendance(voters)` → weighted score (voy×1.0 + tal_vez×0.4) × fiabilidad
- `classifyAmbiente(score, hasVotes)` → `flojo | normal | animado | muy_lleno`
- `getRoleBalance(voters)` → `equilibrado | faltan_leaders | faltan_followers`
- `getNivelMedio(voters)` → weighted average nivel (1–5 scale)
- `predict(voters)` → composes all 4 rules into `PredictionResult`

---

### Step 10 — VotesService + Controller + Module
**Files:**
- `apps/api/src/modules/votes/votes.service.ts`
- `apps/api/src/modules/votes/votes.controller.ts`
- `apps/api/src/modules/votes/votes.module.ts`
- `apps/api/src/modules/votes/dtos/create-vote.dto.ts`
- `apps/api/src/modules/votes/dtos/update-vote.dto.ts`
- `apps/api/src/modules/votes/dtos/verify-attendance.dto.ts`

Key methods on VotesService:
- `castVote(userId, dto)` — enforces uniqueness, throws ConflictException if already voted
- `updateVote(userId, voteId, dto)` — calls `canEditVote()` → blocks if < 2h before event start
- `getAggregatesForEvents(eventIds, semanaIso, userId)` → returns `Map<eventId, EventAggregate>` with counts + ambiente color
- `getAnalytics(eventId, userId)` → full PredictionResult, throws 401 if user hasn't voted voy/tal_vez
- `verifyAttendance(userId, dto)` → saves verification, updates reliability metric
- Scheduler helpers: `createPendingVerificationsForYesterday()`, `getPendingVerifications()`, `closeVerification()`

**Endpoints:**
- `POST /api/votes` — cast vote
- `PATCH /api/votes/:id` — change vote
- `POST /api/votes/verify` — submit attendance answer

VotesModule registers: `IntentionVote`, `AttendanceVerification`, `ReliabilityMetric`, `RecurringEvent`, `User`
VotesModule exports: `VotesService`, `PredictionService`

---

### Steps 11 & 12 — Enriched events + analytics endpoint
**Files modified:**
- `apps/api/src/modules/events/events.service.ts` — `getWeeklyEvents(userId)` now accepts userId, calls `VotesService.getAggregatesForEvents()`, merges counts + `ambienteColor` + `userVote` onto each projected event
- `apps/api/src/modules/events/events.controller.ts` — added `@UseGuards(JwtAuthGuard)`, passes `req.user.id` to service; added `GET /api/events/:id/analytics` → delegates to `VotesService.getAnalytics()`
- `apps/api/src/modules/events/events.module.ts` — imports `VotesModule`
- `apps/api/src/app.module.ts` — added `VotesModule`

**Dependency direction (no circular deps):**
```
EventsModule → VotesModule (VotesModule exports VotesService)
VotesModule  → RecurringEvent repo directly (no import of EventsModule)
VotesService → uses toIsoWeek() + projectToCurrentWeek() (plain exported functions, no DI)
```

---

## COMPLETED — Phase 3: Scheduler + Push Notifications

### Step 12 — `@nestjs/schedule` installed
Added to `apps/api/package.json` via `npm install --prefix apps/api @nestjs/schedule`. Installed at `^6.1.1`.

### Step 13 — SchedulerModule created
**Files:**
- `apps/api/src/modules/scheduler/scheduler.service.ts`
- `apps/api/src/modules/scheduler/scheduler.module.ts`

Two `@Cron` jobs on `SchedulerService`:

| Schedule | What it does |
|---|---|
| `0 11 * * *` (11:00 daily) | Calls `createPendingVerificationsForYesterday()` → gets yesterday's voy voters → looks up their `fcmToken` → sends FCM push "¿Fuiste al social de [venue] anoche?" |
| `5 11 * * *` (11:05 daily) | Calls `getPendingVerifications(cutoff=24h ago)` → `closeVerification(id)` + `updateReliability(userId, false)` for each |

`SchedulerModule` imports: `TypeOrmModule.forFeature([User])`, `VotesModule`, `NotificationsModule`.

### Step 14 — Wired into app.module.ts
`ScheduleModule.forRoot()` and `SchedulerModule` added to `app.module.ts` imports.

Type-check: 0 errors.

---

## COMPLETED — Phase 4: Frontend

Both frontend type-checks pass with 0 errors.

### New files created
| File | Purpose |
|---|---|
| `services/onboarding-state.service.ts` | In-memory store for the 4-step onboarding form |
| `services/auth.service.ts` | `register()` / `login()` → stores JWT in localStorage |
| `services/events.service.ts` | `getWeeklyEvents()`, `getEventDetail()`, `getAnalytics()` |
| `services/votes.service.ts` | `castVote()`, `updateVote()`, `verifyAttendance()` |
| `services/profile.service.ts` | `getProfile()`, `updateProfile()` |
| `interceptors/auth.interceptor.ts` | Functional interceptor — attaches `Authorization: Bearer` header |
| `guards/auth.guard.ts` | Redirects to `/onboarding/ciudad` if no token |
| `guards/onboarding.guard.ts` | Redirects to `/home` if already authenticated |
| `components/event-card/event-card.component.ts` | Card with venue name, time, ambiente dot, interested count, vote badge |
| `components/analytics-panel/analytics-panel.component.ts` | Ambiente badge, role balance, nivel bars, recommendation |
| `pages/onboarding/ciudad/onboarding-ciudad.page.ts` | Step 1 — city selection (Cartagena) |
| `pages/onboarding/rol/onboarding-rol.page.ts` | Step 2 — Leader/Follower/Switch cards |
| `pages/onboarding/nivel/onboarding-nivel.page.ts` | Step 3 — nivel radio list |
| `pages/onboarding/estilos/onboarding-estilos.page.ts` | Step 4 — multi-select chips + alias input → calls `AuthService.register()` |
| `pages/event-detail/event-detail.page.ts` | Vote buttons + analytics panel (unlocked after voy/tal_vez) |

### Modified files
| File | Change |
|---|---|
| `app.routes.ts` | Full rewrite: onboarding/*, /home, /event/:id, /profile with guards |
| `main.ts` | Added `withInterceptors([authInterceptor])` to `provideHttpClient` |
| `pages/home/home.page.ts` | Full rewrite: loads weekly events, groups by day, renders EventCardComponent |
| `pages/profile/profile.page.ts` | Full rewrite: shows alias/rol (read-only), edits nivel/estilos; logout button |

### Notes
- `ngModel` used in onboarding-nivel and profile for ion-select — `FormsModule` imported in each component
- `canEdit` in event-detail computes `eventStart - 2h > now` from the event's `eventStart` field
- Onboarding last step calls `register()` and navigates with `replaceUrl: true` so back button doesn't return to onboarding
- `| replace` pipe used in templates for `_` → space display — **this pipe does not exist yet** (see note below)

### Phase 5 — Cleanup items (completed same session)
- `pipes/replace.pipe.ts` — standalone `ReplacePipe` created; added to `imports[]` of `event-card` and `event-detail`
- Deleted: `pages/chat/`, `pages/calendar/`, `modules/auth/` from frontend
- Final type-check: **0 errors** on both `apps/api` and `apps/mobile-app`

---

## STATUS: ALL PHASES COMPLETE ✓

Backend and frontend both type-check with 0 errors. The full MVP is implemented per `IMPLEMENTATION_PLAN.md`.

### Remaining (out of scope for this codebase session)
- FCM token registration needs `@capacitor/push-notifications` installed and configured in the Capacitor project
- Run `docker compose up -d postgres` then `nvm use 22 && ./run.sh` to boot the app

---

## Post-Launch Bug Fixes (Session 2)

### Fix 1 — `@shared/types` path alias not resolving in frontend
**File:** `tsconfig.base.json`
The existing `"@shared/*": ["libs/shared/*"]` didn't match `@shared/types` because the directory is `libs/shared-types`, not `libs/shared`.
Added explicit: `"@shared/types": ["libs/shared-types/src/index.ts"]`

### Fix 2 — `FormsModule` missing in onboarding-nivel
**File:** `apps/mobile-app/src/app/pages/onboarding/nivel/onboarding-nivel.page.ts`
Added `FormsModule` to the `imports[]` array (required for `[(ngModel)]` on `ion-radio-group`).

### Phase 6 — Bottom tab navigation

**New file:** `apps/mobile-app/src/app/pages/tabs/tabs.page.ts`
Standalone `TabsPage` with `<ion-tabs>` + `<ion-tab-bar slot="bottom">` — two tabs: home (Agenda) and profile (Perfil), using `addIcons({ home, person })` from `ionicons/icons`.

**Routes restructured** (`app.routes.ts`):
- Root: `''` → `/tabs/home`
- `/tabs` = parent with `component: TabsPage`, `canActivate: [authGuard]`, children: `home`, `profile`
- `/event/:id` outside tabs (full-screen)
- Catch-all → `/tabs/home`

**Updated `/home` references** → `/tabs/home` in: `onboarding.guard.ts`, `onboarding-estilos.page.ts`, `event-detail.page.ts` back button. Removed `IonBackButton` from profile (it's a tab, not pushed). Removed Profile header button from home (tab bar replaces it).

---

### Fix 3 — `GET /api/events/:id` returned raw entity with no vote enrichment
**Files:** `apps/api/src/modules/events/events.service.ts`, `events.controller.ts`
Added `getEventDetail(id, userId)` method that projects the event to the current week and calls `getAggregatesForEvents` — same enrichment as `getWeeklyEvents`. Controller's `findOne` now calls `getEventDetail` with the authenticated user ID.

### Fix 4 — `updateVote` passed event.id instead of vote.id
**Files:** `libs/shared-types/src/index.ts`, `apps/api/src/modules/votes/votes.service.ts`, `apps/mobile-app/src/app/pages/event-detail/event-detail.page.ts`
- Added `userVoteId: string | null` to `EventAggregate`, `WeeklyEvent` (shared type), and all default fallbacks.
- `getAggregatesForEvents` now returns the vote's `id` alongside its `estado`.
- `event-detail.page.ts` vote() method now uses `event.userVoteId` (not `event.id`) to call `updateVote`, and after a successful vote updates both `userVote` and `userVoteId` from the returned vote object.

---

## Architecture Notes

- **NX package installs**: Always install at the **workspace root** (`npm install <pkg>` from the repo root), NOT with `--prefix apps/api`. NX's build runner resolves all imports from the root `node_modules`. Installing in a sub-package's node_modules will cause a module-not-found crash at runtime even if TypeScript compiles fine.
- **nvm**: Always `nvm use 22` before building or type-checking
- **TypeORM `synchronize: true`** in dev — no migrations needed
- **Seed strategy**: `OnApplicationBootstrap` in VenuesService and EventsService — runs once if table is empty
- **Chat and Calendar modules** still exist on disk but are NOT imported in `app.module.ts` — safe to delete later
- **JWT guard** — `JwtAuthGuard` is NOT global; applied per-controller with `@UseGuards(JwtAuthGuard)`. Auth and Venues endpoints that are public use `@Public()` decorator
- **`simple-array` TypeORM type** — estilos stored as CSV in a text column
- **Reliability default** — new users default to `fiabilidad = 1.0` (no metric row = full trust). Row is created on first verification response
