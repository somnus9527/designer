import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: [
        // 允许访问整个 monorepo 目录
        path.resolve(__dirname, ".."),
      ],
    },
  },
});
