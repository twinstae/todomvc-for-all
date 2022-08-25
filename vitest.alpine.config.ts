import defineConfig from './defineConfig';

export default defineConfig({
  plugins: [],
  test: {
    include: ['src/test/alpine/**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    maxThreads: 7
  },
});
