# Development Conventions

> Applies to: `apps/api/`, `apps/mobile-app/`, `libs/shared-types/`
> When in doubt, check an existing module that follows these rules: `votes/` (backend), `event-card/` (frontend).

---

## 1. Language Policy

**All code is English.** This includes identifiers, field names, method names, class names, enum names, enum values, type aliases, CSS custom properties, and code comments.

The only exception is **user-facing content** — strings that appear in the UI (labels, placeholders, button text, toast messages, error messages shown to users). Those stay in Spanish because the app's audience is Spanish-speaking.

```typescript
// ✅ Code — English
dayOfWeek: number;
startTime: string;
status: VoteStatus;
role: Role;
level: Level;
styles: string[];
maxCapacity: number;

// ❌ Code — Spanish (never)
diaSemana: number;
horaInicio: string;
estado: VoteEstado;
rol: Rol;
nivel: Nivel;
estilos: string[];
aforoMaximo: number;
```

```typescript
// ✅ UI copy — Spanish (user-facing content)
'¿Irás a este evento?'
'Voto bloqueado — menos de 2h antes del evento.'
'Sin eventos esta semana'

// ❌ UI copy — English (never shown to the user in English)
'Are you going to this event?'
'Vote locked'
```

### Domain terminology translation

When the functional spec or product documentation uses a Spanish term, translate it to English in code using the mapping below. Use the English term everywhere — in entities, DTOs, services, types, CSS variables, and component properties.

| Spanish (spec / domain) | English (code) |
|------------------------|----------------|
| `diaSemana` | `dayOfWeek` |
| `horaInicio` | `startTime` |
| `horaPicoEstimado` | `estimatedPeakTime` |
| `semanaIso` | `isoWeek` |
| `ciudad` | `city` |
| `rol` | `role` |
| `nivel` | `level` |
| `estilos` | `styles` |
| `aforoMaximo` | `maxCapacity` |
| `nombre` | `name` |
| `activo` | `active` |
| `fotoUrl` | `photoUrl` |
| `proximaFecha` | `nextDate` |
| `fechaInicio` | `startDate` |
| `fechaFin` | `endDate` |
| `tallerIncluido` | `workshopIncluded` |
| `precioEntrada` | `entryPrice` |
| `instructores` / `profesores` | `instructors` |
| `titulo` | `title` |
| `localidad` | `locality` |
| `duracionDias` | `durationDays` |
| `precios` | `prices` |
| `enlaceWeb` | `websiteUrl` |
| `asistio` | `attended` |
| `timestampRespuesta` | `responseTimestamp` |
| `votosVoyTotal` | `totalGoingVotes` |
| `asistenciasConfirmadas` | `confirmedAttendances` |
| `fiabilidad` | `reliability` |
| `totalInteresados` | `totalInterested` |
| `ambienteColor` | `vibeColor` |
| `academiaId` | `academyId` |

### Enum name and value translation

| Spanish enum | English enum | Values |
|-------------|-------------|--------|
| `Rol` | `Role` | `'leader'`, `'follower'`, `'switch'`, `'admin'` (already English) |
| `Nivel` | `Level` | `'beginner'`, `'initiation'`, `'comfortable'`, `'intermediate'`, `'advanced'` |
| `VoteEstado` | `VoteStatus` | `'going'`, `'maybe'`, `'not_going'` |
| `Ambiente` | `Vibe` | `'quiet'`, `'normal'`, `'lively'`, `'packed'` |
| `TipoEvento` | `EventType` | `'social'`, `'intensive'`, `'congress'` |
| `RoleBalance.balance` | `RoleBalance.balance` | `'balanced'`, `'need_leaders'`, `'need_followers'` |

### CSS custom properties

CSS variables follow the same rule — English names.

| Spanish | English |
|---------|---------|
| `--ambiente-flojo` | `--vibe-quiet` |
| `--ambiente-normal` | `--vibe-normal` |
| `--ambiente-animado` | `--vibe-lively` |
| `--ambiente-muy-lleno` | `--vibe-packed` |
| `--ambiente-bg-*` | `--vibe-bg-*` |
| `--tipo-social-*` | `--type-social-*` |
| `--tipo-taller-*` | `--type-intensive-*` |
| `--tipo-congreso-*` | `--type-congress-*` |

---

## 2. Naming Conventions

### TypeScript — always camelCase

| Construct | Convention | Example |
|-----------|-----------|---------|
| Variables & properties | camelCase | `dayOfWeek`, `totalInterested` |
| Methods & functions | camelCase | `getWeeklyEvents()`, `castVote()` |
| Classes & interfaces | PascalCase | `RecurringEvent`, `WeeklyEvent` |
| Enums | PascalCase (name), values as string literals | `enum VoteStatus { GOING = 'going' }` |
| Constants | SCREAMING_SNAKE_CASE | `const DAY_NAMES = [...]` |
| Type aliases | PascalCase | `type Vibe = 'quiet' \| ...` |

### Database columns — snake_case, preserved via `name` option

TypeORM property names are camelCase; the DB column name is always explicitly declared as snake_case using `@Column({ name: '...' })`. This decouples TypeScript renames from DB schema changes.

```typescript
// ✅
@Column({ name: 'day_of_week', type: 'smallint', nullable: true })
dayOfWeek: number | null;

@Column({ name: 'start_time', type: 'time' })
startTime: string;

@ManyToOne(() => Venue, { eager: true })
@JoinColumn({ name: 'venue_id' })
venue: Venue;
```

### Files — kebab-case

```
recurring-event.entity.ts
votes.service.ts
event-card.component.ts
auth.interceptor.ts
```

### Angular selectors — `app-` prefix + kebab-case

```typescript
selector: 'app-event-card'
selector: 'app-analytics-panel'
```

### CSS custom properties — kebab-case with namespace prefix

```css
--lgui-surface-1
--ion-color-primary
--vibe-quiet
--type-social-bg
```

---

## 3. Backend Conventions (NestJS)

### Module structure

```
modules/feature/
├── entities/
│   └── feature.entity.ts
├── dtos/
│   ├── create-feature.dto.ts
│   └── update-feature.dto.ts
├── feature.service.ts
├── feature.controller.ts
└── feature.module.ts
```

### Authentication

- `JwtAuthGuard` is **not global**. Apply per-controller with `@UseGuards(JwtAuthGuard)`.
- Public endpoints use `@Public()`.
- Admin-only endpoints use `@UseGuards(JwtAuthGuard, AdminGuard)`.
- Access the authenticated user via `@Request() req` → `req.user.id`, `req.user.role`.

```typescript
// ✅ Protected controller
@UseGuards(JwtAuthGuard)
@Controller('votes')
export class VotesController { ... }

// ✅ Public endpoint inside a protected controller
@Public()
@Get('week')
getWeeklyEvents() { ... }
```

### DTOs

- Always use `class-validator` decorators.
- Every field must be explicitly typed — no `any`.
- Use `@IsOptional()` + `@IsX()` for optional fields.

### Services

- Services own all business logic. Controllers only route and delegate.
- Throw NestJS exceptions from services, never from controllers.
- Avoid circular dependencies: resolve via exported services and module imports.

### Error messages

- **User-facing exceptions** (reach HTTP response): Spanish.
- **Internal/dev logs**: English.

```typescript
// ✅ User-facing — Spanish
throw new ConflictException('Ya has votado para este evento esta semana.');
throw new NotFoundException('Evento no encontrado.');

// ✅ Internal — English
console.error('Failed to send FCM push:', error);
```

### NX package installation

Always at the workspace root:

```bash
# ✅
npm install some-package

# ❌
npm install --prefix apps/api some-package
```

---

## 4. Frontend Conventions (Angular + Ionic)

### Components — always standalone

```typescript
@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [CommonModule, IonCard, IonChip, ReplacePipe],
  template: `...`,
})
export class EventCardComponent { ... }
```

Import only the Ionic components used in the template. Never import `IonicModule`.

### Services — thin HTTP wrappers

No caching, no BehaviorSubjects, no state. Pages own local state.

The `authInterceptor` attaches `Authorization: Bearer` automatically — never add it manually in services.

### Guards

| Guard | Behaviour |
|-------|-----------|
| `authGuard` | Redirects to `/login` if no token |
| `onboardingGuard` | Redirects to `/tabs/home` if already authenticated |
| `adminGuard` | Redirects to `/tabs/home` if `role !== 'admin'` |

### Design tokens in styles

No hardcoded color, spacing, or radius values. Always use design tokens.

```scss
// ✅
background: var(--lgui-surface-1);
color: var(--lgui-text-4);
padding: var(--lgui-pad-md);
border-radius: var(--lgui-radius-default);

// ❌
background: #ffffff;
padding: 16px;
```

Use `--vibe-*` tokens for ambiente status colors and `--type-*` tokens for event type colors. See `docs/DESIGN_SYSTEM.md` for the full reference.

---

## 5. Shared Types (`libs/shared-types/src/index.ts`)

- Every type used across backend and frontend lives here.
- Import via `@shared/types`.
- Use string union type aliases — not TypeScript enums.
- All field names follow the English-only policy.

```typescript
// ✅
export type Vibe = 'quiet' | 'normal' | 'lively' | 'packed';
export type VoteStatus = 'going' | 'maybe' | 'not_going';

// ❌
export type Ambiente = 'flojo' | 'normal' | 'animado' | 'muy_lleno';
```

---

## 6. API Response Shape

JSON responses use **camelCase** field names. All field names follow the English-only policy.

---

## 7. Git & Commits

- One logical change per commit.
- Format: `<type>: <short description in English>`
  - Types: `feat`, `fix`, `refactor`, `style`, `chore`, `docs`
  - Examples: `feat: add congress event type`, `fix: correct DB_HOST in docker-compose`
- Never commit: `.env`, `uploads/`, `dist/`, `traefik/acme.json`
- Run `nvm use 22` before any build, type-check, or commit.
