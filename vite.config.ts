import { defineConfig, loadEnv } from 'vite';
import solidPlugin from 'vite-plugin-solid';
const path = require('path');

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    return {
        plugins: [solidPlugin()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@assets": path.resolve(__dirname, "src/assets"),
                "@components": path.resolve(__dirname, "src/components"),
                "@services": path.resolve(__dirname, "src/services"),
                "@utils": path.resolve(__dirname, "src/utils"),
            }
        },
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
        build: {
            target: 'esnext',
        },
    }
});