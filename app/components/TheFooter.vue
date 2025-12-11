<template>
    <footer class="bg-[#3350A3] text-primary-foreground py-16">
        <div class="container mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 mb-12">
                <div class="flex flex-col items-center md:items-start gap-4">
                    <img src="@/assets/img/logo.svg" alt="Creative Kibbutz" class="h-12 w-auto brightness-0 invert" />
                    <p class="text-blue-200 text-sm max-w-xs text-center md:text-left">
                        {{ siteConfig.slogan }}
                    </p>
                </div>

                <div class="md:ml-auto">
                    
                    <nav class="flex flex-col gap-1">
                        
                        <a
                            href="https://www.instagram.com/creativekibbutz/"
                            @click.prevent="scrollToSection('portfolio')"
                            class="text-blue-200 hover:text-white transition-colors cursor-pointer"
                        >
                            <p class="font-semibold mb-4 text-blue-50">Follow us on Instagram</p>
                        </a>
                
                    </nav>
                </div>

                <div v-if="false">
                    <h4 class="font-semibold mb-4 text-blue-50">Navigation</h4>
                    <nav class="flex flex-col gap-1">
                        <NuxtLink to="/" class="text-blue-200 hover:text-white transition-colors">Home</NuxtLink>
                        <a
                            href="/#portfolio"
                            @click.prevent="scrollToSection('portfolio')"
                            class="text-blue-200 hover:text-white transition-colors cursor-pointer"
                        >
                            Portfolio
                        </a>
                        <a
                            href="/#contact"
                            @click.prevent="scrollToSection('homeContactRef')"
                            class="text-blue-200 hover:text-white transition-colors cursor-pointer"
                        >
                            Contact
                        </a>
                    </nav>
                </div>

                <div class="flex gap-6">
                    <template v-for="(item, index) in socialMediaItems" :key="index">
                        <a
                            :href="item?.url"
                            target="_blank"
                            class="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                        >
                            <UIcon :name="item?.icon || 'mynaui:planet'" />
                        </a>
                    </template>
                </div>

                <div v-if="false" class="flex gap-6">
                    <a href="#" class="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-facebook h-5 w-5"
                            aria-hidden="true"
                        >
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                    </a>
                    <a href="#" class="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-twitter h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"
                            ></path>
                        </svg>
                    </a>
                    <a href="#" class="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-instagram h-5 w-5"
                            aria-hidden="true"
                        >
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                        </svg>
                    </a>
                    <a href="#" class="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-linkedin h-5 w-5"
                            aria-hidden="true"
                        >
                            <path
                                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                            ></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                    </a>
                </div>
            </div>
            <div
                class="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-200"
            >
                <p>&copy; {{ new Date().getFullYear() }} Audacious Pixel INC. All rights reserved.</p>
                
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
    if (import.meta.client) {
        let element = document.getElementById(sectionId);
        if (!element) {
            element = document.querySelector(`[data-ref-id="${sectionId}"]`);
        }
        element?.scrollIntoView({ behavior: 'smooth' });
    }
};

const siteConfig = useAppConfig()?.siteConfig || {};

const socialMediaItems = computed(() => {
    let socialMedia = siteConfig?.socialMedia || [];

    return socialMedia.filter((i: any) => i?.url && i?.show !== false);
});
</script>
