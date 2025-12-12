# Use Node.js 22 Alpine as base image for smaller size
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy TypeScript configuration
COPY tsconfig.json ./

# Copy source code
COPY src/ ./src/

# Install dev dependencies for building
RUN npm ci

# Build the TypeScript application
RUN npm run build

# Remove dev dependencies to reduce image size
RUN npm prune --production

# Expose port (default 3000)
EXPOSE 3000

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Change ownership of app directory
RUN chown -R nodejs:nodejs /app
USER nodejs

# Start the application
CMD ["npm", "start"]