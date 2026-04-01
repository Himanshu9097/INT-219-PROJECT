FROM node:20-alpine AS base
WORKDIR /app

# Install backend deps
COPY Backend/package*.json ./Backend/
RUN cd Backend && npm ci

# Copy backend source
COPY Backend ./Backend

# Build backend
WORKDIR /app/Backend
ENV NODE_ENV=production
RUN npm run build

# Runtime image
FROM node:20-alpine
WORKDIR /app

# Only copy the built backend and minimal files
COPY --from=base /app/Backend/dist ./dist
COPY --from=base /app/Backend/package*.json ./
COPY --from=base /app/Backend/.env.example ./ ./

RUN npm ci --omit=dev

ENV NODE_ENV=production \
    PORT=5001

EXPOSE 5001

CMD ["npm", "run", "start"]
