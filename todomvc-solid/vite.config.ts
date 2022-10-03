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
    environment: 'jsdom'
  },
  resolve: {
    conditions: ['development', 'browser'],
    alias: {
      "@todomvc-core": path.resolve(__dirname, "../todomvc-core"),
    }
  },
});
