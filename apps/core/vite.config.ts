import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
import path from "path";
import { copyRenderPlugin } from "./plugins/copy-render-plugin";

export default defineConfig({
  plugins: [copyRenderPlugin(), react(), monacoEditorPlugin({})],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/Designer.tsx"),
      name: "DesignerCore",
      fileName: (format) => `designer-core.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
