import { defineConfig } from "vite";
import path, { resolve } from "path";

export default defineConfig({
  resolve: {},
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {},
    },
  },
});
