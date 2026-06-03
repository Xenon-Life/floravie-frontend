import { defineConfig, loadEnv } from "vite";
import eslint from 'vite-plugin-eslint';
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const backendUrl = env.VITE_BACKEND_URL || "/api";

  return {
  plugins: [react(), eslint()],
  define: {
    "import.meta.env.VITE_BACKEND_URL": JSON.stringify(backendUrl),
  },
  server: {
    proxy: {
      // Dev: send /api/* to Express so you never get Vite's "Cannot GET /api/..."
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      // Socket.IO (not under /api)
      "/socket.io": {
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
});
