<template>
  <header 
    class="bg-white sticky top-0 z-50"
    :style="headerStyle"
  >
    <UContainer>
      <!-- Desktop Header -->
      <div class="hidden md:block relative" :style="{ height: headerHeight }">
        <!-- Logo - uses transform for smooth animation -->
        <div 
          class="absolute will-change-transform"
          :style="logoWrapperStyle"
        >
          <NuxtLink to="/" class="block">
            <img
              src="@/assets/img/logo.svg"
              alt="Creative Kibbutz"
              class="h-auto w-[85vw] max-w-4xl"
            />
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav
          class="absolute flex items-center gap-6 text-sm will-change-transform"
          :style="navStyle"
        >
          <NuxtLink to="/" class="text-gray-700 hover:text-primary-600 transition-colors">
            Home
          </NuxtLink>

          <a
            v-if="portfolioEnabled"
            @click.prevent="scrollToComponent('portfolioSection')"
            href="/#portfolio"
            class="text-gray-700 hover:text-primary-600 transition-colors cursor-pointer"
          >
            Portfolio
          </a>

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

      <!-- Mobile Header (no animation) -->
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

          <a
            v-if="portfolioEnabled"
            @click.prevent="scrollToComponent('portfolioSection'); isMobileMenuOpen = false"
            href="/#portfolio"
            class="text-gray-700 hover:text-primary-600 transition-colors cursor-pointer"
          >
            Portfolio
          </a>

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
import { useScrollProgress } from '~/composables/useScrollProgress';

const isMobileMenuOpen = ref(false);
const config = useRuntimeConfig();

const shopEnabled = computed(() => config.public.shopEnabled);
const blogEnabled = computed(() => config.public.blogEnabled);
const portfolioEnabled = computed(() => config.public.portfolioEnabled);
const pageMode = computed(() => config.public?.pageMode || 'pages');
const pageModeSingle = computed(() => pageMode.value === 'single');

const { progress } = useScrollProgress(120);

const interpolate = (start: number, end: number, p: number) => {
  return start + (end - start) * p;
};

const headerHeight = computed(() => {
  const height = interpolate(200, 70, progress.value);
  return `${height}px`;
});

const headerStyle = computed(() => ({
  boxShadow: progress.value > 0.1 ? `0 2px 8px rgba(0,0,0,${interpolate(0, 0.1, progress.value)})` : 'none',
}));

const logoWrapperStyle = computed(() => {
  const scale = interpolate(1, 0.33, progress.value);
  const leftPos = interpolate(50, 0, progress.value);
  const translateX = interpolate(-50, 0, progress.value);
  const translateY = interpolate(20, 12, progress.value);
  
  return {
    transform: `translateX(${translateX}%) translateY(${translateY}px) scale(${scale})`,
    transformOrigin: 'left top',
    left: `${leftPos}%`,
  };
});

const navStyle = computed(() => {
  const translateY = interpolate(150, 18, progress.value);
  const rightPos = interpolate(50, 0, progress.value);
  const translateX = interpolate(50, 0, progress.value);
  
  return {
    transform: `translateX(${translateX}%) translateY(${translateY}px)`,
    right: `${rightPos}%`,
    left: 'auto',
  };
});

const scrollToComponent = (sectionId: string) => {
  if (!sectionId || !sectionId.trim()) return;

  if (import.meta.client && !import.meta.env.SSR) {
    let sectionElement = document.getElementById(sectionId);
    if (!sectionElement) {
      sectionElement = document.querySelector(`[data-ref-id="${sectionId}Ref"]`);
    }
    sectionElement?.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
