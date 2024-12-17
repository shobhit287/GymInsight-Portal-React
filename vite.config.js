import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000, // Port for production preview
  },
  resolve: {
    alias: {
      src: path.resolve(path.dirname(import.meta.url).replace("file://", ""), "./src"),
    },
  },
});