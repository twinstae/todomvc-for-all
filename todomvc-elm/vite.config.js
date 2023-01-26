import defineConfig from "../defineConfig";
import elmPlugin from "vite-plugin-elm";
import path from 'path';

export default defineConfig({
  plugins: [elmPlugin()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@todomvc-core": path.resolve(__dirname, "../todomvc-core"),
    },
  },
});
