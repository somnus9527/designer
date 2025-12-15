import fs from "fs";
import path from "path";

export function copyRenderPlugin() {
  return {
    name: "copy-render-plugin",

    configResolved() {
      const fromDir = path.resolve("node_modules/@chamn/render/dist");
      const toDir = path.resolve("public");
      if (!fs.existsSync(toDir)) {
        fs.mkdirSync(toDir, { recursive: true });
      }
      const files = [
        ["index.umd.js", "render.umd.js"],
        ["index.umd.js.map", "render.umd.js.map"],
      ];

      for (const [src, dest] of files) {
        const from = path.join(fromDir, src);
        const to = path.join(toDir, dest);

        if (!fs.existsSync(from)) {
          console.warn(`[copy-render-plugin] not found: ${from}`);
          continue;
        }

        fs.copyFileSync(from, to);
      }

      console.log("[copy-render-plugin] render.umd copied");
    },
  };
}
