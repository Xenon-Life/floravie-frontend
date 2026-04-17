import { defineConfig } from "vite";
import eslint from 'vite-plugin-eslint';
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), eslint()],
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
});
