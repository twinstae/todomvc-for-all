import vue from "@vitejs/plugin-vue";
import defineConfig from "./defineConfig";


export default defineConfig({
  plugins: [vue()],
  test: {
    include: ["src/test/vue/**/*.test.ts"],
    globals: true,
    environment: "jsdom",
    maxThreads: 7,
  },
});
