#!/bin/bash
# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║  vibrasbk — Production Setup                                               ║
# ║                                                                              ║
# ║  Interactive wizard that generates the .env file required to deploy the     ║
# ║  application layer (NestJS API + Redis) on top of the existing              ║
# ║  infrastructure stack (Traefik + PostgreSQL).                               ║
# ║                                                                              ║
# ║  Prerequisites:                                                              ║
# ║    • Docker + Docker Compose plugin                                          ║
# ║    • Infrastructure stack already running  (infra.docker-compose.yml)        ║
# ║      including the "proxy-network" Docker network                            ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

set -euo pipefail

# ── Colours ───────────────────────────────────────────────────────────────────
BOLD='\033[1m'
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
DIM='\033[2m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$PROJECT_DIR/.env"
APP_COMPOSE="$PROJECT_DIR/docker-compose.app.yml"

# ── Helpers ───────────────────────────────────────────────────────────────────
print_header() {
    echo ""
    echo -e "${CYAN}${BOLD}▸ $1${NC}"
    echo -e "${DIM}$(printf '%.0s─' {1..60})${NC}"
}

print_success() { echo -e "  ${GREEN}✔${NC}  $1"; }
print_error()   { echo -e "  ${RED}✖${NC}  $1"; }
print_info()    { echo -e "  ${BLUE}i${NC}  $1"; }
print_warning() { echo -e "  ${YELLOW}!${NC}  $1"; }

# Prompt wrapper: ask question, show default, read value.
# Usage: ask VAR_NAME "Question" "default"  [secret]
ask() {
    local var="$1" prompt="$2" default="${3:-}" secret="${4:-}"
    local display_default=""
    if [ -n "$default" ]; then
        if [ "$secret" = "secret" ]; then
            display_default=" ${DIM}[****]${NC}"
        else
            display_default=" ${DIM}[$default]${NC}"
        fi
    fi

    if [ "$secret" = "secret" ]; then
        echo -ne "  ${BOLD}${prompt}${NC}${display_default}: "
        read -rs value
        echo ""
    else
        echo -ne "  ${BOLD}${prompt}${NC}${display_default}: "
        read -r value
    fi

    if [ -z "$value" ] && [ -n "$default" ]; then
        value="$default"
    fi
    # Export into calling scope
    eval "${var}=\$value"
}

# Prompt yes/no — returns 0 for yes, 1 for no
ask_yn() {
    local prompt="$1" default="${2:-y}"
    local hint
    if [ "$default" = "y" ]; then hint="Y/n"; else hint="y/N"; fi
    echo -ne "  ${BOLD}${prompt}${NC} ${DIM}[$hint]${NC}: "
    read -r answer
    answer="${answer:-$default}"
    [[ "$answer" =~ ^[Yy] ]]
}

generate_secret() {
    # 48 random bytes → base64 → strip padding
    openssl rand -base64 48 2>/dev/null | tr -d '=+/' | head -c 64 || \
    cat /dev/urandom | tr -dc 'A-Za-z0-9' | head -c 64
}

# ── Preflight checks ──────────────────────────────────────────────────────────
preflight() {
    print_header "Preflight checks"

    if ! command -v docker &>/dev/null; then
        print_error "Docker not found. Install Docker Engine first."
        exit 1
    fi
    print_success "Docker $(docker --version | awk '{print $3}' | tr -d ',')"

    if ! docker compose version &>/dev/null; then
        print_error "Docker Compose plugin not found. Install it via: apt install docker-compose-plugin"
        exit 1
    fi
    print_success "Docker Compose $(docker compose version --short 2>/dev/null || echo '(ok)')"

    if ! docker network inspect proxy-network &>/dev/null; then
        print_warning "Docker network 'proxy-network' not found."
        print_info    "Make sure the infrastructure stack is running:"
        print_info    "  ./run.sh infra"
        echo ""
        if ! ask_yn "Continue anyway?" "n"; then
            echo ""; exit 0
        fi
    else
        print_success "Docker network 'proxy-network' exists"
    fi

    if ! docker ps --format '{{.Names}}' | grep -q '^postgres$'; then
        print_warning "Infrastructure PostgreSQL container (postgres) is not running."
        print_info    "Start it with:  ./run.sh infra"
        echo ""
        if ! ask_yn "Continue anyway?" "n"; then
            echo ""; exit 0
        fi
    else
        print_success "Infrastructure PostgreSQL is running (postgres)"
    fi
}

# ── Existing .env check ───────────────────────────────────────────────────────
check_existing_env() {
    if [ -f "$ENV_FILE" ]; then
        echo ""
        print_warning ".env already exists at $ENV_FILE"
        if ! ask_yn "Overwrite it?" "n"; then
            echo ""
            print_info "Keeping existing .env. Exiting."
            echo ""
            exit 0
        fi
        cp "$ENV_FILE" "${ENV_FILE}.bak.$(date +%Y%m%d_%H%M%S)"
        print_info "Backup saved → ${ENV_FILE}.bak.*"
    fi
}

# ── Prompt sections ───────────────────────────────────────────────────────────

collect_api_host() {
    print_header "API hostname"
    print_info "The public domain that Traefik will route to the NestJS API."
    print_info "Must have a DNS A record pointing to this server's IP."
    echo ""
    ask API_HOST "API_HOST" "api.yourdomain.com"
    while [ -z "$API_HOST" ] || [ "$API_HOST" = "api.yourdomain.com" ]; do
        print_warning "Please enter a real domain (e.g. api.vibras.app)"
        ask API_HOST "API_HOST" ""
    done
}

collect_database() {
    print_header "Database (existing PostgreSQL in infra stack)"
    print_info "These must match the credentials used in infra.docker-compose.yml."
    print_info "The API connects to container 'postgres' on the proxy-network."
    echo ""
    ask POSTGRES_USER     "POSTGRES_USER"     "postgres"
    ask POSTGRES_PASSWORD "POSTGRES_PASSWORD" ""         secret
    while [ -z "$POSTGRES_PASSWORD" ]; do
        print_warning "Database password is required."
        ask POSTGRES_PASSWORD "POSTGRES_PASSWORD" "" secret
    done
    ask POSTGRES_DB       "POSTGRES_DB"       "vibrasbk"
}

collect_jwt() {
    print_header "Application secrets"

    local generated
    generated=$(generate_secret)
    echo ""
    print_info "Leave JWT_SECRET blank to auto-generate a secure 64-char random secret."
    ask JWT_SECRET "JWT_SECRET" "" secret
    if [ -z "$JWT_SECRET" ]; then
        JWT_SECRET="$generated"
        print_success "JWT_SECRET auto-generated."
    fi
}

collect_firebase() {
    print_header "Firebase FCM (push notifications — optional)"
    print_info "Required only if you want attendance-verification push notifications."
    print_info "Leave blank to skip — the API will boot fine without Firebase."
    echo ""

    if ask_yn "Configure Firebase?" "n"; then
        echo ""
        ask FIREBASE_PROJECT_ID      "Firebase Project ID"       ""
        ask FIREBASE_STORAGE_BUCKET  "Firebase Storage Bucket"   "${FIREBASE_PROJECT_ID:-}.appspot.com"
        echo ""
        print_info "Firebase Admin SDK credentials:"
        print_info "  Place your service-account JSON at:"
        print_info "    $PROJECT_DIR/firebase-service-account.json"
        print_info "  The API reads it via GOOGLE_APPLICATION_CREDENTIALS."
        echo ""
        FIREBASE_CREDENTIALS_PATH="$PROJECT_DIR/firebase-service-account.json"
        if [ ! -f "$FIREBASE_CREDENTIALS_PATH" ]; then
            print_warning "firebase-service-account.json not found yet."
            print_info    "Add it before starting the API."
        else
            print_success "firebase-service-account.json found."
        fi
        CONFIGURE_FIREBASE=true
    else
        FIREBASE_PROJECT_ID=""
        FIREBASE_STORAGE_BUCKET=""
        CONFIGURE_FIREBASE=false
    fi
}

# ── Write .env ────────────────────────────────────────────────────────────────
write_env() {
    print_header "Generating .env"

    local firebase_project_id="${FIREBASE_PROJECT_ID:-}"
    local firebase_storage_bucket="${FIREBASE_STORAGE_BUCKET:-}"
    local google_credentials_line=""
    if [ "${CONFIGURE_FIREBASE:-false}" = true ] && [ -f "$PROJECT_DIR/firebase-service-account.json" ]; then
        google_credentials_line="GOOGLE_APPLICATION_CREDENTIALS=/app/firebase-service-account.json"
    fi

    cat > "$ENV_FILE" <<EOF
# ─────────────────────────────────────────────────────────────────────────────
# vibrasbk — Production environment
# Generated by production-setup.sh on $(date -u +"%Y-%m-%dT%H:%M:%SZ")
# ─────────────────────────────────────────────────────────────────────────────

# ── API routing (Traefik) ─────────────────────────────────────────────────────
API_HOST=${API_HOST}

# ── PostgreSQL (infra stack — container: postgres) ──────────────────────────
POSTGRES_USER=${POSTGRES_USER}
POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
POSTGRES_DB=${POSTGRES_DB}

# ── Application secrets ───────────────────────────────────────────────────────
JWT_SECRET=${JWT_SECRET}

# ── Firebase FCM (optional — leave blank to disable) ─────────────────────────
FIREBASE_PROJECT_ID=${firebase_project_id}
FIREBASE_STORAGE_BUCKET=${firebase_storage_bucket}
${google_credentials_line}
EOF

    chmod 600 "$ENV_FILE"
    print_success ".env written  →  $ENV_FILE  (mode 600)"
}

# ── Validate DB connection ────────────────────────────────────────────────────
validate_db() {
    print_header "Validating database connection"

    if docker exec postgres pg_isready -U "$POSTGRES_USER" -q 2>/dev/null; then
        print_success "PostgreSQL is accepting connections"

        # Try to create the app database if it doesn't exist
        if ! docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" postgres \
                psql -U "$POSTGRES_USER" -lqt 2>/dev/null | cut -d'|' -f1 | grep -qw "$POSTGRES_DB"; then
            print_info "Database '$POSTGRES_DB' not found — creating..."
            docker exec -e PGPASSWORD="$POSTGRES_PASSWORD" postgres \
                psql -U "$POSTGRES_USER" -c "CREATE DATABASE \"${POSTGRES_DB}\";" >/dev/null \
                && print_success "Database '$POSTGRES_DB' created" \
                || print_warning "Could not create database — check permissions"
        else
            print_success "Database '$POSTGRES_DB' exists"
        fi
    else
        print_warning "Could not connect to postgres — skipping DB validation"
        print_info    "The API will attempt to connect on startup"
    fi
}

# ── Summary ───────────────────────────────────────────────────────────────────
print_summary() {
    echo ""
    echo -e "${CYAN}${BOLD}┌─ Configuration summary ────────────────────────────────────┐${NC}"
    echo -e "${CYAN}│${NC}  API_HOST          ${BOLD}${API_HOST}${NC}"
    echo -e "${CYAN}│${NC}  POSTGRES_DB       ${BOLD}${POSTGRES_DB}${NC}  (user: ${POSTGRES_USER})"
    echo -e "${CYAN}│${NC}  JWT_SECRET        ${DIM}[set]${NC}"
    if [ "${CONFIGURE_FIREBASE:-false}" = true ]; then
        echo -e "${CYAN}│${NC}  FIREBASE          ${BOLD}${FIREBASE_PROJECT_ID}${NC}"
    else
        echo -e "${CYAN}│${NC}  FIREBASE          ${DIM}disabled${NC}"
    fi
    echo -e "${CYAN}└────────────────────────────────────────────────────────────┘${NC}"
    echo ""
}

# ── Deploy ────────────────────────────────────────────────────────────────────
deploy() {
    print_header "Deploy"
    echo ""

    if ask_yn "Build and start the API container now?" "y"; then
        echo ""
        print_info "Running: docker compose --env-file .env -f docker-compose.app.yml up -d --build"
        echo ""
        (cd "$PROJECT_DIR" && docker compose --env-file .env -f "$APP_COMPOSE" up -d --build)
        echo ""
        print_success "API is up"
        print_info    "  Health:  https://${API_HOST}/api/health"
        print_info    "  Swagger: https://${API_HOST}/api/docs"
        print_info    "  Logs:    ./run.sh prod:logs"
        print_info    "  Stop:    ./run.sh prod:stop"
    else
        echo ""
        print_info "Skipped. Deploy later with:"
        print_info "  ./run.sh prod"
        print_info "  — or —"
        print_info "  docker compose --env-file .env -f docker-compose.app.yml up -d --build"
    fi
    echo ""
}

# ── Main ──────────────────────────────────────────────────────────────────────
main() {
    clear
    echo ""
    echo -e "${CYAN}${BOLD}  vibrasbk — Production Setup Wizard${NC}"
    echo -e "${DIM}  Sets up the application layer on top of the existing infrastructure.${NC}"
    echo ""

    preflight
    check_existing_env
    collect_api_host
    collect_database
    collect_jwt
    collect_firebase
    write_env
    validate_db
    print_summary
    deploy
}

main
