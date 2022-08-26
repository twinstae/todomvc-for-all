import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
import defineConfig from "../defineConfig";
import path from "path";

export default defineConfig({
  plugins: [
    svelte({
      hot: !process.env.VITEST,
      preprocess: sveltePreprocess(),
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    maxThreads: 7,
  },
  resolve: {
    alias: {
      "@todomvc-core": path.resolve(__dirname, "../todomvc-core"),
      "@todomvc-svelte": path.resolve(__dirname, "./src"),      
    },
  },
});
