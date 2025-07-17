import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
        plugins: [react(), tailwindcss()],
        define: {
            'global': {},
        },
        server: {
            host: '0.0.0.0',
            port: 3000,
            proxy: {
                '/api': {
                    target: 'http://192.168.0.181:8080',
                    changeOrigin: true,
                },
                '/ws': {
                    target: 'ws://192.168.0.181:8080',
                    ws: true,
                },
            }
        }
    }
)
