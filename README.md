# Artfolio

A freelancer marketplace for artists built with an Express + MongoDB backend and a Vanilla JS + Vite frontend.

## Quick Start

### Backend
```bash
cd Backend
npm install
npm run dev
```

Backend entry file: `Backend/src/server.js`

### Frontend
```bash
cd Frontend/artfolio
npm install
npm run dev
```

Frontend config file: `Frontend/artfolio/vite.config.js`

### Default Local Ports
`Backend`: `5001`

`Frontend`: `5173`

The frontend proxies `/api` requests to the backend in development.

## Environment Files

Backend env file: `Backend/.env`

Required backend variables:
- `PORT`
- `MONGO_URI` or `MONGODB_URI`
- `SESSION_SECRET`
- `IMAGEKIT_PUBLIC_KEY`
- `IMAGEKIT_PRIVATE_KEY`

Frontend env file: `Frontend/artfolio/.env`

Frontend variables:
- `VITE_API_BASE_URL` for a separate backend deployment
- `BASE_PATH`
- `API_PROXY_TARGET`



lsof -nP -iTCP:5001 -sTCP:LISTEN
kill <PID>
npm run dev
