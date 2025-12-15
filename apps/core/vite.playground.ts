import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monacoEditor from "vite-plugin-monaco-editor";
import path from "path";
import { copyRenderPlugin } from "./plugins/copy-render-plugin";

const monacoEditorPlugin =
  typeof monacoEditor === "function"
    ? monacoEditor
    : (monacoEditor as any).default;
export default defineConfig({
  // root: "playground",
  plugins: [copyRenderPlugin(), react(), monacoEditorPlugin({})],
  server: {
    fs: {
      allow: [
        // 允许访问整个 monorepo 目录
        path.resolve(__dirname, ".."),
      ],
    },
  },
  resolve: {
    alias: {
      "@designer": path.resolve(__dirname, "src"),
    },
  },
});
