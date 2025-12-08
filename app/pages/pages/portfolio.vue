<template>
    <div>
        <!-- /app/pages/pages/portfolio.vue -->
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Portfolio - Creative Kibbutz',
    meta: [{ name: 'description', content: 'Portfolio' }],
});

onBeforeMount(() => {
    navigateTo('/#portfolio', { redirectCode: 301 });
});
</script>
