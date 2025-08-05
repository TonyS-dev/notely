#!/bin/bash

# Check if Docker is installed
if ! command -v docker &> /dev/null
then
    echo "🔴 Docker is not installed."
    echo "Please install Docker before running this script."
    echo "See the README.md file for instructions."
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose &> /dev/null
then
    echo "🔴 Docker Compose is not available or not working."
    echo "Please ensure your Docker installation includes Docker Compose V2."
    echo "See the README.md file for instructions."
    exit 1
fi

echo "✅ Prerequisites met. Starting the application..."

# Start all services using Docker Compose
# The --build flag ensures images are rebuilt if the Dockerfile or code changes.
docker compose up --build

echo "🚀 Application is running!"