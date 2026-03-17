# Mobile App Template — B2C Monorepo

A monorepo template for building B2C mobile applications using **Ionic 7**, **Angular 17**, **NestJS 10**, and **PostgreSQL**.

## 🔧 Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | Ionic + Angular (standalone) | Ionic 7 / Angular 17 |
| **State Management** | NgRx | 17 |
| **Styling** | Tailwind CSS + Ionic components | — |
| **Backend** | NestJS | 10 |
| **Real-time** | Socket.io (WebSocket gateway) | 4.7 |
| **Database** | PostgreSQL | 16+ |
| **ORM** | TypeORM | 0.3 |
| **Authentication** | JWT + Google OAuth2 | — |
| **Push Notifications** | Firebase FCM (ready) | — |
| **Monorepo** | Nx | 17.3 |
| **Language** | TypeScript | 5.4 |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 22** (recommended) or 20 — managed via [nvm](https://github.com/nvm-sh/nvm)
- **npm 10+**
- **PostgreSQL 16+** — running locally **or** via Docker

### 1. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Configure environment

```bash
cp .env.local.example .env.local   # or edit .env.local directly
```

`.env.local` minimum required:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=mobile_app

JWT_SECRET=super-secret-key-change-me
NODE_ENV=development
PORT=3333
```

### 3. Start PostgreSQL

**Option A — Docker (recommended if not already running):**

```bash
docker compose up -d postgres
```

**Option B — Local PostgreSQL already running:**  
`run.sh` will auto-create the `mobile_app` database if it doesn't exist.

### 4. Run everything

```bash
./run.sh
```

`run.sh` loads the correct Node version, checks dependencies, verifies PostgreSQL, then starts both servers:
- **NestJS API** — `npm run start:api` (watch mode, auto-reloads on save)
- **Angular frontend** — `npm start` (nx serve, HMR)

| Service | URL |
|---------|-----|
| **Frontend** | http://localhost:4200 |
| **Backend API** | http://localhost:3333 |
| **Health check** | http://localhost:3333/api/health |

---

## 🛠️ `run.sh` Commands

**Development:**

```bash
./run.sh              # Start API + frontend dev servers (default)
./run.sh stop         # Stop all dev servers
./run.sh logs         # Stream API and frontend logs
./run.sh status       # Show running status
./run.sh help         # Show usage
```

**Production:**

```bash
./run.sh prod          # Build images and start production stack
./run.sh prod:stop     # Stop all production containers
./run.sh prod:rebuild  # Rebuild images and restart
./run.sh prod:logs     # Tail production container logs
./run.sh prod:status   # Show container status
```

---

## 🚀 Production Deployment

The stack runs fully containerised behind **Traefik v3** as a reverse proxy, with automatic TLS via Let's Encrypt.

### Architecture

```
Internet
   │
   ▼ :80 / :443
 Traefik (v3.6)  ─────────────────────────────────────────┐
   │  (TLS termination via traefik.yml)        [proxy-network]
   ├─▶ Host(api.yourdomain.com)     →  API (NestJS :3333)
   ├─▶ Host(auth.yourdomain.com)    →  Keycloak (:8080)
   ├─▶ Host(pgadmin.yourdomain.com) →  pgAdmin (:80)
   ├─▶ Host(traefik.yourdomain.com) →  Traefik dashboard
   └─▶ Host(webhook.yourdomain.com) →  Webhook (:9000)
                                              │
                                        PostgreSQL + Redis
```

The deployment is split into two compose files:

| File | Contains | Restart frequency |
|------|----------|-------------------|
| `infra.docker-compose.yml` | Traefik, PostgreSQL, Keycloak, pgAdmin, Webhook | Once — stable infra |
| `docker-compose.app.yml` | NestJS API + Redis | Every release |

The app connects to `proxy-network` as an external network owned by the infra stack, so infra can stay up while the API is rebuilt.

### Prerequisites

- A Linux server with **Docker** and **Docker Compose v2**
- Ports **80** and **443** open in your firewall
- A DNS A record pointing `api.yourdomain.com` → your server IP

### 1. Configure environment

Create `.env` in the project root (this is the file Docker Compose reads by default in production):

```bash
cp .env.example .env   # then edit with real values
```

Minimum `.env` for production:

```env
# Traefik
API_HOST=api.yourdomain.com
TRAEFIK_DASHBOARD_HOST=traefik.yourdomain.com
TRAEFIK_DASHBOARD_AUTH=admin:$$2y$$...   # see htpasswd note in .env.example

# PostgreSQL (shared by app and Keycloak)
POSTGRES_USER=postgres
POSTGRES_PASSWORD=a-strong-random-password
POSTGRES_DB=mobile_app

# Keycloak
KEYCLOAK_HOSTNAME=auth.yourdomain.com
KEYCLOAK_REALM=vibras
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=change-me
KC_DB_NAME=keycloak
KC_DB_USERNAME=keycloak
KC_DB_PASSWORD=change-me

# pgAdmin
PGADMIN_HOSTNAME=pgadmin.yourdomain.com
PGADMIN_DEFAULT_EMAIL=admin@yourdomain.com
PGADMIN_DEFAULT_PASSWORD=change-me
PGADMIN_OAUTH_CLIENT_SECRET=change-me

# Webhook
WEBHOOK_HOSTNAME=webhook.yourdomain.com
WEBHOOK_SECRET=change-me

# API
JWT_SECRET=a-very-long-random-secret-change-me
```

See `.env.example` for the full list including optional Google OAuth and Firebase vars.

> **Note:** `.env` is gitignored. Never commit secrets.

### 2. Deploy

**First time — start everything:**

```bash
./run.sh prod
```

This will:
1. Validate `.env` and required variables
2. Create `traefik/acme.json` with `chmod 600` (required by Traefik)
3. Start Traefik, PostgreSQL and Redis (`docker-compose.yml`)
4. Build and start the API (`docker-compose.app.yml`)

**Subsequent releases — rebuild only the API (infra stays up):**

```bash
git pull
./run.sh prod:rebuild
```

**Infra only (initial server setup or infra changes):**

```bash
./run.sh infra          # start Traefik + DB + Redis
./run.sh infra:stop     # stop infra
```

### 3. Verify

```bash
curl https://api.yourdomain.com/api/health
./run.sh prod:status
./run.sh prod:logs
```

### Configuring the Traefik domain

The API domain is controlled by a single variable in `.env`:

```env
API_HOST=api.yourdomain.com
```

Traefik picks this up via the container label in `docker-compose.yml`:

```yaml
labels:
  - "traefik.http.routers.api.rule=Host(`${API_HOST}`)"
```

To change the domain: update `API_HOST` in `.env` and run `./run.sh prod:rebuild`.

### TLS notes

- TLS is configured via `traefik/traefik.yml` (part of the infra repo)
- Certificates are stored in the `traefik_certs` Docker volume (managed by Traefik)
- HTTP → HTTPS redirect is enabled automatically

---

## 📦 Project Structure

```
.
├── apps/
│   ├── mobile-app/              # Ionic + Angular frontend
│   │   └── src/app/
│   │       ├── modules/auth/    # Auth routes (login, signup)
│   │       ├── pages/           # home, chat, calendar, profile
│   │       ├── app.component.ts # Root component (IonApp)
│   │       └── app.routes.ts    # Route definitions
│   │
│   └── api/                     # NestJS backend
│       └── src/
│           ├── modules/
│           │   ├── auth/        # JWT + Google OAuth2
│           │   ├── users/       # User management
│           │   ├── chat/        # WebSocket gateway + service
│           │   ├── calendar/    # Calendar events CRUD
│           │   └── notifications/ # Firebase FCM (ready)
│           ├── app.module.ts    # TypeORM, JWT, all modules
│           └── main.ts          # NestJS bootstrap
│
├── libs/shared-types/           # Shared TypeScript interfaces
│
├── run.sh                       # One-command dev launcher
├── docker-compose.yml           # PostgreSQL + Redis
├── nx.json                      # Nx workspace config
├── tsconfig.base.json           # Root TS config
└── .env.local                   # Environment variables (gitignored)
```

---

## 📡 API Endpoints

### Auth
| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/auth/google` | Google OAuth login / signup |
| `POST` | `/api/auth/logout` | Logout |
| `POST` | `/api/auth/refresh-token` | Refresh JWT |

### Users
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/users/profile` | Current user profile |
| `PATCH` | `/api/users/profile` | Update profile |

### Chat
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/chat/conversations` | List conversations |
| `GET` | `/api/chat/conversations/:id/messages` | Conversation messages |
| `POST` | `/api/chat/messages` | Send a message |
| `WS` | `/chat` | Socket.io namespace |

### Calendar
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/calendar/events` | List events |
| `POST` | `/api/calendar/events` | Create event |
| `GET` | `/api/calendar/events/:id` | Get event |
| `PATCH` | `/api/calendar/events/:id` | Update event |
| `DELETE` | `/api/calendar/events/:id` | Delete event |

### Health
| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/health` | Server + DB status |

---

## 🗄️ Database

TypeORM is configured with `synchronize: true` in development — schema is kept in sync automatically. Entities:

| Entity | Table |
|--------|-------|
| `User` | `users` |
| `Message` | `messages` |
| `Conversation` | `conversations` |
| `CalendarEvent` | `calendar_events` |

Connect directly:

```bash
PGPASSWORD=postgres psql -h localhost -U postgres -d mobile_app
```

---

## 📱 Pages (Frontend)

| Route | Component | Description |
|-------|-----------|-------------|
| `/home` | `HomeComponent` | Landing page |
| `/auth/login` | `LoginComponent` | Login |
| `/auth/signup` | `SignupComponent` | Registration |
| `/chat` | `ChatComponent` | Messaging |
| `/calendar` | `CalendarComponent` | Calendar |
| `/profile` | `ProfileComponent` | User profile |

---

## 🏗️ Building

```bash
# Build Angular app for production (output → dist/apps/mobile-app)
npm run build:app

# Build NestJS API (output → dist/apps/api)
node_modules/.bin/nx build api
```

### Mobile (Capacitor)

```bash
npm run build:app
npx cap sync android
npx cap open android          # Opens Android Studio
```

See [docs/APK_BUILD_GUIDE.md](docs/APK_BUILD_GUIDE.md) for full APK instructions.

---

## 🧪 Testing

```bash
npm run test:app      # Angular unit tests (Jest)
npm run test:api      # NestJS unit tests (Jest)
npm test              # All tests
```

---

## 🐳 Docker

```bash
docker compose up -d postgres   # Start PostgreSQL only
docker compose up -d            # Start PostgreSQL + Redis
docker compose down             # Stop all containers
```

A `Dockerfile.api` is provided for containerising the NestJS API.

---

## 🔐 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | `5432` | PostgreSQL port |
| `DB_USERNAME` | `postgres` | PostgreSQL user |
| `DB_PASSWORD` | `postgres` | PostgreSQL password |
| `DB_NAME` | `mobile_app` | Database name |
| `JWT_SECRET` | *(required)* | JWT signing secret |
| `NODE_ENV` | `development` | Environment |
| `PORT` | `3333` | API port |
| `GOOGLE_CLIENT_ID` | *(optional)* | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | *(optional)* | Google OAuth secret |
| `FIREBASE_PROJECT_ID` | *(optional)* | Firebase project ID |

---

## 📚 Documentation

- [docs/DEVELOPMENT.md](docs/DEVELOPMENT.md) — Architecture, patterns, adding features, testing, deployment checklist
- [docs/APK_BUILD_GUIDE.md](docs/APK_BUILD_GUIDE.md) — Android APK build guide

---

## 📜 License

MIT
