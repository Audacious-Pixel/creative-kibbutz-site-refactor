<template>
    <div ref="pageContainer" comp-ref-id="pageContainer">
        <!-- Hero Section -->
        <section class="bg-white from-primary-600 to-primary-800 py-20">
            <UContainer>
                <div class="max-w-3xl mx-auto text-center">
                    <h1 class="text-4xl font-bold mb-6">
                        Your Partner in Community Success!
                    </h1>
                    <p class="text-2xl mb-10">
                        Marketing, Design, and Web Services for non-profit Organizations
                    </p>
                    <UButton :to="contactFormLink" size="xl" color="info" variant="solid">
                        Schedule a call
                    </UButton>
                </div>
            </UContainer>
        </section>

        <!-- Building Community Through Creativity Section -->
        <section class="py-20 bg-gray-50">
            <UContainer>
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold mb-4">
                        Building Community Through Creativity
                    </h2>
                    <p class="text-xl text-gray-600">
                        Amplifying organizational voices and connecting with audiences meaningfully.
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="flex justify-center items-center h-74 mb-4">
                            <img src="/icons/team.svg" class="w-72 h-auto" /> 
                        </div>
                        
                        <h3 class="text-xl font-semibold mb-2">
                            Talented Dedicated Team
                        </h3>
                        <p class="text-gray-600">
                            Access to marketing staff, designers, and video editors without hiring overhead
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="flex justify-center items-center h-74 mb-4">
                            <img src="/icons/our-model.svg" class="w-72 h-auto" /> 
                        </div>
                        
                        <h3 class="text-xl font-semibold mb-2">
                            Creative Kibbutz Model
                        </h3>
                        <p class="text-gray-600">
                            Ongoing custom solutions with flexibility and consistency
                        </p>
                    </div>

                    <div class="text-center">
                        <div class="flex justify-center items-center h-74 mb-4">
                            <img src="/icons/hit-ground-running.svg" class="w-72 h-auto" /> 
                        </div>
                        
                        <h3 class="text-xl font-semibold mb-2">
                            Ground Running Ready
                        </h3>
                        <p class="text-gray-600">
                            Experienced team prepared to deliver immediately
                        </p>
                    </div>

                </div>
            </UContainer>
        </section>

        <!-- Portfolio Preview -->
        <section class="py-20">
            <UContainer>
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">
                        Our Success Cases
                    </h2>
                    <p class="text-xl text-gray-600">
                        Custom-made projects for community organizations
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div v-for="caseItem in featuredCases" :key="caseItem.id" class="group cursor-pointer">
                        <UCard class="h-full transition-transform group-hover:scale-105">
                            <img
                                v-if="caseItem?.image"
                                :src="caseItem?.image"
                                :alt="caseItem.title.en"
                                class="rounded-xl max-w-5xl mx-auto w-10/12"
                            />
                            <div
                                v-else
                                class="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center"
                            >
                                <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-400" />
                            </div>
                            <UBadge color="primary" variant="soft" class="mb-2">
                                {{ caseItem.category.en }}
                            </UBadge>
                            <h3 class="text-lg font-semibold mb-2">
                                {{ caseItem.title.en }}
                            </h3>
                            <p class="text-gray-600 mb-4">
                                {{ caseItem.description.en }}
                            </p>
                            <NuxtLink
                                :to="`/pages/portfolio/case/${caseItem.slug}`"
                                class="text-primary-600 hover:text-primary-800 font-semibold inline-flex items-center gap-2"
                            >
                                View Case
                                <UIcon name="i-heroicons-arrow-right" />
                            </NuxtLink>
                        </UCard>
                    </div>
                </div>

                <div class="text-center">
                    <UButton to="/pages/portfolio" size="lg" variant="outline">
                        Portfolio
                    </UButton>
                </div>
            </UContainer>
        </section>

        <!-- Contact Section -->
        <section v-if="pageModeSingle" class="bg-gray-200 py-20" ref="homeContactRef" data-ref-id="homeContactRef">
            <ContactModule />
        </section>

        <!-- CTA Section -->
        <section class="py-20 bg-primary-600 text-white">
            <UContainer>
                <div class="text-center max-w-2xl mx-auto">
                    <h2 class="text-4xl font-bold mb-4">
                        Let's connect!
                    </h2>
                    <p class="text-xl mb-8">
                        Contact us to schedule an initial consultation
                    </p>
                    <UButton :to="contactFormLink" size="xl" color="info" variant="solid" class="cursor-pointer">
                        Schedule a call
                    </UButton>
                </div>
            </UContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
import ContactModule from '~/components/page-modules/contact-module.vue';

const config = useRuntimeConfig();
const pageMode = computed(() => config.public?.pageMode || 'pages');
const pageModeSingle = computed(() => pageMode.value === 'single');
const contactFormLink = computed(() => (pageModeSingle.value ? '/#contact' : '/pages/contact'));

const pageContainer = ref<HTMLElement | null>(null);
const homeContactRef = ref<HTMLElement | null>(null);

const casesData: any | any[] = await import('~/data/cases.json').then((m) => m.default);

const featuredCases = computed(() => casesData.slice(0, 3));
</script>
