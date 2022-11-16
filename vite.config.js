import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {}
  },
  optimizeDeps: {
    include: ["linked-dep"]
  },
  build: {
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/]
    },
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "VueUhtml",
      fileName: "index"
    },
  },
});
