# Implementation Plan: Social Predictor MVP

> Based on `functional.pdf` — Predictor de Experiencia de Social (Cartagena)
> Target stack: NestJS (API) + Ionic/Angular (mobile-app) — NX monorepo

---

## 1. Overview

The existing codebase is a generic mobile app template with chat, calendar, and Google OAuth. The functional document describes a completely different product: a **weekly attendance prediction tool** for salsa/bachata dance events in Cartagena. This plan details every file to delete, create, or modify to implement the MVP.

### What stays
- NX monorepo structure
- NestJS + TypeORM + PostgreSQL stack
- Ionic + Angular standalone components
- JWT authentication skeleton
- Firebase FCM notifications service
- Docker Compose infrastructure

### What gets replaced
- All domain entities (User, Message, Conversation, CalendarEvent)
- All feature modules (chat, calendar)
- All frontend pages and services
- Authentication flow (no Google OAuth — alias-based onboarding)

---

## 2. Files to Delete

### Backend
```
apps/api/src/modules/chat/               # entire directory
apps/api/src/modules/calendar/           # entire directory
```

### Frontend
```
apps/mobile-app/src/app/pages/chat/     # entire directory
apps/mobile-app/src/app/pages/calendar/ # entire directory
apps/mobile-app/src/app/modules/auth/   # entire directory (replaced by onboarding)
```

---

## 3. Database Schema (New Entities)

### 3.1 User Entity — rewrite
**File:** `apps/api/src/modules/users/entities/user.entity.ts`

Replaces the current generic user. Removes: `email`, `firstName`, `lastName`, `avatar`, `bio`, `provider`, `providerId`, `preferences`.

```
users
├── id              UUID (PK)
├── alias           VARCHAR unique, not null
├── ciudad          VARCHAR default 'Cartagena'
├── rol             ENUM('leader','follower','switch') not null
├── nivel           ENUM('nuevo','iniciacion','social_comodo','intermedio','avanzado') not null
├── estilos         VARCHAR[] not null  (e.g. ['bachata_sensual','salsa_linea'])
├── academia        VARCHAR nullable
├── fcm_token       VARCHAR nullable    (for push notifications)
├── created_at      TIMESTAMP
└── updated_at      TIMESTAMP
```

### 3.2 Venue Entity — new
**File:** `apps/api/src/modules/venues/entities/venue.entity.ts`

```
venues
├── id              UUID (PK)
├── nombre          VARCHAR not null
├── ciudad          VARCHAR not null
├── lat             DECIMAL nullable
├── lng             DECIMAL nullable
└── estilos         VARCHAR[]
```

Seed data (6 venues):
- Alma, El Almacén, El Musical, Bondi, Cabaña, Blanco y Negro

### 3.3 Recurring Event Entity — new
**File:** `apps/api/src/modules/events/entities/recurring-event.entity.ts`

```
recurring_events
├── id                  UUID (PK)
├── venue_id            UUID (FK → venues.id)
├── dia_semana          SMALLINT (0=Mon … 6=Sun)
├── hora_inicio         TIME not null
├── hora_pico_estimado  TIME nullable
├── estilos             VARCHAR[]
└── activo              BOOLEAN default true
```

Events are **not** stored per-occurrence. The API projects them into the current ISO week dynamically.

### 3.4 Intention Vote Entity — new
**File:** `apps/api/src/modules/votes/entities/intention-vote.entity.ts`

```
intention_votes
├── id              UUID (PK)
├── user_id         UUID (FK → users.id)
├── event_id        UUID (FK → recurring_events.id)
├── semana_iso      VARCHAR (e.g. '2025-W22')  indexed
├── estado          ENUM('voy','tal_vez','no_voy') not null
├── created_at      TIMESTAMP
└── updated_at      TIMESTAMP

UNIQUE CONSTRAINT: (user_id, event_id, semana_iso)
```

### 3.5 Attendance Verification Entity — new
**File:** `apps/api/src/modules/votes/entities/attendance-verification.entity.ts`

```
attendance_verifications
├── id                  UUID (PK)
├── user_id             UUID (FK → users.id)
├── event_id            UUID (FK → recurring_events.id)
├── semana_iso          VARCHAR
├── asistio             BOOLEAN nullable  (null = pending, false = no-response timeout)
└── timestamp_respuesta TIMESTAMP nullable

UNIQUE CONSTRAINT: (user_id, event_id, semana_iso)
```

### 3.6 Reliability Metric Entity — new
**File:** `apps/api/src/modules/votes/entities/reliability-metric.entity.ts`

```
reliability_metrics
├── id                      UUID (PK)
├── user_id                 UUID (FK → users.id, UNIQUE)
├── votos_voy_total         INTEGER default 0
├── asistencias_confirmadas INTEGER default 0
└── fiabilidad              DECIMAL  (computed: asistencias / max(1, votos_voy_total))
```

This table is internal — never exposed directly to the frontend.

---

## 4. Backend Modules

### 4.1 Auth Module — simplify
**Files to modify:**
- `apps/api/src/modules/auth/auth.service.ts`
- `apps/api/src/modules/auth/auth.controller.ts`

**Changes:**
- Remove Google OAuth strategy and all Passport Google dependencies
- Add `POST /api/auth/register` — creates a user from onboarding payload, returns JWT
- Add `POST /api/auth/login` — accepts `{ alias }`, returns JWT (MVP: alias-only, no password)
- Keep JWT strategy and `JwtAuthGuard` unchanged

**New DTO:** `apps/api/src/modules/auth/dtos/register.dto.ts`
```typescript
alias: string           // required, unique
rol: RolEnum            // required
nivel: NivelEnum        // required
estilos: EstiloEnum[]   // required, min 1
academia?: string       // optional
```

### 4.2 Users Module — modify
**Files to modify:**
- `apps/api/src/modules/users/users.controller.ts`
- `apps/api/src/modules/users/users.service.ts`

**Endpoints (keep path, change logic):**
- `GET /api/users/profile` — returns alias, rol, nivel, estilos, academia
- `PATCH /api/users/profile` — allows updating nivel, estilos, academia only

**Remove** UpdateUserDto fields: firstName, lastName, avatar, bio, phoneNumber.

### 4.3 Venues Module — new
**New files:**
```
apps/api/src/modules/venues/
├── entities/venue.entity.ts
├── venues.service.ts
├── venues.controller.ts
└── venues.module.ts
```

**Endpoints:**
- `GET /api/venues` — list all active venues (public)

**Seed:** Run at app startup via a `VenuesSeedService` if the table is empty.

### 4.4 Events Module — new (replaces calendar)
**New files:**
```
apps/api/src/modules/events/
├── entities/recurring-event.entity.ts
├── dtos/create-event.dto.ts
├── events.service.ts
├── events.controller.ts
└── events.module.ts
```

**Endpoints:**
- `GET /api/events/week` — returns all active recurring events projected onto the current ISO week, each enriched with:
  - vote counts (voy, tal_vez, no_voy) for the current week
  - `ambiente_color`: grey/yellow/green/red based on prediction rules
  - `total_interesados`: voy + tal_vez count
  - `user_vote`: the requesting user's current vote state (or null)
- `GET /api/events/:id` — single event detail (same enrichment)

**Projection logic** (in `EventsService.projectToWeek()`):
```
For each recurring_event:
  event_date = date of current week's [dia_semana]
  event_start = combine(event_date, hora_inicio)
  Return: { ...event, event_date, event_start }
```

### 4.5 Votes Module — new
**New files:**
```
apps/api/src/modules/votes/
├── entities/intention-vote.entity.ts
├── entities/attendance-verification.entity.ts
├── entities/reliability-metric.entity.ts
├── dtos/create-vote.dto.ts
├── dtos/update-vote.dto.ts
├── dtos/verify-attendance.dto.ts
├── votes.service.ts
├── votes.controller.ts
└── votes.module.ts
```

**Endpoints:**
- `POST /api/votes` — cast a vote
  - Validates: 1 vote per (user, event, semana_iso)
  - Body: `{ event_id, estado }`
- `PATCH /api/votes/:id` — change vote
  - Validates: cannot change if `event_start - now < 2 hours`
- `GET /api/events/:id/analytics` — returns prediction analytics
  - Guard: user must have voted `voy` or `tal_vez` for this event this week
  - Returns: ambiente, nivel_distribution, role_balance, recommendation text

**Vote validation rule** in `VotesService.canEdit()`:
```typescript
const eventStart = /* project recurring event to this week */;
const twoHoursBefore = subHours(eventStart, 2);
return new Date() < twoHoursBefore;
```

**Analytics endpoint logic** — delegates to `PredictionService`.

### 4.6 Prediction Service — new (internal, no controller)
**New file:** `apps/api/src/modules/votes/prediction.service.ts`

Implements the 4 rules from §6 of the functional document:

**Rule 1 — Estimated attendance:**
```
score = SUM over votes WHERE estado IN ('voy','tal_vez'):
  if estado == 'voy':  score += 1.0 * user.fiabilidad
  if estado == 'tal_vez': score += 0.4 * user.fiabilidad
```

**Rule 2 — Ambiente classification:**
```
score 0–8   → 'flojo'   → grey card
score 9–18  → 'normal'  → yellow card
score 19–35 → 'animado' → green card
score 36+   → 'muy_lleno' → red card
```

**Rule 3 — Role balance:**
```
leaders   = count of voters with rol='leader' (voy/tal_vez)
followers = count of voters with rol='follower' (voy/tal_vez)
ratio = leaders / max(1, followers)
  0.8–1.2 → 'equilibrado'
  < 0.8   → 'faltan_leaders'
  > 1.2   → 'faltan_followers'
```

**Rule 4 — Average level:**
```
nivel_weights = { nuevo:1, iniciacion:2, social_comodo:3, intermedio:4, avanzado:5 }
weighted_avg = SUM(nivel_weight * fiabilidad) / SUM(fiabilidad)
```

**Recommendation text** (lookup table based on ambiente + nivel_avg + balance):
```
flojo + any          → "Ambiente tranquilo."
animado + avanzado   → "Exigente para principiantes."
faltan_followers     → "Puede haber espera para followers."
normal + comodo      → "Buen día para practicar."
```

### 4.7 Scheduler Module — new
**Install:** `@nestjs/schedule` (add to package.json)

**New files:**
```
apps/api/src/modules/scheduler/
├── scheduler.service.ts
└── scheduler.module.ts
```

**Cron jobs:**

| Schedule | Action |
|----------|--------|
| Every day at 11:00 | Send FCM push to all users who voted `voy` for any event the previous day. Message: "¿Fuiste al social de anoche?" |
| Every day at 11:00 +24h (i.e. next day 11:00) | For verifications with `asistio = null` older than 24h → set `asistio = false`, update reliability metric |
| After setting `asistio` | Update `reliability_metrics` for the user: increment `votos_voy_total` if they voted `voy`, increment `asistencias_confirmadas` if `asistio = true`, recompute `fiabilidad` |

**Notification payload:**
```json
{
  "title": "¿Cómo estuvo el social?",
  "body": "¿Fuiste al social de [venue_name] anoche?",
  "data": { "type": "verification", "event_id": "...", "semana_iso": "..." }
}
```

### 4.8 App Module — modify
**File:** `apps/api/src/app.module.ts`

**Remove imports:** `ChatModule`, `CalendarModule`
**Add imports:** `VenuesModule`, `EventsModule`, `VotesModule`, `SchedulerModule`, `ScheduleModule.forRoot()`

---

## 5. Shared Types — rewrite
**File:** `libs/shared-types/src/index.ts`

Replace existing interfaces with:

```typescript
export type Rol = 'leader' | 'follower' | 'switch';
export type Nivel = 'nuevo' | 'iniciacion' | 'social_comodo' | 'intermedio' | 'avanzado';
export type Estilo = 'bachata_sensual' | 'bachata_tradicional' | 'salsa_linea' | 'salsa_cubana';
export type VoteEstado = 'voy' | 'tal_vez' | 'no_voy';
export type Ambiente = 'flojo' | 'normal' | 'animado' | 'muy_lleno';

export interface UserProfile {
  id: string;
  alias: string;
  ciudad: string;
  rol: Rol;
  nivel: Nivel;
  estilos: Estilo[];
  academia?: string;
}

export interface Venue {
  id: string;
  nombre: string;
  ciudad: string;
  lat?: number;
  lng?: number;
  estilos: Estilo[];
}

export interface WeeklyEvent {
  id: string;
  venue: Venue;
  event_date: string;       // ISO date string
  hora_inicio: string;      // HH:MM
  estilos: Estilo[];
  total_interesados: number;
  ambiente_color: Ambiente;
  user_vote: VoteEstado | null;
}

export interface EventAnalytics {
  ambiente: Ambiente;
  asistencia_estimada: number;
  nivel_distribution: Record<Nivel, number>;
  role_balance: 'equilibrado' | 'faltan_leaders' | 'faltan_followers';
  recommendation: string;
}

export interface IntentionVote {
  id: string;
  event_id: string;
  semana_iso: string;
  estado: VoteEstado;
}

export interface AuthResponse {
  access_token: string;
  user: UserProfile;
}
```

---

## 6. Frontend — Navigation Structure

### New route map
```
/onboarding/ciudad      → OnboardingCiudadPage
/onboarding/rol         → OnboardingRolPage
/onboarding/nivel       → OnboardingNivelPage
/onboarding/estilos     → OnboardingEstilosPage
/home                   → HomePage (weekly agenda)
/event/:id              → EventDetailPage
/profile                → ProfilePage
```

**Route guards:**
- `AuthGuard` — if no JWT token in storage → redirect to `/onboarding/ciudad`
- `OnboardingGuard` — if token exists → redirect to `/home` (prevents re-onboarding)

**File:** `apps/mobile-app/src/app/app.routes.ts` — full rewrite

### Tab bar (bottom navigation)
Remove current tabs. Add:
- Home (agenda icon)
- Profile (person icon)

---

## 7. Frontend — Pages

### 7.1 Onboarding Pages (4 steps)
**Directory:** `apps/mobile-app/src/app/pages/onboarding/`

**Files to create:**
- `ciudad/onboarding-ciudad.page.ts` — single button "Cartagena", auto-selects
- `rol/onboarding-rol.page.ts` — 3 cards: Leader / Follower / Switch
- `nivel/onboarding-nivel.page.ts` — 5 options as a vertical list
- `estilos/onboarding-estilos.page.ts` — multi-select chips (min 1 required)

Each page stores selection in a shared `OnboardingStateService` (in-memory). The last step (`estilos`) calls `AuthService.register()`, receives JWT, stores it, navigates to `/home`.

**Shared component:** `apps/mobile-app/src/app/components/onboarding-step/` — wrapper with progress bar (1/4 … 4/4) and "Next" button.

### 7.2 Home Page — weekly agenda
**File:** `apps/mobile-app/src/app/pages/home/home.page.ts` — full rewrite

**Behavior:**
- On init: calls `EventsService.getWeeklyEvents()`
- Groups events by day of week
- Shows a section per day (Mon–Sun) with event cards

**Event card** shows:
- Venue name
- Time (hora_inicio)
- Styles (chips)
- Colored dot/badge for ambiente (grey/yellow/green/red)
- "X interesados" count
- User's current vote badge if already voted

**Component:** `apps/mobile-app/src/app/components/event-card/event-card.component.ts`

### 7.3 Event Detail Page
**File:** `apps/mobile-app/src/app/pages/event-detail/event-detail.page.ts` — new

**Sections:**

**Section 1 — Info:** venue name, day, time, styles

**Section 2 — Vote action:**
- If user hasn't voted: show 3 buttons (Voy / Tal vez / No iré)
- If user voted: show current vote with option to change (disabled if < 2h before event)

**Section 3 — Analytics (conditional):**
- Hidden until user votes `voy` or `tal_vez`
- After voting → calls `VotesService.getAnalytics(eventId)` → renders:
  - Ambiente badge with color
  - Level distribution (horizontal bars per level)
  - Role balance text
  - Recommendation text in a highlighted box

**Component:** `apps/mobile-app/src/app/components/analytics-panel/analytics-panel.component.ts`

### 7.4 Profile Page — simplify
**File:** `apps/mobile-app/src/app/pages/profile/profile.page.ts` — rewrite

Shows: alias (read-only), ciudad, rol (read-only), nivel (editable), estilos (editable), academia (editable).

Calls `PATCH /api/users/profile` on save.

---

## 8. Frontend — Services

**Directory:** `apps/mobile-app/src/app/services/`

### 8.1 `auth.service.ts` — rewrite
```typescript
register(dto: RegisterDto): Observable<AuthResponse>  // POST /api/auth/register
getToken(): string | null                              // from Capacitor Storage
isAuthenticated(): boolean
logout(): void
```
Stores JWT in `@capacitor/preferences` (not localStorage — mobile-friendly).

### 8.2 `events.service.ts` — new
```typescript
getWeeklyEvents(): Observable<WeeklyEvent[]>           // GET /api/events/week
getEventDetail(id: string): Observable<WeeklyEvent>    // GET /api/events/:id
getAnalytics(id: string): Observable<EventAnalytics>   // GET /api/events/:id/analytics
```

### 8.3 `votes.service.ts` — new
```typescript
castVote(eventId: string, estado: VoteEstado): Observable<IntentionVote>   // POST /api/votes
updateVote(voteId: string, estado: VoteEstado): Observable<IntentionVote>  // PATCH /api/votes/:id
```

### 8.4 `profile.service.ts` — new
```typescript
getProfile(): Observable<UserProfile>                  // GET /api/users/profile
updateProfile(dto: UpdateProfileDto): Observable<UserProfile> // PATCH /api/users/profile
```

### 8.5 `onboarding-state.service.ts` — new
In-memory service (not injectable as singleton, just a simple class) to pass data across the 4 onboarding steps before the final API call.

### 8.6 HTTP Interceptor — new
**File:** `apps/mobile-app/src/app/interceptors/auth.interceptor.ts`

Reads JWT from storage and adds `Authorization: Bearer <token>` to every outgoing request. Registered in `app.config.ts` via `withInterceptors([authInterceptor])`.

---

## 9. Frontend — Push Notification Setup

**File to modify:** `apps/mobile-app/src/app/app.component.ts`

On app init:
1. Request push notification permission via `@capacitor/push-notifications`
2. Get FCM token
3. Call `PATCH /api/users/profile` with `{ fcm_token }` to register it

The backend's scheduler uses this token to send verification notifications.

---

## 10. Install / Package Changes

### Backend (`apps/api/package.json`)
```
ADD:   @nestjs/schedule    (cron jobs)
ADD:   date-fns            (ISO week utilities)
REMOVE: passport-google-oauth20
REMOVE: @nestjs/passport (keep if needed for JWT strategy)
```

### Frontend (`apps/mobile-app/package.json`)
```
ADD:   @capacitor/push-notifications
ADD:   @capacitor/preferences
REMOVE: socket.io-client
```

---

## 11. Implementation Phases

### Phase 1 — Backend foundation (no frontend yet)
1. Rewrite `user.entity.ts` with new fields
2. Create `venue.entity.ts` + seed data
3. Create `recurring-event.entity.ts` + seed data (one event per venue per week)
4. Rewrite `auth.service.ts` — alias-based register + JWT
5. Update `users.controller.ts` / `users.service.ts` — new profile shape
6. Register new entities in `app.module.ts`, remove old ones
7. Verify DB auto-sync creates correct tables

### Phase 2 — Events + Votes API
8. Create `events.module.ts` — `GET /api/events/week` with dynamic projection
9. Create `votes.module.ts` — POST vote, PATCH vote with 2h guard
10. Create `prediction.service.ts` — implement all 4 rules
11. Expose `GET /api/events/:id/analytics` — gated behind vote check

### Phase 3 — Scheduler + Notifications
12. Install `@nestjs/schedule`, register `SchedulerModule`
13. Implement cron: send verification push at 11:00
14. Implement cron: auto-close verifications after 24h
15. Implement reliability metric updates

### Phase 4 — Frontend onboarding + home
16. Rewrite `app.routes.ts` with new route map + guards
17. Build 4 onboarding pages + `OnboardingStateService`
18. Rewrite `home.page.ts` + `EventCardComponent`
19. Build `auth.service.ts` + HTTP interceptor

### Phase 5 — Event detail + profile
20. Build `event-detail.page.ts` + vote buttons
21. Build `AnalyticsPanelComponent`
22. Rewrite `profile.page.ts`
23. Wire push notification token registration in `app.component.ts`

---

## 12. Key Business Rules (invariants to enforce in code)

| Rule | Enforced in |
|------|-------------|
| 1 vote per (user, event, week) | DB unique constraint + service validation |
| Vote not editable < 2h before event | `VotesService.canEdit()` check |
| Analytics only visible after voy/tal_vez vote | Guard in `GET /api/events/:id/analytics` |
| Verification auto-closes to `false` after 24h | Cron job in `SchedulerService` |
| Analytics always aggregated, never shows who voted | Never return user_id in analytics response |
| No photo, no bio, no age on user profile | Fields simply don't exist on entity |

---

## 13. Out of Scope (do not implement)

Per the functional document §2:
- Chat or messaging of any kind
- Friends / followers / social graph
- Profile photos
- Comments or reviews
- Payments or reservations
- Dancer rankings
- Admin panel for venues
- Dynamic threshold adjustment
- Private circles
- City map view
