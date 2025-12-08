<template>
    <header
        class="bg-white sticky top-0 z-50 transition-all duration-300 pt-3 md:max-h-[var(--header-min-height)]"
        :style="{
            '--header-min-height': `${headerHeight}px`,
            '--logo-height': `${logoHeight}px`,
        }"
    >
        <UContainer>
            <div class="flex items-center justify-between h-full pb-2">
                <NuxtLink to="/" class="flex items-center transition-all duration-300">
                    <img
                        src="@/assets/img/logo.svg"
                        alt="Creative Kibbutz"
                        class="w-72 md:w-auto transition-all duration-300 ease-out h-[var(--logo-height)]"
                    />
                </NuxtLink>

                <nav class="hidden md:flex items-center gap-8">
                    <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
                        Home
                    </NuxtLink>

                    <NuxtLink
                        v-if="portfolioEnabled"
                        to="/pages/portfolio"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Portfolio
                    </NuxtLink>

                    <NuxtLink
                        v-if="shopEnabled"
                        to="/shop"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Shop
                    </NuxtLink>

                    <NuxtLink
                        v-if="blogEnabled"
                        to="/blog"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Blog
                    </NuxtLink>

                    <NuxtLink
                        v-if="!pageModeSingle"
                        to="/pages/contact"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Contact
                    </NuxtLink>

                    <NuxtLink
                        v-if="pageModeSingle"
                        @click.stop.prevent="scrollToComponent('homeContact')"
                        to="/#contact"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        Contact
                    </NuxtLink>
                </nav>

                <UButton
                    icon="i-heroicons-bars-3"
                    color="neutral"
                    variant="ghost"
                    class="md:hidden"
                    @click="isMobileMenuOpen = !isMobileMenuOpen"
                />
            </div>

            <div v-if="isMobileMenuOpen" class="md:hidden py-4 border-t border-gray-200">
                <nav class="flex flex-col gap-4">
                    <NuxtLink
                        to="/"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        Home
                    </NuxtLink>

                    <NuxtLink
                        to="/pages/portfolio"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        Portfolio
                    </NuxtLink>

                    <NuxtLink
                        v-if="shopEnabled"
                        to="/shop"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        Shop
                    </NuxtLink>

                    <NuxtLink
                        v-if="blogEnabled"
                        to="/blog"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        Blog
                    </NuxtLink>

                    <NuxtLink
                        v-if="!pageModeSingle"
                        to="/pages/contact"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        Contact
                    </NuxtLink>
                </nav>
            </div>
        </UContainer>
    </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false);
const config = useRuntimeConfig();

const shopEnabled = computed(() => config.public.shopEnabled);
const blogEnabled = computed(() => config.public.blogEnabled);
const portfolioEnabled = computed(() => config.public.portfolioEnabled);
const pageMode = computed(() => config.public?.pageMode || 'pages');
const pageModeSingle = computed(() => pageMode.value === 'single');

// Configurações do efeito de scroll da logo
const scrollY = ref(0);
const MAX_LOGO_HEIGHT = 80; // Altura máxima da logo (no topo)
const MIN_LOGO_HEIGHT = 48; // Altura mínima da logo (após rolar)
const MAX_HEADER_HEIGHT = 100; // Altura máxima do header
const MIN_HEADER_HEIGHT = 64; // Altura mínima do header
const SCROLL_DISTANCE = 150; // Distância em pixels para transição completa

// Calcula a altura da logo baseada no scroll
const logoHeight = computed(() => {
    const scrollProgress = Math.min(scrollY.value / SCROLL_DISTANCE, 1);
    const heightDifference = MAX_LOGO_HEIGHT - MIN_LOGO_HEIGHT;
    return MAX_LOGO_HEIGHT - heightDifference * scrollProgress;
});

// Calcula a altura do header baseada no scroll
const headerHeight = computed(() => {
    const scrollProgress = Math.min(scrollY.value / SCROLL_DISTANCE, 1);
    const heightDifference = MAX_HEADER_HEIGHT - MIN_HEADER_HEIGHT;
    return MAX_HEADER_HEIGHT - heightDifference * scrollProgress;
});

// Handler para o evento de scroll
const handleScroll = () => {
    if (import.meta.client) {
        scrollY.value = window.scrollY;
    }
};

// Adiciona e remove o listener de scroll
onMounted(() => {
    if (import.meta.client) {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Atualiza o valor inicial
    }
});

onBeforeUnmount(() => {
    if (import.meta.client) {
        window.removeEventListener('scroll', handleScroll);
    }
});

const scrollToComponent = (sectionId: string) => {
    if (!sectionId || !sectionId.trim()) {
        return;
    }

    let sectionElement: any = null;

    if (import.meta.client && !import.meta.env.SSR) {
        sectionElement = sectionElement || document.querySelector(`[data-ref-id="${sectionId}Ref"]`);
        sectionElement?.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>
