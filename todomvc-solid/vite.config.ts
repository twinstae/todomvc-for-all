import defineConfig from '../defineConfig';
import solidPlugin from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['/home/taehee/github/todomvc-for-all/node_modules/@testing-library/jest-dom/extend-expect.js'],
    deps: { registerNodeLoader: true },
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      "@todomvc-core": path.resolve(__dirname, "../todomvc-core"),
    }
  },
});
