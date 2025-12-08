<template>
  <header class="bg-white sticky top-0 z-50 shadow-sm">
    <UContainer>
      <!-- Desktop Header -->
      <div class="hidden md:flex flex-col items-center py-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center mb-4">
          <img
            src="@/assets/img/logo.svg"
            alt="Creative Kibbutz"
            class="h-24 w-auto"
          />
        </NuxtLink>

        <!-- Navigation -->
        <nav class="flex items-center justify-center gap-6 text-sm">
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
            class="text-gray-700 hover:text-primary-600 transition-colors cursor-pointer"
          >
            Contact
          </NuxtLink>
        </nav>
      </div>

      <!-- Mobile Header -->
      <div class="flex items-center justify-between w-full md:hidden py-3">
        <NuxtLink to="/" class="flex items-center">
          <img
            src="@/assets/img/logo.svg"
            alt="Creative Kibbutz"
            class="h-10 w-auto"
          />
        </NuxtLink>

        <UButton
          icon="i-heroicons-bars-3"
          color="neutral"
          variant="ghost"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>

      <!-- Mobile menu -->
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
            v-if="portfolioEnabled"
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

          <NuxtLink
            v-if="pageModeSingle"
            @click.stop.prevent="scrollToComponent('homeContact'); isMobileMenuOpen = false"
            to="/#contact"
            class="text-gray-700 hover:text-primary-600 transition-colors"
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

const scrollToComponent = (sectionId: string) => {
  if (!sectionId || !sectionId.trim()) return;

  if (import.meta.client && !import.meta.env.SSR) {
    const sectionElement = document.querySelector(`[data-ref-id="${sectionId}Ref"]`);
    sectionElement?.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
