#!/bin/bash

# A simple script to build and run the entire application using Docker Compose.

# --- Colors for Output ---
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}✅ Checking prerequisites...${NC}"

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "Error: docker could not be found. Please install Docker."
    exit 1
fi

# Check if Docker Compose is installed
if ! docker compose version &> /dev/null
then
    echo "Error: docker compose could not be found. Please install Docker with Compose."
    exit 1
fi

# Check if user can run Docker commands
if ! docker ps &> /dev/null
then
    echo -e "${RED}Error: Cannot connect to Docker daemon.${NC}"
    echo -e "Please make sure Docker is running and you have permission to use it."
    echo -e "You may need to:"
    echo -e "  1. Start Docker Desktop (if on macOS/Windows)"
    echo -e "  2. Add your user to the docker group: ${YELLOW}sudo usermod -aG docker \$USER${NC}"
    echo -e "  3. Or run with sudo: ${YELLOW}sudo ./start.sh${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites met. Starting the application...${NC}"

# Clean up any existing containers
echo -e "${YELLOW}Cleaning up existing containers...${NC}"
docker compose down --volumes

# Build and start the containers in detached mode (-d)
# The --build flag forces a rebuild of the images if the Dockerfiles have changed.
echo -e "${YELLOW}Building and starting containers...${NC}"
docker compose up --build -d

if [ $? -eq 0 ]; then
    echo -e "\n${GREEN}🚀 Application is starting!${NC}"
    echo -e "   - Frontend will be available at: ${YELLOW}http://localhost:5173${NC}"
    echo -e "   - Backend API will be available at: ${YELLOW}http://localhost:3000${NC}"
    echo -e "   - PostgreSQL database is running on port 5433"
    echo -e "\n${YELLOW}⏳ Please wait a moment for all services to be ready...${NC}"
    echo -e "To see logs, run: ${YELLOW}docker compose logs -f${NC}"
    echo -e "To stop the application, run: ${YELLOW}docker compose down${NC}\n"
else
    echo -e "\n${RED}❌ Docker Compose failed to start.${NC}"
    echo -e "Try running: ${YELLOW}docker compose logs${NC} to see what went wrong."
    exit 1
fi