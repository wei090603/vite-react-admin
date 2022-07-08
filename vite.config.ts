import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import react from '@vitejs/plugin-react'
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from "vite-plugin-html";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  return {
    base: '/',
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
    },
    // plugins
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: 'test'
          }
        }
      }),
      // * EsLint 报错信息显示在浏览器界面上
      eslintPlugin(),
      // * 是否生成包预览
      visualizer(),
      // * gzip compress
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      })
    ],
    esbuild: {
      // pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    // build configure
    build: {
      sourcemap: false,
      minify: 'terser',
      outDir: 'dist',
      assetsDir: 'assets',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    server: {
      port: 3000,
      cors: true,
      open: false,
      fs: {
        strict: false,
        allow: [],
      },
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000', //代理接口
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
