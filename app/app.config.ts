export default defineAppConfig({
    siteConfig: {
        siteName: 'Creative Kibbutz',
        pageModes: ['single', 'pages'],
        pageMode: 'single',
        contact: {
            email: 'contact@creativekibbutz.com',
            phones: [
                {
                    show: false,
                    accept_calls: true,
                    label: 'Support',
                    id: 'support_phone',
                    value: '+1 (555) 123-4567',
                    im: ['WA', 'TG'],
                },
                {
                    show: false,
                    accept_calls: false,
                    label: 'Tech',
                    id: 'tech_phone',
                    value: '+1 (555) 123-4567',
                    im: ['TG'],
                },
                {
                    show: false,
                    accept_calls: true,
                    label: 'CEO',
                    id: 'ceo_phone',
                    value: '+1 (555) 123-4567',
                    im: ['LINE'],
                },
            ],
            location: 'Canada',
        },
        socialMedia: {
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
        },
        paymentMethods: [
            'American Express',
            'Apple Pay',
            'Diners Club',
            'Discover',
            'Google Pay',
            'Mastercard',
            'Shop Pay',
            'Visa',
        ],
    },
    appData: {
        f2_app_id: 'creative-kibbutz',
    },
    ui: {
        icons: {
            system: 'i-heroicons-computer-desktop',
            light: 'i-heroicons-sun',
            dark: 'i-heroicons-moon',
        },
        colors: {
            primary: 'purple',
            secondary: 'blue',
            neutral: 'zinc',
        },
    },
});
