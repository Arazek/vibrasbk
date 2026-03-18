# Development Guide

## Architecture Overview

### Monorepo Structure

```
vibrasbk/
├── apps/
│   ├── mobile-app/       # Ionic Angular SPA (Capacitor)
│   └── api/              # NestJS REST API
├── libs/
│   └── shared-types/     # Shared TypeScript interfaces
├── docker-compose.yml            # Dev extras (Redis)
├── docker-compose.app.yml        # App container (NestJS)
└── infra.docker-compose.yml      # Infra (Traefik, Postgres, Keycloak…)
```

### Backend Architecture

```
HTTP Request
    ↓
Guard (JwtAuthGuard / AdminGuard)
    ↓
Controller → Service → TypeORM Repository
    ↓
PostgreSQL (synchronize: true in dev)
```

### Frontend Architecture

```
Ionic Pages (standalone components)
    ↓
Services (HTTP via authInterceptor)
    ↓
Angular Router (guards: authGuard, onboardingGuard, adminGuard)
```

---

## Backend Module Structure

```
apps/api/src/modules/[feature]/
├── entities/
│   └── feature.entity.ts
├── dtos/
│   ├── create-feature.dto.ts
│   └── update-feature.dto.ts
├── feature.service.ts
├── feature.controller.ts
└── feature.module.ts
```

### Existing Modules

| Module | Purpose | Key Endpoints |
|--------|---------|---------------|
| `auth` | JWT auth (email + bcrypt) | `POST /api/auth/register`, `POST /api/auth/login` |
| `users` | User profile | `GET/PATCH /api/users/profile` |
| `venues` | Dance venues | `GET /api/venues` (public), admin CRUD |
| `events` | Recurring + punctual events (STI) | `GET /api/events/week`, `GET /api/events/:id` |
| `votes` | Intention votes + analytics | `POST /api/votes`, `PATCH /api/votes/:id`, `POST /api/votes/verify` |
| `dance-styles` | DB-managed dance styles | `GET /api/dance-styles` (public), admin CRUD |
| `academias` | Dance schools | `GET /api/academias` (public), admin CRUD |
| `notifications` | FCM push (internal) | — |
| `scheduler` | Cron jobs (attendance verification) | — |

### Adding a New API Endpoint

**Step 1: Create DTO**
```typescript
// apps/api/src/modules/feature/dtos/create-feature.dto.ts
import { IsString } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  name: string;
}
```

**Step 2: Create Service Method**
```typescript
@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature)
    private repo: Repository<Feature>
  ) {}

  async create(dto: CreateFeatureDto): Promise<Feature> {
    return this.repo.save(this.repo.create(dto));
  }
}
```

**Step 3: Create Controller Endpoint**
```typescript
@Post()
@UseGuards(JwtAuthGuard)
async create(@Body() dto: CreateFeatureDto) {
  return this.service.create(dto);
}
```

**Step 4: Register Module in `app.module.ts`**
```typescript
imports: [
  // ...existing
  FeatureModule,
]
```

### Authentication Guards

- `@UseGuards(JwtAuthGuard)` — requires valid JWT
- `@UseGuards(JwtAuthGuard, AdminGuard)` — requires JWT + `rol === 'admin'`
- `@Public()` — marks endpoint as public (skips JwtAuthGuard)

JWT payload shape: `{ sub: user.id, alias: user.alias, role: user.role }`

Access in controller: `@Request() req` → `req.user.id`, `req.user.role`

---

## Frontend Structure

```
apps/mobile-app/src/app/
├── pages/
│   ├── login/
│   ├── onboarding/{ciudad,rol,nivel,estilos}/
│   ├── tabs/                   # Bottom tab bar shell
│   ├── home/                   # Weekly agenda
│   ├── event-detail/           # Vote + analytics
│   ├── profile/
│   └── admin/{home,events,venues,estilos,academias}/
├── components/
│   ├── event-card/
│   └── analytics-panel/
├── services/
│   ├── auth.service.ts
│   ├── events.service.ts
│   ├── votes.service.ts
│   ├── profile.service.ts
│   ├── admin.service.ts
│   └── onboarding-state.service.ts
├── guards/
│   ├── auth.guard.ts           # → /login if no token
│   ├── onboarding.guard.ts     # → /tabs/home if already authenticated
│   └── admin.guard.ts          # → /tabs/home if not admin
├── interceptors/
│   └── auth.interceptor.ts     # Attaches Authorization: Bearer header
└── pipes/
    └── replace.pipe.ts         # _ → space
```

### Route Map

```
/                         → redirect to /tabs/home
/login                    → LoginPage
/onboarding/ciudad        → OnboardingCiudadPage    (onboardingGuard)
/onboarding/rol           → OnboardingRolPage        (onboardingGuard)
/onboarding/nivel         → OnboardingNivelPage      (onboardingGuard)
/onboarding/estilos       → OnboardingEstilosPage    (onboardingGuard)
/tabs                     → TabsPage (shell)          (authGuard)
  /tabs/home              → HomePage
  /tabs/profile           → ProfilePage
/event/:id                → EventDetailPage           (authGuard)
/admin                    → AdminHomePage             (adminGuard)
  /admin/events           → AdminEventsPage
  /admin/venues           → AdminVenuesPage
  /admin/estilos          → AdminEstilosPage
  /admin/academias        → AdminAcademiasPage
**                        → redirect to /tabs/home
```

### Adding a New Frontend Page

**Step 1: Create the page component**
```typescript
// apps/mobile-app/src/app/pages/my-page/my-page.page.ts
import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>My Page</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content></ion-content>
  `,
})
export class MyPage implements OnInit {
  ngOnInit() {}
}
```

**Step 2: Add to `app.routes.ts`**
```typescript
{
  path: 'my-page',
  loadComponent: () =>
    import('./pages/my-page/my-page.page').then((m) => m.MyPage),
  canActivate: [authGuard],  // if auth required
},
```

### Adding a New Frontend Service

```typescript
// apps/mobile-app/src/app/services/feature.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class FeatureService {
  private url = `${environment.apiUrl}/feature`;

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(this.url);
  }
}
```

The `authInterceptor` automatically attaches the `Authorization: Bearer` header to all requests — no need to do it manually in services.

---

## Shared Types

Shared TypeScript types live in `libs/shared-types/src/index.ts` and are imported via:

```typescript
import { WeeklyEvent, UserProfile } from '@shared/types';
```

Path alias is configured in `tsconfig.base.json`:
```json
"@shared/types": ["libs/shared-types/src/index.ts"]
```

**Key types:** `Role`, `Level`, `VoteStatus`, `Vibe`, `EventType`, `UserProfile`, `Venue`, `WeeklyEvent`, `EventAnalytics`, `IntentionVote`, `AuthResponse`, `DanceStyle`, `Academia`

---

## Events — STI Pattern

All event types are stored in a single `recurring_events` table using TypeORM's **Single Table Inheritance** with a `tipo` discriminator column.

| Type | `tipo` value | Extra fields |
|------|-------------|--------------|
| `SocialEvent` | `'social'` | workshopIncluded, entryPrice, instructors |
| `IntensiveEvent` | `'intensive'` | title, level, price, instructors, endDate |
| `CongressEvent` | `'congress'` | title, locality, durationDays, prices, websiteUrl, endDate |

**Recurring vs punctual:**
- `dayOfWeek` is set (0–6) → recurring weekly event, projected dynamically to the current ISO week
- `dayOfWeek` is null → punctual event (intensive/congress), uses `startDate` directly

---

## Testing

```bash
# Type-check (run before committing)
nvm use 22
node ./node_modules/.bin/tsc --project apps/api/tsconfig.json --noEmit
node ./node_modules/.bin/tsc --project apps/mobile-app/tsconfig.app.json --noEmit

# Unit tests
npm run test:api
npm run test:app
```

---

## Useful Commands

```bash
# Development
npm run start:api        # Start backend (port 3333)
npm start                # Start frontend (port 4200)

# Build
npm run build:api        # Build backend
npm run build:app        # Build frontend

# Docker (app stack)
docker compose -f docker-compose.app.yml up -d
docker compose -f docker-compose.app.yml logs -f api

# Docker (infra stack)
docker compose -f infra.docker-compose.yml up -d
```

---

## Deployment Checklist

- [ ] `nvm use 22`
- [ ] TypeScript type-check passes on both `apps/api` and `apps/mobile-app`
- [ ] `.env` / `.env.local` has all required variables (JWT_SECRET, DB credentials, FCM key)
- [ ] `infra.docker-compose.yml` is up (Traefik + Postgres)
- [ ] `docker compose -f docker-compose.app.yml up -d --build`
- [ ] Verify `GET https://vibrasbk.duckdns.org/api/venues` returns 200
- [ ] For Android APK: `nx build mobile-app --configuration=production --skip-nx-cache` → `npx cap sync android` → build with Gradle

---

## Troubleshooting

### `Cannot find module '@shared/types'`
Check `tsconfig.base.json` has:
```json
"@shared/types": ["libs/shared-types/src/index.ts"]
```

### Module-not-found crash at runtime (TypeScript compiles fine)
You installed a package with `--prefix apps/api`. NX resolves all imports from root `node_modules`. Re-install at the workspace root: `npm install <pkg>` (no prefix).

### TypeORM unknown column
`synchronize: true` auto-migrates in dev — restart the API after entity changes.

### Angular Standalone component not rendering
Ensure the required Ionic components are listed in the `imports[]` array of the standalone component.
