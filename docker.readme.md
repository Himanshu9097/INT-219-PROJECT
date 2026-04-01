## Run the backend with Docker

Prereqs: Docker Desktop/Engine installed.

1) Build the image (from repo root):
```bash
docker build -t artfolio-backend .
```

2) Run the container (mount your env file so real secrets are used):
```bash
docker run --rm \
  --env-file Backend/.env \
  -p 5001:5001 \
  artfolio-backend
```

The API will be available at `http://localhost:5001`.

## Notes
- The image is production-oriented: it runs the built backend (`npm run build` → `dist/server.mjs`) with `NODE_ENV=production`.
- If you want a different port, set `PORT` in `Backend/.env` and match the `-p` mapping.
- Frontend is not containerized here; run `npm install && npm run dev` inside `Frontend/artfolio` or serve its build separately.
- To rebuild after code changes: re-run the `docker build` command. For faster dev reloads, continue using `npm run dev` locally.
