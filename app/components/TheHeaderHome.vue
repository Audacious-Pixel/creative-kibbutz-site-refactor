<template>
  <header
    class="bg-white sticky top-0 z-50 transition-all duration-300"
  >
    <UContainer>

      <!-- Wrapper for logo, desktop nav, and mobile row -->
      <div
        :class="[
          'transition-all duration-300',
          isCompact
            ? 'md:flex md:items-center md:justify-between md:gap-8 py-2'
            : 'md:flex md:flex-col md:items-center md:justify-center md:gap-4 py-6'
        ]"
      >

        <!-- Logo -->
            <NuxtLink
            to="/"
            :class="[
                'transition-all duration-500 ease-out items-center',
                'hidden md:flex',
                isCompact
                ? 'md:self-auto md:mr-auto'
                : 'md:self-center md:w-full md:justify-center'
            ]"
            >
          <img
            src="@/assets/img/logo.svg"
            alt="Creative Kibbutz"
            class="will-change-[height,width] transition-[height,width,max-width] duration-500 ease-out"
            :style="{
              height: isCompact ? '3rem' : '10rem',
              width: 'auto',
              maxWidth: isCompact ? 'none' : '64rem'
            }"
          />
        </NuxtLink>

        <!-- Desktop nav -->
        <nav
          class="hidden md:flex items-center transition-all duration-300 text-sm"
          :class="
            isCompact
              ? 'gap-8 justify-end flex-1'
              : 'gap-6 justify-center w-full mt-4'
          "
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
            class="text-gray-700 hover:text-primary-600 transition-colors"
          >
            Contact
          </NuxtLink>
        </nav>

        <!-- Mobile: logo left, hamburger right -->
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

      </div> <!-- closes wrapper div -->

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
            @click.stop.prevent="scrollToComponent('homeContact')"
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

// Scroll animation state
const scrollY = ref(0);
const SCROLL_DISTANCE = 150;

const scrollProgress = computed(() =>
  Math.min(scrollY.value / SCROLL_DISTANCE, 1)
);

const isCompact = computed(() => scrollProgress.value >= 1);

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
