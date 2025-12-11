<template>
    <div ref="pageContainer" comp-ref-id="pageContainer">
        <!-- Hero Section -->
        <section class="bg-white from-primary-600 to-primary-800 py-20">
            <UContainer>
                <div class="max-w-3xl mx-auto text-center">
                    <h1 class="text-4xl font-bold mb-6">Your Partner in Community Success!</h1>
                    <p class="text-2xl mb-10">Marketing, Design, and Web Services for non-profit Organizations</p>
                    <UButton :to="contactFormLink" size="xl" color="info" variant="solid">Schedule a call</UButton>
                </div>
            </UContainer>
        </section>

        <!-- Icons Section (no title) -->
        <section class="py-20 bg-gray-50">
            <UContainer>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center group cursor-pointer">
                        <div
                            class="flex justify-center items-center h-74 mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                        >
                            <img src="/icons/team.svg" class="w-72 h-auto" />
                        </div>

                        <h3
                            class="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-[#2B4C7E]"
                        >
                            Talented Dedicated Team
                        </h3>
                        <p class="text-gray-600">
                            Access to marketing staff, designers, and video editors without hiring overhead
                        </p>
                    </div>

                    <div class="text-center group cursor-pointer">
                        <div
                            class="flex justify-center items-center h-74 mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                        >
                            <img src="/icons/our-model.svg" class="w-72 h-auto" />
                        </div>

                        <h3
                            class="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-[#2B4C7E]"
                        >
                            Creative Kibbutz Model
                        </h3>
                        <p class="text-gray-600">Ongoing custom solutions with flexibility and consistency</p>
                    </div>

                    <div class="text-center group cursor-pointer">
                        <div
                            class="flex justify-center items-center h-74 mb-4 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                        >
                            <img src="/icons/hit-ground-running.svg" class="w-72 h-auto" />
                        </div>

                        <h3
                            class="text-xl font-semibold mb-2 transition-colors duration-300 group-hover:text-[#2B4C7E]"
                        >
                            Ground Running Ready
                        </h3>
                        <p class="text-gray-600">Experienced team prepared to deliver immediately</p>
                    </div>
                </div>
            </UContainer>
        </section>

        <!-- Building Community Through Creativity Section -->
        <section class="relative py-24 overflow-hidden">
            <div class="absolute inset-0">
                <img
                    src="~/assets/img/hero-bg.webp"
                    alt="Creative work showcase"
                    class="absolute inset-0 w-full h-full object-cover object-right"
                />
                <div
                    class="absolute inset-0 bg-linear-to-r from-[#3350A3] via-[#3350A3]/95 via-55% to-[#3350A3]/30"
                ></div>
            </div>
            <UContainer class="relative z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div class="text-white">
                        <span
                            class="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6"
                        >
                            Creative Agency for Non-Profits
                        </span>
                        <h2 class="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                            Building Community
                            <br />
                            <span class="text-amber-400">Through Creativity</span>
                        </h2>
                        <p class="text-lg text-white/90 mb-6 leading-relaxed">
                            At Creative Kibbutz, we believe that non-profits deserve world-class design and marketing
                            without the corporate price tag. Our name reflects our philosophy: a collective effort where
                            creativity is shared and resources are optimized for the greater good.
                        </p>
                        <p class="text-lg text-white/90 mb-6 leading-relaxed">
                            We are a team of strategists, designers, and developers who are passionate about social
                            impact. We don't just deliver projects; we build partnerships that help your organization
                            grow, reach more people, and make a bigger difference.
                        </p>
                        <p class="text-lg text-white/90 mb-8 leading-relaxed">
                            From small community initiatives to large international NGOs, we tailor our approach to fit
                            your unique needs and goals.
                        </p>
                        <UButton
                            @click="scrollToSection('portfolio')"
                            size="xl"
                            class="bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold cursor-pointer"
                        >
                            View Our Work
                        </UButton>
                    </div>
                    <div class="hidden lg:block"></div>
                </div>
            </UContainer>
        </section>

        <!-- Portfolio Preview - Our Success Cases -->
        <section
            v-if="pageModeSingle"
            ref="homePortfolioRef"
            data-ref-id="homePortfolioRef"
            id="portfolio"
            class="py-20"
        >
            <UContainer>
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">Our Success Cases</h2>
                    <p class="text-xl text-gray-600">Custom-made projects for community organizations</p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div
                        v-for="caseItem in featuredCases"
                        :key="caseItem.id"
                        class="group cursor-pointer"
                        @click="openModal(caseItem)"
                    >
                        <UCard class="h-full transition-transform group-hover:scale-105">
                            <div
                                class="relative w-full h-48 overflow-hidden flex items-center justify-center rounded-xl mb-4"
                            >
                                <img
                                    v-if="caseItem?.image"
                                    :src="caseItem?.image"
                                    :alt="caseItem.title.en"
                                    class="rounded-xl object-cover object-center w-full h-full"
                                />
                                <div
                                    v-else
                                    class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center w-full h-full"
                                >
                                    <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-400" />
                                </div>
                            </div>
                            <!-- <UBadge color="primary" variant="soft" class="mb-2">
                                {{ caseItem.category.en }}
                            </UBadge> -->
                            <h3 class="text-lg font-semibold mb-2">
                                {{ caseItem.title.en }}
                            </h3>
                            <p class="text-sm text-gray-500 mb-2">
                                {{ caseItem.client }}
                            </p>
                            <p class="text-gray-600 line-clamp-2">
                                {{ caseItem.description.en }}
                            </p>
                        </UCard>
                    </div>
                </div>
            </UContainer>
        </section>

        <!-- Case Detail Modal -->
        <UModal v-model:open="isModalOpen">
            <template #content>
                <UCard v-if="selectedCase" class="max-w-4xl">
                    <template #header>
                        <div class="flex justify-between items-start">
                            <div>
                                <!-- <UBadge color="primary" variant="soft" class="mb-2">
                                    {{ selectedCase.category.en }}
                                </UBadge> -->
                                <h2 class="text-2xl font-bold">
                                    {{ selectedCase.title.en }}
                                </h2>
                                <p class="text-gray-500 mt-1">
                                    {{ selectedCase.client }}
                                </p>
                            </div>
                            <UButton
                                icon="i-heroicons-x-mark"
                                color="neutral"
                                variant="ghost"
                                @click="closeModal"
                                class="cursor-pointer"
                            />
                        </div>
                    </template>

                    <div class="space-y-6">
                        <div class="w-full overflow-hidden rounded-xl">
                            <img
                                v-if="selectedCase?.image"
                                :src="selectedCase?.image"
                                :alt="selectedCase.title.en"
                                class="w-full h-auto object-cover rounded-xl"
                            />
                        </div>

                        <div>
                            <p class="text-gray-700 text-lg leading-relaxed">
                                {{ selectedCase.description.en }}
                            </p>
                        </div>
                    </div>
                </UCard>
            </template>
        </UModal>

        <!-- Contact Section -->
        <section v-if="pageModeSingle" class="bg-gray-200 py-20" ref="homeContactRef" data-ref-id="homeContactRef">
            <ContactModule />
        </section>
    </div>
</template>

<script setup lang="ts">
import ContactModule from '~/components/page-modules/contact-module.vue';

const siteConfig = useAppConfig()?.siteConfig || {};
const pageMode = computed(() => siteConfig?.pageMode || 'single');
const pageModeSingle = computed(() => pageMode.value === 'single');
const contactFormLink = computed(() => (pageModeSingle.value ? '/#contact' : '/pages/contact'));

const pageContainer = ref<HTMLElement | null>(null);
const homeContactRef = ref<HTMLElement | null>(null);

const casesData: any | any[] = await import('~/data/cases.json').then((m) => m.default);

const featuredCases = computed(() => casesData.slice(0, 9));

const isModalOpen = ref(false);
const selectedCase = ref<any>(null);

const openModal = (caseItem: any) => {
    selectedCase.value = caseItem;
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedCase.value = null;
};

const scrollToSection = (sectionId: string) => {
    if (import.meta.client) {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>
