import { build } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";
import { fileURLToPath } from "url";
import pgk from "../package.json" with { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve(path.dirname(__filename), "..");

const isDev = process.env.NODE_ENV === "development";
const GLOBAL_LIB_NAME = "DesignerDemoMaterial";

const envDefine = {
  __PACKAGE_VERSION__: JSON.stringify(pgk.version),
  __PACKAGE_NAME__: JSON.stringify(pgk.name),
  "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  __GLOBAL_LIB_NAME__: JSON.stringify(GLOBAL_LIB_NAME),
};

const wholeConfig = [
  defineConfig({
    plugins: [
      react(),
      dts({ tsconfigPath: path.resolve(__dirname, "./tsconfig.app.json") }),
    ],
    build: {
      watch: isDev ? {} : null,
      lib: {
        entry: path.resolve(__dirname, "src/index.tsx"),
        name: GLOBAL_LIB_NAME,
        fileName: (format) => {
          if (format === "es") {
            return "index.js";
          } else {
            return `index.${format}.js`;
          }
        },
        formats: isDev ? ["umd"] : ["es", "umd", "cjs"],
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          assetFileNames(chunkInfo) {
            if (chunkInfo.originalFileNames?.includes("style.css")) {
              return "style.css";
            }
            return chunkInfo.name!;
          },
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  }),
  defineConfig({
    plugins: [
      react(),
      dts({ tsconfigPath: path.resolve(__dirname, "./tsconfig.app.json") }),
    ],
    build: {
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, "src/meta.tsx"),
        name: `${GLOBAL_LIB_NAME}Meta`,
        fileName: (format) => {
          if (format === "es") {
            return "meta.js";
          } else {
            return `meta.${format}.js`;
          }
        },
        formats: isDev ? ["umd"] : ["es", "umd", "cjs"],
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          assetFileNames(chunkInfo) {
            if (chunkInfo.originalFileNames?.includes("style.css")) {
              return "style.css";
            }
            return chunkInfo.name!;
          },
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
    define: envDefine,
  }),
];

for (const config of wholeConfig) {
  await build(config);
}
