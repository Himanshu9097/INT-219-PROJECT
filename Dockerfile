# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/Frontend/artfolio
COPY Frontend/artfolio/package*.json ./
RUN npm ci
COPY Frontend/artfolio/ ./
RUN npm run build

# Stage 2: Build the backend
FROM node:20-alpine AS backend-builder
WORKDIR /app/Backend
COPY Backend/package*.json ./
RUN npm ci
COPY Backend/ ./
RUN npm run build

# Stage 3: Create the runtime image
FROM node:20-alpine
WORKDIR /app

# Copy the built backend
COPY --from=backend-builder /app/Backend/dist /app/Backend/dist
COPY --from=backend-builder /app/Backend/package*.json /app/Backend/

# Copy the built frontend
COPY --from=frontend-builder /app/Frontend/artfolio/dist/public /app/Frontend/artfolio/dist/public

# Install production dependencies for the backend
WORKDIR /app/Backend
RUN npm ci --omit=dev

ENV NODE_ENV=production \
    PORT=5001

EXPOSE 5001

CMD ["npm", "run", "start"]
