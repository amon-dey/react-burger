import { defineConfig, UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(({ command }: ConfigEnv): UserConfig => {
  const isProduction = command === 'build'
  return {
    plugins: [react()],
    server: {
      cors: {
        origin: '*', // разрешаем все источники
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      },
    },
    base: isProduction ? '/react-burger/' : '/',
    build: {
      assetsDir: 'static',
    }
  }
});
