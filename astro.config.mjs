import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://alexanderqchen.com",
  integrations: [tailwind(), react()],
  adapter: vercel(),
  output: "static",
  vite: {
    server: {
      allowedHosts: ["clawdbots-macbook-pro.tail4a6acb.ts.net"],
    },
  },
});
