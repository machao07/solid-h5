import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
    plugins: [solid()],
    server: {
        proxy: {
            '/api': {
                target: 'xxx',
                changeOrigin: true,
            }
        },
        host: '0.0.0.0'
    },
})
