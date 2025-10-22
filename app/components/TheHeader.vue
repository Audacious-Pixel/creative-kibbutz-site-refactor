<template>
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
        <UContainer>
            <div class="flex items-center justify-between h-16">
                <NuxtLink to="/" class="flex items-center">
                    <img src="@/assets/img/logo.png" alt="Creative Kibbutz" class="h-12 w-auto" />
                </NuxtLink>

                <nav class="hidden md:flex items-center gap-8">
                    <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
                        {{ $t('nav.home') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="portfolioEnabled"
                        to="/pages/portfolio"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        {{ $t('nav.portfolio') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="shopEnabled"
                        to="/shop"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        {{ $t('shop.title') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="blogEnabled"
                        to="/blog"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        {{ $t('blog.title') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="!pageModeSingle"
                        to="/pages/contact"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        {{ $t('nav.contact') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="pageModeSingle"
                        @click.stop.prevent="scrollToComponent('homeContact')"
                        to="/#contact"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                    >
                        {{ $t('nav.contact') }}
                    </NuxtLink>
                </nav>
                <div class="w-24 text-gray-700 hover:text-primary-600 transition-colors">
                    <LanguageSwitcher />
                </div>

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
                        {{ $t('nav.home') }}
                    </NuxtLink>

                    <NuxtLink
                        to="/pages/portfolio"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        {{ $t('nav.portfolio') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="shopEnabled"
                        to="/shop"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        {{ $t('shop.title') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="blogEnabled"
                        to="/blog"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        {{ $t('blog.title') }}
                    </NuxtLink>

                    <NuxtLink
                        v-if="!pageModeSingle"
                        to="/pages/contact"
                        class="text-gray-700 hover:text-primary-600 transition-colors"
                        @click="isMobileMenuOpen = false"
                    >
                        {{ $t('nav.contact') }}
                    </NuxtLink>
                    <LanguageSwitcher />
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
