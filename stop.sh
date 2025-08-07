#!/bin/bash
# Stop and clean up the Docker environment for the full-stack notes management application.
# --- Colors for Output ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
# Function to print colored output
print_message() {
    echo -e "${2}${1}${NC}"
}
print_message "🛑 Stopping and cleaning up the Docker environment..." $BLUE

docker compose down -v

# Clean up unused images
docker system prune -f

# Clean up unused volumes
docker volume prune -f
