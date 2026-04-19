import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permite el acceso desde cualquier IP
    port: 5173,
  },
  test: {
    environment: "jsdom",
    name: "jsdom",
    globals: true,
    css: true,
    setupFiles: "./src/test/setupTests.js",
  },
});
