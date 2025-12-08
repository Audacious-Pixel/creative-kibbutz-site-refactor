<template>
  <header class="bg-white sticky top-0 z-50">
    <UContainer>
      <!-- Desktop Header -->
      <div class="hidden md:block">
        <!-- Logo Container - Fixed height to prevent layout shift -->
        <div 
          class="flex justify-center overflow-hidden transition-[height,padding] duration-500 ease-out"
          :style="{
            height: logoContainerHeight,
            paddingTop: isCompact ? '0.5rem' : '1.5rem',
            paddingBottom: isCompact ? '0.5rem' : '1rem'
          }"
        >
          <NuxtLink 
            to="/" 
            class="flex items-center transition-all duration-500 ease-out origin-top"
            :class="isCompact ? 'absolute left-4' : 'relative'"
          >
            <img
              src="@/assets/img/logo.svg"
              alt="Creative Kibbutz"
              class="transition-all duration-500 ease-out"
              :style="{
                height: isCompact ? '2.5rem' : '8rem',
                width: 'auto'
              }"
            />
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav
          class="flex items-center justify-center gap-6 text-sm transition-all duration-500 ease-out"
          :style="{
            paddingBottom: isCompact ? '0.5rem' : '1rem',
            marginTop: isCompact ? '-2.5rem' : '0',
            marginLeft: isCompact ? '12rem' : '0'
          }"
        >
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

const scrollY = ref(0);
const SCROLL_THRESHOLD = 100;

const isCompact = computed(() => scrollY.value > SCROLL_THRESHOLD);

const logoContainerHeight = computed(() => {
  if (isCompact.value) {
    return '3.5rem';
  }
  return '10rem';
});

const handleScroll = () => {
  if (import.meta.client) {
    scrollY.value = window.scrollY;
  }
};

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }
});

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', handleScroll);
  }
});

const scrollToComponent = (sectionId: string) => {
  if (!sectionId || !sectionId.trim()) return;

  if (import.meta.client && !import.meta.env.SSR) {
    const sectionElement = document.querySelector(`[data-ref-id="${sectionId}Ref"]`);
    sectionElement?.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
