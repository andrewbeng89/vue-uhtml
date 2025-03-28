import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

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
  plugins: [dts({ rollupTypes: true })],
});
