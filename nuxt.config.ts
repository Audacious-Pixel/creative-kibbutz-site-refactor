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
            shopEnabled: false, // Set to false to disable shop
            blogEnabled: false, // Set to false to disable blog
            portfolioEnabled: true, // Set to false to disable portfolio
            pageMode: <'single' | 'pages'>'single',
            portfolioMode: <'cases' | 'grid'>'grid',
        },
    },

    modules: [
        '@nuxt/ui',
        '@nuxtjs/i18n',
        //
    ],

    i18n: {
        // vueI18n: './nuxt-i18n.js',
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en.json',
            },
            {
                code: 'pt',
                name: 'Português',
                file: 'pt.json',
            },
        ],
        langDir: 'locales', // inside /i18n directory
        defaultLocale: 'en',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
            alwaysRedirect: false,
            fallbackLocale: 'en',
            cookieSecure: false,
            cookieCrossOrigin: false,
        },
    },

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
                clientPort: 443,
                protocol: 'wss',
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
