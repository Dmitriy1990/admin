import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import paths from "vite-tsconfig-paths";

export default defineConfig({
  envPrefix: "REACT_APP_",
  base: "/admin",
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "https://dev.planb.buzz/",
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    outDir: "./build",
  },
  plugins: [react(), paths(), svgr()],
});
