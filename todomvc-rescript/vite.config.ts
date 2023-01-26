import defineConfig from "../defineConfig";
import rescript from '@jihchi/vite-plugin-rescript';
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		react()
	],
  test: {
    globals: true,
    environment: "jsdom",
		include: ['./test/*.test.bs.js']
  },
  resolve: {
    alias: {
      "@todomvc-core": path.resolve(__dirname, "../todomvc-core"),
      "@todomvc-rescript": path.resolve(__dirname, "./src"),
    },
  },
});
