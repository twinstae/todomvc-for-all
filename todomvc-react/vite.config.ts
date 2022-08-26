import defineConfig from "../defineConfig";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    maxThreads: 7,
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "../todomvc-core"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
