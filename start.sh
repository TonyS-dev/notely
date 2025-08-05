#!/bin/bash

# A simple script to build and run the entire application using Docker Compose.

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

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

print_message "🐳 Full-Stack Notes Management Application - Docker Setup" $BLUE
print_message "==========================================================" $BLUE

# Check prerequisites
print_message "📋 Checking prerequisites..." $YELLOW

if ! command_exists docker; then
    print_message "❌ Docker is not installed. Please install Docker first." $RED
    print_message "   Visit: https://docs.docker.com/engine/install/" $YELLOW
    exit 1
fi

if ! command_exists docker-compose && ! docker compose version >/dev/null 2>&1; then
    print_message "❌ Docker Compose is not available. Please install Docker Compose." $RED
    exit 1
fi

print_message "✅ Docker is installed" $GREEN

# Check if Docker daemon is running
if ! docker info >/dev/null 2>&1; then
    print_message "❌ Docker daemon is not running. Please start Docker first." $RED
    exit 1
fi

print_message "✅ Docker daemon is running" $GREEN

# Stop any existing containers
print_message "🛑 Stopping existing containers..." $YELLOW
docker compose down -v >/dev/null 2>&1

# Clean up old images (optional)
print_message "🧹 Cleaning up old images..." $YELLOW
docker system prune -f >/dev/null 2>&1

# Build and start services
print_message "🏗️  Building and starting services..." $YELLOW
print_message "   This may take a few minutes on first run..." $YELLOW

if docker compose up --build -d; then
    print_message "✅ All services started successfully!" $GREEN
    
    # Wait for services to be ready
    print_message "⏳ Waiting for services to be ready..." $YELLOW
    sleep 10
    
    # Check service health
    if docker compose ps | grep -q "healthy\|running"; then
        print_message "🎉 Application is ready!" $GREEN
        print_message "" $NC
        print_message "📱 Access the application:" $BLUE
        print_message "   Frontend: http://localhost:5173" $GREEN
        print_message "   Backend API: http://localhost:3000" $GREEN
        print_message "" $NC
        print_message "👤 Default login credentials:" $BLUE
        print_message "   Email: tonys-dev@mail.com | Password: password123" $YELLOW
        print_message "" $NC
        print_message "📋 Useful commands:" $BLUE
        print_message "   View logs: docker compose logs -f" $YELLOW
        print_message "   Stop: ./stop.sh" $YELLOW
        print_message "   Restart: docker compose restart" $YELLOW
    else
        print_message "⚠️  Services started but may still be initializing..." $YELLOW
        print_message "   Check logs with: docker compose logs -f" $YELLOW
    fi
else
    print_message "❌ Failed to start services. Check the logs:" $RED
    print_message "   docker compose logs" $YELLOW
    exit 1
fi