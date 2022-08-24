import { svelte } from '@sveltejs/vite-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess';
import defineConfig from './defineConfig';


export default defineConfig({
  plugins: [
    svelte({
      hot: !process.env.VITEST,
      preprocess: sveltePreprocess()
    }),
  ],
  test: {
    include: ['src/test/svelte/**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    maxThreads: 7
  },
});