# Build stage
FROM node:22-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build the application
RUN npm run build

# Production stage - use nginx for static file serving
FROM nginx:alpine AS runtime

# Copy built assets to nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
RUN echo 'server { \
    listen 8787; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 8787

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
