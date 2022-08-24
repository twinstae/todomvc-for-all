/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  test: {
    include: ['src/test/react/**/*.test.{ts,tsx}'],
    globals: true,
    environment: 'jsdom',
    maxThreads: 7
  },
})