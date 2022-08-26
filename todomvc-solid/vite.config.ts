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
    transformMode: {
      web: [/.[jt]sx?/],
    },
    deps: {
      registerNodeLoader: true,
    },
    globals: true,
    environment: 'jsdom',
    maxThreads: 7
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      "@core": path.resolve(__dirname, "../todomvc-core"),
      "@": path.resolve(__dirname, "./src")
    }
  },
});
