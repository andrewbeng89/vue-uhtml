import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import copy from "rollup-plugin-copy";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import fg from "fast-glob";
import { babel, getBabelOutputPlugin } from "@rollup/plugin-babel";

import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const outputDir = process.env.NODE_ENV === "dev" ? "./dev" : "./dist";
const outputUMD =
  process.env.NODE_ENV === "dev"
    ? "dev/index.legacy.js"
    : "dist/index.legacy.js";
const outputESM =
  process.env.NODE_ENV === "dev" ? "dev/index.esm.js" : "dist/index.esm.js";

const pluginWatch = () => ({
  name: "watch-external",
  async buildStart() {
    const files = await fg("src/**/*");
    files.forEach((file) => {
      this.addWatchFile(file);
    });
  },
});

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: outputESM,
        sourcemap: true,
        format: "esm",
        plugins: [
          getBabelOutputPlugin({
            presets: [["@babel/preset-modules"]],
          }),
        ],
      },
    ],
    plugins: [
      pluginWatch(),
      commonjs(),
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: { esmodules: true },
              bugfixes: true,
              loose: true,
            },
          ],
        ],
        babelHelpers: "bundled",
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      nodeResolve(),
      terser(),
      ...(process.env.NODE_ENV === "dev"
        ? [
            copy({
              targets: [
                {
                  src: "./src/index.html",
                  dest: outputDir,
                },
              ],
            }),
          ]
        : []),
      ...(process.env.NODE_ENV === "production"
        ? []
        : [serve("dev"), livereload("dev")]),
    ],
  },
  {
    input: "src/index.legacy.js",
    output: [
      {
        file: outputUMD,
        sourcemap: true,
        name: "VueUhtml",
        entryFileNames: "[name].legacy.js",
        chunkFileNames: "[name]-[hash].legacy.js",
        format: "umd",
        plugins: [
          getBabelOutputPlugin({
            presets: [["@babel/preset-env"]],
            allowAllFormats: true,
          }),
        ],
      },
    ],
    plugins: [
      pluginWatch(),
      commonjs(),
      babel({
        presets: [
          [
            "@babel/preset-env",
            {
              targets: { esmodules: true },
              bugfixes: true,
              loose: true,
            },
          ],
        ],
        babelHelpers: "bundled",
      }),
      replace({
        "process.env.NODE_ENV": JSON.stringify("production"),
      }),
      nodeResolve(),
      terser(),
    ],
  },
  ...(process.env.NODE_ENV === "dev"
    ? [
        {
          input: "src/dev.js",
          output: [
            {
              file: "dev/dev.js",
              sourcemap: true,
              format: "esm",
              plugins: [
                getBabelOutputPlugin({
                  presets: [["@babel/preset-modules"]],
                }),
              ],
            },
          ],
          plugins: [
            pluginWatch(),
            commonjs(),
            babel({
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: { esmodules: true },
                    bugfixes: true,
                    loose: true,
                  },
                ],
              ],
              babelHelpers: "bundled",
            }),
            replace({
              "process.env.NODE_ENV": JSON.stringify("production"),
            }),
            nodeResolve(),
          ],
        },
        {
          input: "src/dev.legacy.js",
          output: [
            {
              file: "dev/dev.legacy.js",
              sourcemap: true,
              name: "VueUhtml",
              entryFileNames: "[name].legacy.js",
              chunkFileNames: "[name]-[hash].legacy.js",
              format: "umd",
              plugins: [
                getBabelOutputPlugin({
                  presets: [["@babel/preset-env"]],
                  allowAllFormats: true,
                }),
              ],
            },
          ],
          plugins: [
            commonjs(),
            babel({
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: { esmodules: true },
                    bugfixes: true,
                    loose: true,
                  },
                ],
              ],
              babelHelpers: "bundled",
            }),
            replace({
              "process.env.NODE_ENV": JSON.stringify("production"),
            }),
            nodeResolve(),
            terser(),
          ],
        },
      ]
    : []),
];
