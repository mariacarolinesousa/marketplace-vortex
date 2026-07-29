/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
    }),
  ],
});