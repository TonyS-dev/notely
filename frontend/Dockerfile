# Build Stage
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --quiet && npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-alpine AS production

# Install wget for health checks
RUN apk add --no-cache wget

# Create app directory
WORKDIR /app

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S reactjs -u 1001

# Install serve globally for serving static files
RUN npm install -g serve

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Change ownership to non-root user
RUN chown -R reactjs:nodejs /app
USER reactjs

# Expose port
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173/ || exit 1

# Start the application
CMD ["serve", "-s", "dist", "-l", "5173"]