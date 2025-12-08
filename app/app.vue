<template>
    <div>
        <NuxtLayout>
            <NuxtPage
                :transition="{
                    name: 'my',
                    mode: 'out-in',
                }"
            />
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Creative Kibbutz - Your Partner in Community Success',
    meta: [{ name: 'description', content: 'Marketing, Design, and Web Services for non-profit Organizations' }],
    htmlAttrs: {
        lang: 'en',
    },
});
</script>

<style>
.my-enter-active,
.my-leave-active {
    transition: opacity 0.3s;
}
.my-enter,
.my-leave-active {
    opacity: 0;
}
</style>
