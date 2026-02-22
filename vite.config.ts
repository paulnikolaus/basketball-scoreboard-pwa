import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Basketball Scoreboard",
        short_name: "Scoreboard",
        description: "Basketball game & shot clock",
        theme_color: "#111111",
        background_color: "#111111",
        display: "standalone",
        start_url: "/basketball-scoreboard-pwa/",
        icons: [
          {
            src: "icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  base: "/basketball-scoreboard-pwa/",
});
