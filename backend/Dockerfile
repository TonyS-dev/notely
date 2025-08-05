# Build Stage
FROM  node:current-alpine3.22 AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm ci --quiet && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM  node:current-alpine3.22 AS production

# Install wget for health checks
RUN apk add --no-cache wget

# Create app directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production --quiet && npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Change ownership to non-root user
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3000

# Health check - using wget to check if the app is responding
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

# Start the application
CMD [ "sh", "-c", "node dist/src/seed.js && node dist/src/main.js" ]