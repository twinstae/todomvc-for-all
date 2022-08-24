import solidPlugin from 'vite-plugin-solid';
import defineConfig from './defineConfig';

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    transformMode: {
      web: [/.[jt]sx?/],
    },
    deps: {
      registerNodeLoader: true,
    },
    include: ['src/test/solid/**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    maxThreads: 7
  },
  resolve: {
    conditions: ['development', 'browser'],
  },
});