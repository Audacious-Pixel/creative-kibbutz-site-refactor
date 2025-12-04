<template>
    <UDropdownMenu
        :ui="{
            content: 'w-48',
        }"
        :items="items"
        :popper="{ placement: 'bottom-end' }"
        v-model:open="open"
        class="cursor-pointer"
    >
        <UButton
            color="secondary"
            variant="outline"
            trailing-icon="i-heroicons-chevron-down-20-solid"
            class="cursor-pointer"
        >
            <UIcon name="i-heroicons-language" class="w-5 h-5" />
            <span class="ml-2 w-6/12">{{ currentLocaleName }}</span>
        </UButton>

        <template #item="{ item }">
            <span class="truncate cursor-pointer">{{ item.label }}</span>
            <UIcon
                v-if="item.code === locale"
                name="i-heroicons-check-20-solid"
                class="flex-shrink-0 h-5 w-5 text-primary-500"
            />
        </template>
    </UDropdownMenu>
</template>

<script setup lang="ts">
/*
// import type { GeneratedTypeConfig } from '@intlify/core-base';
// type LocaleType = GeneratedTypeConfig["locale"];
*/
const { locale, locales, setLocale } = useI18n();

type LocaleType = (typeof locales.value)[number]['code'];

const open = ref(false);

const props = defineProps({
    color: {
        type: String,
    },
});

const availableLocales = computed(() => {
    return locales.value;
});

const currentLocaleName = computed(() => {
    const current = availableLocales.value.find((l) => l.code === locale.value);
    return current?.name || 'English';
});

const items = computed(() => [
    availableLocales.value.map((loc) => ({
        ...loc,
        label: loc.name,
        value: loc.code,
        code: loc.code,
        icon: locale.value === loc.code ? 'i-heroicons-check-circle' : undefined,
        async onSelect(e: Event) {
            e.preventDefault();
            await setLocale(loc.code);
            open.value = false;

            if (import.meta.client) {
                localStorage.setItem('preferred-locale', loc.code);
            }
        },
    })),
]);

function isValidLocale(code: string): code is LocaleType {
    return locales.value.some((l) => l.code === code);
}

onMounted(() => {
    if (!import.meta.client) return;

    const raw = localStorage.getItem('preferred-locale') || '';
    const savedLocale: LocaleType = isValidLocale(raw) ? raw : locale.value;

    if (savedLocale !== locale.value) {
        setLocale(savedLocale);
    }
});
</script>
