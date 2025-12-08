import nuxtUiVite from '@nuxt/ui/vite';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    css: ['~/assets/css/main.css'],

    devServer: {
        host: '0.0.0.0',
        port: 5000,
    },

    runtimeConfig: {
        public: {
            /*
            algumas configs foram movidas para app/app.config.ts. Exemplo:
            - shopEnabled
            - blogEnabled
            - portfolioEnabled
            - pageMode
            - portfolioMode
            */
        },
    },

    modules: ['@nuxt/ui'],

    colorMode: {
        preference: 'light',
    },

    ui: {
        theme: {
            colors: [
                'primary',
                'secondary',
                'success',
                'info',
                'warning',
                'error',
                'tertiary',
                //
            ],
            transitions: true,
        },
    },

    vite: {
        server: {
            hmr: {
                // clientPort: 443,
                // protocol: 'wss',
                clientPort: undefined,
                protocol: undefined,
            },
            allowedHosts: true,
        },
        plugins: [
            tailwindcss(),
            nuxtUiVite(),
            //
        ],
    },
});
