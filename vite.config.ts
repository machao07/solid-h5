import { defineConfig, loadEnv } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [solid()],
        base: env.VITE_APP_ROUTER_PREFIX,
        server: {
            proxy: {
                '/api': {
                    target: 'xxx',
                    changeOrigin: true,
                }
            },
            host: '0.0.0.0'
        },
    }
})
