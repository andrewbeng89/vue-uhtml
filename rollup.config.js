import postcss from "rollup-plugin-postcss";
import postcssImport from "postcss-import";
import tailwind from "tailwindcss";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import fg from "fast-glob";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const outputDir = process.env.NODE_ENV === "dev" ? "./dev" : "./dist";

export default [
  {
    input: "src/index.js",
    output: {
      dir: outputDir,
      sourcemap: true,
      format: "esm",
    },
    plugins: [
      {
        name: "watch-external",
        async buildStart() {
          const files = await fg("src/**/*");
          files.forEach((file) => {
            this.addWatchFile(file);
          });
        },
      },
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      nodeResolve(),
      terser(),
      copy({
        targets: [
          {
            src: "./src/index.html",
            dest: outputDir,
          },
        ],
      }),
      ...(process.env.NODE_ENV === "production"
        ? []
        : [serve("dev"), livereload("dev")]),
    ],
  },
  {
    input: "src/ui-components.js",
    output: {
      file:
        process.env.NODE_ENV === "dev"
          ? "dev/ui-components.js"
          : "dist/ui-components.js",
    },
    plugins: [
      nodeResolve(),
      postcss({
        plugins: [tailwind(), postcssImport()],
        module: false,
        minimize: true,
      }),
      terser(),
    ],
    external: ["./index.js"],
  },
];
