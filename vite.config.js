import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": {},
  },
  optimizeDeps: {
    include: ["linked-dep"],
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "vue-uhtml",
      fileName: "index",
      formats: ["es"],
    },
  },
});
