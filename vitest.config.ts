import defineConfig from './defineConfig';

export default defineConfig({
  plugins: [],
  test: {
    include: ['./test/alpine/*.test.ts', './test/ts/*.test.ts'],
    globals: true,
    environment: 'jsdom'
  },
  resolve: {
    alias: {
      "@todomvc-core": './todomvc-core'
    }
  }
});
