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
            port: 3000,
            proxy: {
                '/api': {
                    target: 'http://localhost:8080', 
                    changeOrigin: true,
                },
                '/ws': {
                    target: 'ws://localhost:8080',
                    ws: true,
                },
            }
        }
    }
)
