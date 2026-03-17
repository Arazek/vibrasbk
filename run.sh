#!/bin/bash

# Mobile App Template — Development Launcher
# Starts NestJS API (watch mode) + Angular/Ionic frontend (nx serve)

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_PORT=3333
FRONTEND_PORT=4200
ENV_FILE="$PROJECT_DIR/.env.local"
PROD_ENV_FILE="$PROJECT_DIR/.env"
API_LOG=/tmp/api.log
APP_LOG=/tmp/app.log

# Load .env.local for DB checks
if [ -f "$ENV_FILE" ]; then
    set -a; source "$ENV_FILE"; set +a
fi
DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${POSTGRES_DB:-${DB_NAME:-mobile_app}}"
DB_USER="${POSTGRES_USER:-${DB_USERNAME:-postgres}}"
DB_PASS="${POSTGRES_PASSWORD:-${DB_PASSWORD:-postgres}}"

# ─── Helpers ──────────────────────────────────────────────────────────────────

print_success() { echo -e "${GREEN}✅${NC} $1"; }
print_error()   { echo -e "${RED}❌${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠️${NC}  $1"; }
print_info()    { echo -e "${BLUE}ℹ️${NC}  $1"; }

load_node() {
    if [ -f "$HOME/.nvm/nvm.sh" ]; then
        source "$HOME/.nvm/nvm.sh" --no-use
        nvm use 22 >/dev/null 2>&1 || nvm use 20 >/dev/null 2>&1 || true
    fi
    if ! command -v node &>/dev/null; then
        print_error "Node.js not found. Install it via nvm: nvm install 22"; exit 1
    fi
    local major; major=$(node -v | sed 's/v\([0-9]*\).*/\1/')
    if [ "$major" -lt 18 ]; then
        print_error "Node.js 18+ required (found $(node -v))"; exit 1
    fi
    print_success "Node.js $(node -v)"
}

check_postgres() {
    if ! command -v pg_isready &>/dev/null; then
        print_warning "pg_isready not found — skipping PostgreSQL pre-check"
        return 0
    fi
    if ! pg_isready -h "$DB_HOST" -p "$DB_PORT" -q 2>/dev/null; then
        print_warning "PostgreSQL not reachable at $DB_HOST:$DB_PORT"
        print_info  "  Start it with: docker compose up -d postgres"
        return 1
    fi
    # Auto-create DB if missing
    if ! PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" \
            -lqt 2>/dev/null | cut -d'|' -f1 | grep -qw "$DB_NAME"; then
        print_warning "Database '$DB_NAME' not found — creating..."
        PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" \
            -c "CREATE DATABASE $DB_NAME;" >/dev/null \
            && print_success "Database '$DB_NAME' created" \
            || { print_error "Failed to create database — check permissions"; return 1; }
    fi
    print_success "PostgreSQL ready ($DB_HOST:$DB_PORT/$DB_NAME)"
}

ensure_deps() {
    if [ ! -f "$PROJECT_DIR/node_modules/.bin/nx" ]; then
        print_info "Installing dependencies (--legacy-peer-deps)..."
        (cd "$PROJECT_DIR" && npm install --legacy-peer-deps --silent)
        print_success "Dependencies installed"
    fi
}

cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down...${NC}"
    kill "$API_PID" "$APP_PID" 2>/dev/null || true
    wait "$API_PID" "$APP_PID" 2>/dev/null || true
    echo -e "${GREEN}Done${NC}"
    exit 0
}

# ─── Commands ─────────────────────────────────────────────────────────────────

cmd_start() {
    trap cleanup SIGINT SIGTERM

    load_node

    if [ ! -f "$ENV_FILE" ]; then
        print_error ".env.local not found — see README for required variables"
        exit 1
    fi
    print_success ".env.local loaded"

    check_postgres || true
    ensure_deps

    echo ""
    echo -e "${BLUE}Starting development servers...${NC}"
    echo ""

    print_info "Starting NestJS API on :$BACKEND_PORT (watch mode)..."
    (cd "$PROJECT_DIR" && npm run start:api) >"$API_LOG" 2>&1 &
    API_PID=$!

    print_info "Starting Angular frontend on :$FRONTEND_PORT..."
    (cd "$PROJECT_DIR" && npm start) >"$APP_LOG" 2>&1 &
    APP_PID=$!

    echo ""
    echo -e "${GREEN}Dev servers starting — ready in ~15-30s${NC}"
    echo ""
    cat <<'EOF'
URLs:
   Frontend:    http://localhost:4200
   API:         http://localhost:3333
   Swagger:     http://localhost:3333/api/docs
   Health:      http://localhost:3333/api/health

Logs:
   API:         tail -f /tmp/api.log
   Frontend:    tail -f /tmp/app.log
   Both:        ./run.sh logs

   Stop:        Ctrl+C   or   ./run.sh stop

EOF

    # Monitor — alert if either process dies
    while true; do
        if ! kill -0 "$API_PID" 2>/dev/null; then
            print_error "API process stopped unexpectedly — last lines:"
            tail -n 20 "$API_LOG"
        fi
        if ! kill -0 "$APP_PID" 2>/dev/null; then
            print_error "Frontend process stopped unexpectedly — last lines:"
            tail -n 20 "$APP_LOG"
        fi
        sleep 5
    done
}

cmd_stop() {
    print_info "Stopping development servers..."
    pkill -f "nx serve api"        2>/dev/null && print_success "API stopped"      || print_warning "API was not running"
    pkill -f "nx serve mobile-app" 2>/dev/null && print_success "Frontend stopped" || print_warning "Frontend was not running"
    lsof -ti ":$BACKEND_PORT"  | xargs -r kill -9 2>/dev/null || true
    lsof -ti ":$FRONTEND_PORT" | xargs -r kill -9 2>/dev/null || true
    print_success "Done"
}

cmd_rebuild() {
    load_node
    print_info "Building Angular app (production)..."
    (cd "$PROJECT_DIR" && npm run build:app)
    print_success "Build complete — output: dist/apps/mobile-app/"
}

cmd_logs() {
    print_info "Streaming logs (Ctrl+C to stop)..."
    tail -f "$API_LOG" "$APP_LOG"
}

cmd_status() {
    echo ""
    if lsof -i ":$BACKEND_PORT" &>/dev/null; then
        print_success "NestJS API    — :$BACKEND_PORT  (PID $(lsof -ti ":$BACKEND_PORT" | head -1))"
    else
        print_error   "NestJS API    — not running"
    fi
    if lsof -i ":$FRONTEND_PORT" &>/dev/null; then
        print_success "Angular app   — :$FRONTEND_PORT  (PID $(lsof -ti ":$FRONTEND_PORT" | head -1))"
    else
        print_error   "Angular app   — not running"
    fi
    if command -v pg_isready &>/dev/null && pg_isready -h "$DB_HOST" -p "$DB_PORT" -q 2>/dev/null; then
        print_success "PostgreSQL    — $DB_HOST:$DB_PORT"
    else
        print_warning "PostgreSQL    — not reachable at $DB_HOST:$DB_PORT"
    fi
}

INFRA_COMPOSE="$PROJECT_DIR/infra.docker-compose.yml"
APP_COMPOSE="$PROJECT_DIR/docker-compose.app.yml"

_check_infra() {
    # proxy-network is created by the external infra stack (separate repo).
    # This repo cannot start it — verify it exists before attempting to deploy.
    if ! docker network inspect proxy-network >/dev/null 2>&1; then
        print_error "proxy-network does not exist."
        print_info  "  The infrastructure stack (Traefik, PostgreSQL, Keycloak…) is managed"
        print_info  "  in a separate repository and must be deployed on the server first."
        print_info  "  Once the infra stack is running, proxy-network will be available."
        exit 1
    fi
    if ! docker ps --format '{{.Names}}' | grep -q '^postgresdb$'; then
        print_warning "Container 'postgresdb' is not running — the API may fail to connect."
        print_info    "  Ensure the infrastructure stack is up before starting the application."
    fi
    print_success "Infrastructure network (proxy-network) detected"
}

_prod_check_env() {
    if [ ! -f "$PROD_ENV_FILE" ]; then
        print_error ".env not found — copy .env.example to .env and fill in production values"
        exit 1
    fi
    local api_host
    api_host=$(grep -E '^API_HOST=' "$PROD_ENV_FILE" | cut -d= -f2)
    if [ -z "$api_host" ]; then
        print_error "API_HOST is not set in .env"; exit 1
    fi
}

cmd_infra_up() {
    print_error "The infrastructure stack is external to this repository and cannot be started here."
    print_info  "  Deploy the infra repo on the server first, then use './run.sh prod' to start the app."
    exit 1
}

cmd_infra_stop() {
    print_error "The infrastructure stack is external to this repository and cannot be stopped here."
    exit 1
}

cmd_prod_up() {
    _prod_check_env
    _check_infra

    local api_host
    api_host=$(grep -E '^API_HOST=' "$PROD_ENV_FILE" | cut -d= -f2)

    print_info "Building and starting API..."
    (cd "$PROJECT_DIR" && docker compose --env-file .env -f "$APP_COMPOSE" up -d --build)

    echo ""
    print_success "Production stack is up"
    print_info "  API:    https://$api_host/api/health"
    print_info "  Logs:   ./run.sh prod:logs"
    print_info "  Stop:   ./run.sh prod:stop"
}

cmd_prod_stop() {
    print_info "Stopping API..."
    (cd "$PROJECT_DIR" && docker compose -f "$APP_COMPOSE" down)
    print_success "Application stopped (infrastructure still running)"
}

cmd_prod_logs() {
    print_info "Streaming production logs (Ctrl+C to stop)..."
    (cd "$PROJECT_DIR" && docker compose -f "$APP_COMPOSE" logs -f)
}

cmd_prod_status() {
    echo ""
    echo -e "${BLUE}Application:${NC}"
    (cd "$PROJECT_DIR" && docker compose -f "$APP_COMPOSE" ps)
}

cmd_prod_rebuild() {
    _prod_check_env
    _check_infra
    print_info "Rebuilding and restarting API..."
    (cd "$PROJECT_DIR" && docker compose --env-file .env -f "$APP_COMPOSE" up -d --build --force-recreate)
    print_success "Rebuild complete"
}

show_usage() {
    cat <<'EOF'
Usage: ./run.sh [COMMAND]

Development commands:
    start          Start API + frontend dev servers  (default)
    stop           Stop all dev servers
    rebuild        Production build of the Angular app
    logs           Tail API and frontend logs
    status         Show running status of all services

Production — application (requires external infra stack to be running first):
    prod           Build and start the API container (checks infra is up)
    prod:stop      Stop the API container
    prod:rebuild   Rebuild API image and restart
    prod:logs      Tail all production container logs
    prod:status    Show status of production containers

NOTE: Infrastructure (Traefik, PostgreSQL, Keycloak, pgAdmin, Webhook) is managed
      in a separate repository and must be deployed on the server independently.
      'infra' and 'infra:stop' are disabled here.

    help           Show this help

EOF
}

# ─── Entry point ──────────────────────────────────────────────────────────────

case "${1:-start}" in
    start)          cmd_start        ;;
    stop)           cmd_stop         ;;
    rebuild)        cmd_rebuild      ;;
    logs)           cmd_logs         ;;
    status)         cmd_status       ;;
    prod)           cmd_prod_up      ;;
    prod:stop)      cmd_prod_stop    ;;
    prod:rebuild)   cmd_prod_rebuild ;;
    prod:logs)      cmd_prod_logs    ;;
    prod:status)    cmd_prod_status  ;;
    infra)          cmd_infra_up     ;;
    infra:stop)     cmd_infra_stop   ;;
    help|--help|-h) show_usage       ;;
    *)
        print_error "Unknown command: $1"
        show_usage
        exit 1
        ;;
esac
