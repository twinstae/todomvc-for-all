import defineConfig from "../defineConfig";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@todomvc-core": path.resolve(__dirname, "../todomvc-core"),
      "@todomvc-react": path.resolve(__dirname, "./src"),
    },
  },
});
