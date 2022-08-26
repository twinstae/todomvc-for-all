import defineConfig from '../defineConfig'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
    maxThreads: 7,
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, '../todomvc-core'),
      "@": path.resolve(__dirname, './src')
    }
  }
})
