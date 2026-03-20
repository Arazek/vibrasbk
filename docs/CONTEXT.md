# Implementation Context

> Node version required: **v22** (use `nvm use 22` before running any commands).
> Last updated: 2026-03-18

---

## Current State: FULLY IMPLEMENTED

All planned phases are complete. The codebase has diverged from the original spec in several areas — see the **Divergences** section below.

---

## Architecture Overview

### NX Monorepo Structure

```
vibrasbk/
├── apps/
│   ├── api/                   # NestJS REST API (port 3333)
│   └── mobile-app/            # Ionic + Angular standalone SPA
├── libs/
│   └── shared-types/          # Shared TypeScript interfaces
├── docker-compose.yml         # Dev extras (Redis)
├── docker-compose.app.yml     # App stack (NestJS container)
└── infra.docker-compose.yml   # Infra stack (Traefik, Postgres, Keycloak, etc.)
```

---

## Backend Modules (`apps/api/src/modules/`)

### `auth`
- `POST /api/auth/register` — onboarding payload → bcrypt hashes password → JWT
- `POST /api/auth/login` — email + password → JWT
- JWT payload: `{ sub: user.id, alias: user.alias, applicationRole: user.applicationRole }`
- Guards: `JwtAuthGuard`, `AdminGuard` (allows `admin` and `superadmin`); decorator: `@Public()`

### `users`
- `GET /api/users/profile` — returns full user profile (JWT required)
- `PATCH /api/users/profile` — updates level, styles, academy, fcmToken

### `venues`
- `GET /api/venues` — list all venues (public)
- `POST /api/venues`, `PATCH /api/venues/:id`, `DELETE /api/venues/:id` — admin CRUD
- Seeds 6 Cartagena venues on first boot: Alma, El Almacén, El Musical, Bondi, Cabaña, Blanco y Negro

### `events`
- `GET /api/events/week` — current week's events enriched with vote data (JWT required)
- `GET /api/events/:id` — single event enriched with vote data (JWT required)
- `GET /api/events/:id/analytics` — prediction result (requires going/maybe vote)
- `POST /api/events`, `PATCH /api/events/:id`, `DELETE /api/events/:id` — admin CRUD
- `PATCH /api/events/:id/foto` — admin photo upload (multipart)
- Photos stored at `apps/api/uploads/events/photos/`, served at `/uploads/events/photos/{uuid}.ext`
- Filename is a random UUID (`crypto.randomUUID()`) — no timestamp prefix
- Path structure mirrors future MinIO object keys: `{entity}/{asset-type}/{uuid}.ext`

### `votes`
- `POST /api/votes` — cast vote (1 per user/event/week enforced by DB unique constraint)
- `PATCH /api/votes/:id` — update vote (blocked if < 2h before event start)
- `POST /api/votes/verify` — submit post-event attendance answer

### `dance-styles`
- `GET /api/dance-styles` — list active dance styles (public)
- Admin CRUD endpoints

### `academias`
- `GET /api/academias` — list all academias (public)
- Admin CRUD endpoints

### `notifications`
- Internal FCM push notification service (not exposed via HTTP)

### `scheduler`
- `0 11 * * *` — sends FCM verification push to yesterday's "going" voters
- `5 11 * * *` — auto-closes pending verifications older than 24h, sets attended=false, updates reliability

### `chat` *(legacy — not wired into app.module.ts, safe to delete)*

### `calendar` *(legacy — not wired into app.module.ts, safe to delete)*

---

## Database Entities

### User (`users` table)
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| alias | VARCHAR | unique, not null |
| email | VARCHAR | unique, not null |
| passwordHash | VARCHAR | bcrypt |
| city | VARCHAR | default 'Cartagena' |
| dancingRole | ENUM | leader \| follower \| switch |
| applicationRole | ENUM | user \| admin \| superadmin |
| level | ENUM | beginner \| initiation \| comfortable \| intermediate \| advanced |
| styles | simple-array | CSV in text column |
| academyId | UUID | nullable FK |
| fcmToken | VARCHAR | nullable |
| createdAt, updatedAt | TIMESTAMP | |

### Venue (`venues` table)
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| name | VARCHAR | |
| city | VARCHAR | default 'Cartagena' |
| lat, lng | DECIMAL | nullable |
| maxCapacity | INTEGER | nullable |
| styles | simple-array | |

### RecurringEvent / SocialEvent / IntensiveEvent / CongressEvent (`recurring_events` table — STI)
Base columns (all types):
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| type | ENUM | `social` \| `intensive` \| `congress` (discriminator) |
| venueId | UUID | FK → venues.id |
| name | VARCHAR | |
| photoUrl | VARCHAR | nullable |
| dayOfWeek | SMALLINT | 0=Mon…6=Sun; null for punctual events |
| nextDate | DATE | persisted for quick lookup |
| startDate | DATE | nullable; used for punctual events |
| startTime | TIME | HH:MM |
| estimatedPeakTime | TIME | nullable |
| styles | simple-array | |
| active | BOOLEAN | default true |

Extra columns by type:
- **SocialEvent**: `workshopIncluded` (bool), `entryPrice` (decimal), `instructors` (text)
- **IntensiveEvent**: `title`, `level`, `price`, `instructors`, `endDate`
- **CongressEvent**: `title`, `locality`, `durationDays`, `prices` (JSON string), `websiteUrl`, `endDate`

### IntentionVote (`intention_votes`)
- userId, eventId, isoWeek (e.g. `"2025-W22"`), status (going/maybe/not_going)
- Unique constraint: `(userId, eventId, isoWeek)`

### AttendanceVerification (`attendance_verifications`)
- userId, eventId, isoWeek, attended (bool|null), responseTimestamp

### ReliabilityMetric (`reliability_metrics`)
- userId (unique), totalGoingVotes, confirmedAttendances
- reliability = confirmedAttendances / max(1, totalGoingVotes)
- Default for new users: reliability = 1.0 (no row = full trust)

### DanceStyle (`dance_styles`)
- slug (unique), name, active

### Academia (`academias`)
- name, city

---

## Prediction Service Rules (`apps/api/src/modules/votes/prediction.service.ts`)

| Rule | Logic |
|------|-------|
| Estimated attendance | `SUM(going×1.0 + maybe×0.4) × reliability` per voter |
| Vibe | quiet (<9) / normal (<19) / lively (<36) / packed (≥36) |
| Role balance | leaders/followers ratio: 0.8–1.2 → balanced; <0.8 → need_leaders; >1.2 → need_followers |
| Average level | weighted avg (beginner=1 … advanced=5) × reliability |

---

## Shared Types (`libs/shared-types/src/index.ts`)

```typescript
DancingRole = 'leader' | 'follower' | 'switch'
ApplicationRole = 'user' | 'admin' | 'superadmin'
Level = 'beginner' | 'initiation' | 'comfortable' | 'intermediate' | 'advanced'
VoteStatus = 'going' | 'maybe' | 'not_going'
Vibe = 'quiet' | 'normal' | 'lively' | 'packed'
EventType = 'social' | 'intensive' | 'congress'
```

Interfaces: `UserProfile`, `Venue`, `WeeklyEvent`, `EventAnalytics`, `IntentionVote`, `AuthResponse`, `DanceStyle`, `Academia`, `RoleBalanceDetail`, `Estilo`

---

## Frontend Structure (`apps/mobile-app/src/app/`)

### Routes (`app.routes.ts`)

```
/                         → redirect to /tabs/home
/login                    → LoginPage          (onboardingGuard: blocked if authenticated)
/onboarding/ciudad        → OnboardingCiudadPage
/onboarding/rol           → OnboardingRolPage
/onboarding/nivel         → OnboardingNivelPage
/onboarding/estilos       → OnboardingEstilosPage
/tabs                     → TabsPage shell     (authGuard)
  /tabs/home              → HomePage
  /tabs/profile           → ProfilePage
/event/:id                → EventDetailPage    (authGuard, full-screen)
/admin                    → AdminHomePage      (adminGuard)
  /admin/events           → AdminEventsPage
  /admin/venues           → AdminVenuesPage
  /admin/estilos          → AdminEstilosPage
  /admin/academias        → AdminAcademiasPage
**                        → redirect to /tabs/home
```

> **Note:** The `/calendar` route has been removed. Calendar functionality is now embedded inline in `HomePage` (see below).

### Guards
- `authGuard` — redirects to `/login` if no JWT
- `onboardingGuard` — redirects to `/tabs/home` if already authenticated
- `adminGuard` — requires JWT + `rol === 'admin'`

### Services
- `auth.service.ts` — register, login, logout, token storage (localStorage)
- `events.service.ts` — getWeeklyEvents, getEventDetail, getAnalytics
- `votes.service.ts` — castVote, updateVote, verifyAttendance
- `profile.service.ts` — getProfile, updateProfile
- `admin.service.ts` — admin CRUD for venues, events, dance styles, academias
- `onboarding-state.service.ts` — in-memory state across onboarding steps

### Components
- `event-card/` — venue name, time, ambiente dot, interesados count, vote badge
- `analytics-panel/` — ambiente badge, role balance, nivel bars, recommendation text

### Pages
- `login/` — email + password login form
- `onboarding/{ciudad,rol,nivel,estilos}/` — 4-step onboarding flow
- `tabs/` — bottom tab bar shell (Agenda + Perfil)
- `home/` — weekly agenda with **list/calendar toggle** in the filter bar
  - `activeView: 'list' | 'calendar'` persisted to `localStorage` key `vibrasbk_home_view`
  - List view: events grouped by day (existing behaviour)
  - Calendar view: full-month grid with dot indicators per event type; selecting a day shows that day's events below the grid
  - Month navigation: prev/next month arrows
  - Calendar was previously a separate route (`/calendar`); it is now inline in this page
- `event-detail/` — vote buttons + analytics panel
- `profile/` — edit level, styles, academy; logout
- `admin/` — admin panel with modals for event/venue forms
  - All admin pages use `<ion-back-button>` with `defaultHref` for hardware back button support (Android)
  - `admin-home` → `defaultHref="/tabs/profile"`, all others → `defaultHref="/admin"`
  - **Event form modal**: social events now have a recurring/one-time toggle
    - Recurring: `dayOfWeek` is set, `startDate` is cleared before submit
    - One-time: `startDate` is set, `dayOfWeek` is cleared before submit
  - **Event form modal (edit mode only)**: photo upload section using `<label>` wrapper around a hidden `<input type="file">` — reliable on Android/iOS WebView where programmatic `.click()` fails

### Assets (`apps/mobile-app/src/assets/`)
- `vibrasbk.png` — full logo ("Vibra" outline + "SBK" hot-pink gradient)
- `sbk.png` — SBK-only logo (Vibra removed via color masking), transparent background; used as Android launcher icon

### Android Launcher Icons (`android/app/src/main/res/mipmap-*/`)
All densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi) have been regenerated from `sbk.png`:
- `ic_launcher.png` — square, white background + SBK logo (15% padding)
- `ic_launcher_round.png` — circular clip, white background + SBK logo
- `ic_launcher_foreground.png` — transparent background + SBK logo (20% padding) for adaptive icon (API 26+)
- Background color for adaptive icon: `#FFFFFF` (`android/app/src/main/res/values/ic_launcher_background.xml`)

### Pipes
- `pipes/replace.pipe.ts` — `ReplacePipe` for `_` → space display

---

## Docker Compose Files

### `docker-compose.yml` (dev extras)
- Redis on port 6379

### `docker-compose.app.yml` (application)
- NestJS API on port 3333
- Traefik labels for `vibrasbk.duckdns.org`
- `uploads` volume for event photos
- Requires `proxy-network` (external)

### `infra.docker-compose.yml` (infrastructure)
- Traefik v3.6 — reverse proxy, TLS via Let's Encrypt
- PostgreSQL (TimescaleDB + PostGIS)
- Keycloak v26 — optional SSO (not used by vibrasbk directly)
- pgAdmin — DB management UI
- Webhook server — CI/CD deploy triggers

See `docs/INTEGRATION_GUIDE.md` for full infra details.

---

## Running the App

```bash
nvm use 22

# Start infra (Traefik + Postgres)
docker compose -f infra.docker-compose.yml up -d

# Start app
docker compose -f docker-compose.app.yml up -d

# Or run API locally
npm run start:api

# Or run full dev stack
./run.sh
```

---

## Key Architecture Notes

- **NX package installs**: Always at workspace root (`npm install <pkg>`), NOT `--prefix apps/api`. NX resolves all imports from root `node_modules`.
- **TypeORM `synchronize: true`** in dev — no migrations needed.
- **JWT guard** is NOT global. Applied per-controller with `@UseGuards(JwtAuthGuard)`. Public endpoints use `@Public()`.
- **STI (Single Table Inheritance)**: All event types in `recurring_events` with `type` discriminator (DB column: `tipo`). **Never filter by `where: { type }` — the discriminator column is `tipo` not `type`, so TypeORM generates invalid SQL.** Filter using `instanceof` after a full `.find()`: `events.filter(ev => ev instanceof SocialEvent)`.
- **Dependency direction** (no circular deps): `EventsModule → VotesModule`; `VotesModule` accesses `RecurringEvent` repo directly.
- **tsconfig path alias**: `"@shared/types": ["libs/shared-types/src/index.ts"]` in `tsconfig.base.json`.
- **Legacy modules** (`chat`, `calendar`) still exist on disk but are NOT imported in `app.module.ts`. Safe to delete.

