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

```bash
./run.sh              # Start API + frontend dev servers (default)
./run.sh stop         # Stop all dev servers
./run.sh logs         # Stream API and frontend logs
./run.sh status       # Show running status
./run.sh help         # Show usage
```

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
