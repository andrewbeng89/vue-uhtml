import urlResolve from "rollup-plugin-url-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "es"
  },
  plugins: [
    urlResolve(),
    terser()
  ]
};
