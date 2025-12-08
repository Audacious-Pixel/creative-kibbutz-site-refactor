<template>
    <div>
        <ContactModule />
    </div>
</template>

<script setup lang="ts">
import ContactModule from '~/components/page-modules/contact-module.vue';

useHead({
    title: 'Contact Us - Creative Kibbutz',
    meta: [{ name: 'description', content: 'Contact us to schedule an initial consultation' }],
});
</script>
