import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/ts'),
        },
    },
    plugins: [
        tailwindcss(),
        laravel({
            input: ['resources/ts/app.tsx'],
            refresh: true,
        }),

        react(),
    ],
})