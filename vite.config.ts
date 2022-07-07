import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.', 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `@import "@/styles/var.less";`,
        // 支持内联 JavaScript
        // 重写 less 变量，定制样式
        // modifyVars: {
        //   '@primary-color': '#409eff',
        // },
      }
    }
  }
})
