import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    maxThreads: 7
  },
})