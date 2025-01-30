import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        target: "https://verizon.hiddenplanet.io/vds-cont/api/v1",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
