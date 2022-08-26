import defineConfig from './defineConfig';

export default defineConfig({
  plugins: [],
  test: {
    include: ['./test/alpine/*.test.ts', './test/ts/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    maxThreads: 7
  },
  resolve: {
    alias: {
      "@todomvc-core": './todomvc-core'
    }
  }
});
