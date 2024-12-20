import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "")

  return defineConfig({
    plugins: [vue()],
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV)
    },
    server: {
      proxy: {
        "^/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  })
})
