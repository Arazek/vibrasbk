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
FRONTEND_PORT=4444
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
DB_NAME="${POSTGRES_DB:-${DB_NAME:-vibrasbk}}"
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
   Frontend:    http://localhost:4444
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

cmd_test() {
    load_node
    check_postgres || { print_error "PostgreSQL must be running to execute integration tests"; exit 1; }
    ensure_deps

    local filter="${2:-}"
    echo ""
    echo -e "${BLUE}Running backend integration tests...${NC}"
    echo ""

    if [ -n "$filter" ]; then
        print_info "Filter: $filter"
        (cd "$PROJECT_DIR/apps/api" && DB_SCHEMA=vibrasbk_test npx jest --testPathPattern="$filter" --forceExit --runInBand 2>&1)
    else
        (cd "$PROJECT_DIR/apps/api" && DB_SCHEMA=vibrasbk_test npx jest --forceExit --runInBand 2>&1)
    fi

    local exit_code=$?
    echo ""
    if [ $exit_code -eq 0 ]; then
        print_success "All tests passed"
    else
        print_error "Tests failed (exit $exit_code)"
    fi
    return $exit_code
}

cmd_rebuild() {
    load_node
    print_info "Building Angular app (production)..."
    (cd "$PROJECT_DIR" && npm run build:app)
    print_success "Build complete — output: dist/apps/mobile-app/"
}

cmd_apk() {
    load_node
    ensure_deps

    local android_dir="$PROJECT_DIR/android"
    local apk_src="$android_dir/app/build/outputs/apk/debug/app-debug.apk"
    local apk_dest="$PROJECT_DIR/vibrasbk-debug.apk"

    # NODE_ENV must be unset — it interferes with NX cache/build
    unset NODE_ENV

    print_info "Step 1/3 — Building Angular app (production)..."
    (cd "$PROJECT_DIR" && ./node_modules/.bin/nx build mobile-app --configuration=production --skip-nx-cache) \
        || { print_error "Angular build failed"; exit 1; }
    print_success "Angular build complete"

    print_info "Step 2/3 — Syncing Capacitor..."
    if [ ! -d "$android_dir" ]; then
        print_info "Android platform not found — running 'cap add android' first..."
        (cd "$PROJECT_DIR" && npx cap add android) \
            || { print_error "Capacitor add android failed"; exit 1; }
        print_success "Android platform added"
    fi
    (cd "$PROJECT_DIR" && npx cap sync android) \
        || { print_error "Capacitor sync failed"; exit 1; }
    print_success "Capacitor sync complete"

    print_info "Step 3/3 — Building APK (assembleDebug)..."
    (cd "$android_dir" && ./gradlew assembleDebug --rerun-tasks) \
        || { print_error "Gradle build failed"; exit 1; }
    print_success "Gradle build complete"

    cp "$apk_src" "$apk_dest"
    print_success "APK ready: vibrasbk-debug.apk"
    print_info   "  Install: adb install -r vibrasbk-debug.apk"
}

cmd_install() {
    local build_first=false
    local apk_path="$PROJECT_DIR/vibrasbk-debug.apk"

    for arg in "$@"; do
        case "$arg" in
            --build|-b) build_first=true ;;
        esac
    done

    # Check adb is available
    if ! command -v adb &>/dev/null; then
        print_error "adb not found — install Android platform-tools and add to PATH"
        print_info  "  Ubuntu: sudo apt install android-tools-adb"
        print_info  "  Or download from: https://developer.android.com/tools/releases/platform-tools"
        exit 1
    fi

    # Check a device is connected
    local devices
    devices=$(adb devices | grep -v '^List' | grep -E 'device$' | wc -l)
    if [ "$devices" -eq 0 ]; then
        print_error "No device found via USB"
        print_info  "  1. Connect your phone via USB"
        print_info  "  2. Enable USB debugging: Settings → Developer options → USB debugging"
        print_info  "  3. Accept the RSA key prompt on the device"
        print_info  "  4. Verify with: adb devices"
        exit 1
    fi
    if [ "$devices" -gt 1 ]; then
        print_warning "Multiple devices connected — adb will use the first one"
        adb devices | grep -v '^List'
        echo ""
    fi

    # Optionally build first
    if [ "$build_first" = true ]; then
        print_info "Building APK before install (--build flag)..."
        cmd_apk
        echo ""
    fi

    # Check APK exists
    if [ ! -f "$apk_path" ]; then
        print_error "APK not found at vibrasbk-debug.apk"
        print_info  "  Build it first: ./run.sh apk"
        print_info  "  Or build + install in one step: ./run.sh install --build"
        exit 1
    fi

    print_info "Installing vibrasbk-debug.apk on device..."
    adb install -r "$apk_path" \
        && print_success "App installed successfully" \
        || { print_error "Install failed — check device screen for prompts"; exit 1; }
}

cmd_seed() {
    check_postgres || { print_error "PostgreSQL must be running to seed locations"; exit 1; }

    if ! command -v jq &>/dev/null; then
        print_error "jq is required for seeding — install it: sudo apt install jq"
        exit 1
    fi

    local schema="${DB_SCHEMA:-vibrasbk}"

    # Spanish-speaking countries we support (ISO codes)
    local INCLUDED_CODES="AR BO CL CO CR CU DO EC SV GT HN MX NI PA PY PE ES UY VE"
    # English names as used by countriesnow.space (must match exactly)
    declare -A ENGLISH_NAMES=(
        [AR]="Argentina" [BO]="Bolivia" [CL]="Chile" [CO]="Colombia"
        [CR]="Costa Rica" [CU]="Cuba" [DO]="Dominican Republic" [EC]="Ecuador"
        [SV]="El Salvador" [GT]="Guatemala" [HN]="Honduras" [MX]="Mexico"
        [NI]="Nicaragua" [PA]="Panama" [PY]="Paraguay" [PE]="Peru"
        [ES]="Spain" [UY]="Uruguay" [VE]="Venezuela"
    )

    print_info "Step 1/4 — Clearing existing countries and cities..."
    PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
        -c "TRUNCATE ${schema}.cities CASCADE; TRUNCATE ${schema}.countries CASCADE;" \
        >/dev/null && print_success "Tables cleared"

    print_info "Step 2/4 — Fetching countries from restcountries.com..."
    local countries_json
    countries_json=$(curl -sf "https://restcountries.com/v3.1/lang/spa?fields=name,cca2,capital,latlng,translations") \
        || { print_error "Failed to fetch countries from restcountries.com"; exit 1; }

    local country_count=0
    while IFS= read -r row; do
        local code name capital lat lng
        code=$(echo "$row" | jq -r '.cca2')
        # Skip if not in our supported list
        if ! echo "$INCLUDED_CODES" | grep -qw "$code"; then continue; fi
        name=$(echo "$row" | jq -r '.translations.spa.common // .name.common')
        capital=$(echo "$row" | jq -r '.capital[0] // ""')
        lat=$(echo "$row" | jq -r '.latlng[0] // "NULL"')
        lng=$(echo "$row" | jq -r '.latlng[1] // "NULL"')

        PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
            -c "INSERT INTO ${schema}.countries (id, name, code, capital, lat, lng)
                VALUES (gen_random_uuid(), \$\$${name}\$\$, '${code}', \$\$${capital}\$\$, ${lat}, ${lng})
                ON CONFLICT (code) DO NOTHING;" >/dev/null
        country_count=$((country_count + 1))
    done < <(echo "$countries_json" | jq -c '.[]')
    print_success "Seeded ${country_count} countries"

    print_info "Step 3/4 — Fetching cities from countriesnow.space..."
    local cities_json
    cities_json=$(curl -sf "https://countriesnow.space/api/v0.1/countries") \
        || { print_error "Failed to fetch cities from countriesnow.space"; exit 1; }

    print_info "Step 4/4 — Inserting cities (this may take a minute)..."
    local city_count=0
    for code in $INCLUDED_CODES; do
        local english_name="${ENGLISH_NAMES[$code]}"
        local country_id
        country_id=$(PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
            -tAc "SELECT id FROM ${schema}.countries WHERE code='${code}';")
        if [ -z "$country_id" ]; then continue; fi

        # Extract cities for this country
        local cities
        cities=$(echo "$cities_json" | jq -r --arg name "$english_name" \
            '.data[] | select(.country | ascii_downcase == ($name | ascii_downcase)) | .cities[]' 2>/dev/null)
        if [ -z "$cities" ]; then continue; fi

        # Build batch INSERT
        local values=""
        while IFS= read -r city; do
            city=$(echo "$city" | sed "s/'/''/g")  # escape single quotes
            [ -z "$city" ] && continue
            values="${values}(gen_random_uuid(), '${city}', '${country_id}'),"
        done <<< "$cities"

        values="${values%,}"  # strip trailing comma
        if [ -n "$values" ]; then
            PGPASSWORD="$DB_PASS" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" \
                -c "INSERT INTO ${schema}.cities (id, name, country_id) VALUES ${values} ON CONFLICT DO NOTHING;" \
                >/dev/null
            local n
            n=$(echo "$cities" | wc -l)
            city_count=$((city_count + n))
            print_success "  ${english_name}: ${n} cities"
        fi
    done

    echo ""
    print_success "Seeding complete — ${country_count} countries, ~${city_count} cities"
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
    test           Run backend integration tests (requires PostgreSQL)
    test <pattern> Run only tests matching a file name pattern
    rebuild        Production build of the Angular app
    apk            Build Android debug APK → vibrasbk-debug.apk in project root
    install        Install vibrasbk-debug.apk on a USB-connected device (requires adb)
    install --build  Build the APK first, then install
    logs           Tail API and frontend logs
    status         Show running status of all services
    seed           Re-seed countries and cities from external APIs (requires jq)

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
    test)           cmd_test "$@"    ;;
    rebuild)        cmd_rebuild      ;;
    apk)            cmd_apk          ;;
    install)        cmd_install "$@" ;;
    logs)           cmd_logs         ;;
    status)         cmd_status       ;;
    seed)           cmd_seed         ;;
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
