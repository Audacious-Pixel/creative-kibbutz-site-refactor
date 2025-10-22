<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-5xl font-bold mb-6">
                        {{ $t('contact.title') }}
                    </h1>
                    <p class="text-xl">
                        {{ $t('cta.description') }}
                    </p>
                </div>
            </UContainer>
        </section>

        <ContactModule />
    </div>
</template>

<script setup lang="ts">
import ContactModule from '~/components/page-modules/contact-module.vue';

const { t } = useI18n();

useHead({
    title: `${t('contact.title')} - Creative Kibbutz`,
    meta: [{ name: 'description', content: t('cta.description') }],
});
</script>
