#!/bin/sh
# Simple health check for the application
curl -f http://${BACKEND_HOST}:${BACKEND_PORT}/api/health || curl -f http://${BACKEND_HOST}:${BACKEND_PORT}/ || exit 1