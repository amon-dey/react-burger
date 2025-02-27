import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/*
export default defineConfig({
  plugins: [react()],
})*/

export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       changeOrigin: true,
  //       secure: false, // если используете самоподписанные сертификаты
  //     },
  //   },
  //   cors: {
  //     origin: '*', // разрешаем все источники
  //     methods: ['GET', 'POST', 'PUT', 'DELETE'],
  //     allowedHeaders: ['Content-Type', 'Authorization'],
  //   },
  // },
});