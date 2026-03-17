# Implementation Context

> Node version required: **v22** (use `nvm use 22` before running any commands).
> Last updated: 2026-03-17

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
- JWT payload: `{ sub: user.id, alias: user.alias, rol: user.rol }`
- Guards: `JwtAuthGuard`, `AdminGuard`; decorator: `@Public()`

### `users`
- `GET /api/users/profile` — returns full user profile (JWT required)
- `PATCH /api/users/profile` — updates nivel, estilos, academia, fcmToken

### `venues`
- `GET /api/venues` — list all venues (public)
- `POST /api/venues`, `PATCH /api/venues/:id`, `DELETE /api/venues/:id` — admin CRUD
- Seeds 6 Cartagena venues on first boot: Alma, El Almacén, El Musical, Bondi, Cabaña, Blanco y Negro

### `events`
- `GET /api/events/week` — current week's events enriched with vote data (JWT required)
- `GET /api/events/:id` — single event enriched with vote data (JWT required)
- `GET /api/events/:id/analytics` — prediction result (requires voy/tal_vez vote)
- `POST /api/events`, `PATCH /api/events/:id`, `DELETE /api/events/:id` — admin CRUD
- `PATCH /api/events/:id/foto` — admin photo upload (multipart)
- Photos stored at `apps/api/uploads/events/`, served at `/uploads/events/{filename}`

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
- `0 11 * * *` — sends FCM verification push to yesterday's "voy" voters
- `5 11 * * *` — auto-closes pending verifications older than 24h, sets asistio=false, updates reliability

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
| ciudad | VARCHAR | default 'Cartagena' |
| rol | ENUM | leader \| follower \| switch \| admin |
| nivel | ENUM | nuevo \| iniciacion \| social_comodo \| intermedio \| avanzado |
| estilos | simple-array | CSV in text column |
| academiaId | UUID | nullable FK |
| fcmToken | VARCHAR | nullable |
| createdAt, updatedAt | TIMESTAMP | |

### Venue (`venues` table)
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| nombre | VARCHAR | |
| ciudad | VARCHAR | default 'Cartagena' |
| lat, lng | DECIMAL | nullable |
| aforoMaximo | INTEGER | nullable |
| estilos | simple-array | |

### RecurringEvent / SocialEvent / IntensivoEvent / CongresoEvent (`recurring_events` table — STI)
Base columns (all types):
| Column | Type | Notes |
|--------|------|-------|
| id | UUID | PK |
| tipo | ENUM | `social` \| `intensivo` \| `congreso` (discriminator) |
| venueId | UUID | FK → venues.id |
| nombre | VARCHAR | |
| fotoUrl | VARCHAR | nullable |
| diaSemana | SMALLINT | 0=Mon…6=Sun; null for punctual events |
| proximaFecha | DATE | persisted for quick lookup |
| fechaInicio | DATE | nullable; used for punctual events |
| horaInicio | TIME | HH:MM |
| horaPicoEstimado | TIME | nullable |
| estilos | simple-array | |
| activo | BOOLEAN | default true |

Extra columns by type:
- **SocialEvent**: `tallerIncluido` (bool), `precioEntrada` (decimal), `instructores` (text)
- **IntensivoEvent**: `titulo`, `nivel`, `precio`, `profesores`, `fechaFin`
- **CongresoEvent**: `titulo`, `localidad`, `duracionDias`, `precios` (JSON string), `enlaceWeb`, `fechaFin`

### IntentionVote (`intention_votes`)
- userId, eventId, semanaIso (e.g. `"2025-W22"`), estado (voy/tal_vez/no_voy)
- Unique constraint: `(userId, eventId, semanaIso)`

### AttendanceVerification (`attendance_verifications`)
- userId, eventId, semanaIso, asistio (bool|null), timestampRespuesta

### ReliabilityMetric (`reliability_metrics`)
- userId (unique), votosVoyTotal, asistenciasConfirmadas
- fiabilidad = asistenciasConfirmadas / max(1, votosVoyTotal)
- Default for new users: fiabilidad = 1.0 (no row = full trust)

### DanceStyle (`dance_styles`)
- slug (unique), nombre, activo

### Academia (`academias`)
- nombre, ciudad

---

## Prediction Service Rules (`apps/api/src/modules/votes/prediction.service.ts`)

| Rule | Logic |
|------|-------|
| Estimated attendance | `SUM(voy×1.0 + tal_vez×0.4) × fiabilidad` per voter |
| Ambiente | flojo (<9) / normal (<19) / animado (<36) / muy_lleno (≥36) |
| Role balance | leaders/followers ratio: 0.8–1.2 → equilibrado; <0.8 → faltan_leaders; >1.2 → faltan_followers |
| Nivel medio | weighted avg (nuevo=1 … avanzado=5) × fiabilidad |

---

## Shared Types (`libs/shared-types/src/index.ts`)

```typescript
Rol = 'leader' | 'follower' | 'switch' | 'admin'
Nivel = 'nuevo' | 'iniciacion' | 'social_comodo' | 'intermedio' | 'avanzado'
VoteEstado = 'voy' | 'tal_vez' | 'no_voy'
Ambiente = 'flojo' | 'normal' | 'animado' | 'muy_lleno'
TipoEvento = 'social' | 'intensivo' | 'congreso'
```

Interfaces: `UserProfile`, `Venue`, `WeeklyEvent`, `EventAnalytics`, `IntentionVote`, `AuthResponse`, `DanceStyle`, `Academia`, `RoleBalanceDetail`

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
- `home/` — weekly agenda grouped by day
- `event-detail/` — vote buttons + analytics panel
- `profile/` — edit nivel, estilos, academia; logout
- `admin/` — admin panel with modals for event/venue forms

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
- **STI (Single Table Inheritance)**: All event types in `recurring_events` with `tipo` discriminator.
- **Dependency direction** (no circular deps): `EventsModule → VotesModule`; `VotesModule` accesses `RecurringEvent` repo directly.
- **tsconfig path alias**: `"@shared/types": ["libs/shared-types/src/index.ts"]` in `tsconfig.base.json`.
- **Legacy modules** (`chat`, `calendar`) still exist on disk but are NOT imported in `app.module.ts`. Safe to delete.

