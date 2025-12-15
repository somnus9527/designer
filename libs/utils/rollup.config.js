import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts", // 单入口
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.esm.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(), // 解析 node_modules
    commonjs(), // 转换 CJS -> ESM
    typescript({ tsconfig: "./tsconfig.json" }),
    terser(), // 可选压缩
  ],
  external: [
    // 这里列出不打包的依赖，例如三方库 lodash
    // "lodash",
  ],
};
