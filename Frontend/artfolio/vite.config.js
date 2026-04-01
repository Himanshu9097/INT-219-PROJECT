import { defineConfig, loadEnv } from "vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const rawPort = env.PORT ?? "5173";
  const port = Number(rawPort);

  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Invalid PORT value: "${rawPort}"`);
  }

  const basePath = env.BASE_PATH ?? "/";
  const apiProxyTarget = env.API_PROXY_TARGET ?? "http://localhost:5001";

  return {
    base: basePath,
    root: path.resolve(import.meta.dirname),
    build: {
      rollupOptions: {
        input: {
          index: path.resolve(import.meta.dirname, "index.html"),
          login: path.resolve(import.meta.dirname, "login.html"),
          register: path.resolve(import.meta.dirname, "register.html"),
          browse: path.resolve(import.meta.dirname, "browse.html"),
          dashboard: path.resolve(import.meta.dirname, "dashboard.html"),
          profile: path.resolve(import.meta.dirname, "profile.html"),
          artwork: path.resolve(import.meta.dirname, "artwork.html"),
        },
      },
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: { strict: false },
      proxy: {
        "/api": {
          target: apiProxyTarget,
          changeOrigin: true,
        },
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
