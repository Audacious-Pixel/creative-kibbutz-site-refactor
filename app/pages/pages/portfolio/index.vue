<template>
    <div>
        <!-- Hero Section -->
        <section class="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
            <UContainer>
                <div class="text-center max-w-3xl mx-auto">
                    <h1 class="text-5xl font-bold mb-6">
                        Our Success Cases
                    </h1>
                    <p class="text-xl">
                        Custom-made projects for community organizations
                    </p>
                </div>
            </UContainer>
        </section>

        <!-- Cases Grid -->
        <section class="py-16">
            <UContainer>
                <!-- Filters -->
                <div class="mb-3 flex flex-wrap gap-4">
                    <UInput
                        icon="i-lucide-search"
                        size="md"
                        variant="outline"
                        placeholder="Search..."
                        v-model="caseFilter.search"
                    />
                </div>

                <div class="mb-8 flex flex-wrap gap-4">
                    <UButton :variant="!selectedCategory ? 'solid' : 'soft'" @click="caseFilter.category = ''">
                        All Categories
                    </UButton>

                    <UButton
                        v-for="(category, categoryIndex) in categories"
                        :key="categoryIndex"
                        :variant="selectedCategory && selectedCategory === category ? 'solid' : 'soft'"
                        @click="caseFilter.category = category"
                    >
                        {{ category }}
                    </UButton>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div v-if="hasFilter && !casesToShow?.length" class="col-span-3 w-full">
                        <div class="text-center max-w-2xl mx-auto">
                            <h2 class="text-2xl font-bold mb-4">
                                Nothing found
                            </h2>
                            <p class="text-lg text-gray-600 line-clamp-3 mb-2">
                                No results match your search
                            </p>
                            <UButton @click="clearFilters">
                                Clear filters
                            </UButton>
                        </div>
                    </div>

                    <template v-else>
                        <div
                            v-for="(caseItem, caseItemIndex) in casesToShow"
                            :key="caseItemIndex"
                            class="group cursor-pointer"
                            @click="openModal(caseItem)"
                        >
                            <UCard class="h-full transition-transform group-hover:scale-105">
                                <div class="relative w-full h-48 overflow-hidden flex items-center justify-center rounded-xl mb-4">
                                    <img
                                        v-if="caseItem?.image"
                                        :src="caseItem?.image"
                                        :alt="caseItem.title.en"
                                        class="rounded-xl object-cover object-center w-full h-full"
                                    />
                                    <div
                                        v-else
                                        class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden w-full h-full"
                                    >
                                        <UIcon name="i-heroicons-photo" class="w-16 h-16 text-gray-400" />
                                    </div>
                                </div>

                                <UBadge color="primary" variant="soft" class="mb-3">
                                    {{ caseItem.category.en }}
                                </UBadge>
                                <h3 class="text-xl font-semibold mb-2">
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

                        <div class="flex col-span-3 w-full gap-4">
                            <div class="flex w-10/12">
                                <p class="text-gray-600 line-clamp-3 pt-2">
                                    <span>Showing {{ casesToShow?.length }} of {{ casesData?.length }} items</span>
                                </p>
                            </div>

                            <div v-if="!selectedCategory && casesData?.length > casesToShow?.length" class="w-full">
                                <UButton
                                    type="button"
                                    @click.stop.prevent="increaseCasesLimit"
                                    size="lg"
                                    color="primary"
                                    class="cursor-pointer px-4 text-center pl-5"
                                >
                                    Show more...
                                </UButton>
                            </div>
                        </div>
                    </template>
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
                                <UBadge color="primary" variant="soft" class="mb-2">
                                    {{ selectedCase.category.en }}
                                </UBadge>
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

        <!-- CTA Section -->
        <section class="py-16 bg-gray-50">
            <UContainer>
                <div class="text-center max-w-2xl mx-auto">
                    <h2 class="text-3xl font-bold mb-4">
                        Let's connect!
                    </h2>
                    <p class="text-lg text-gray-600 mb-8">
                        Contact us to schedule an initial consultation
                    </p>
                    <UButton :to="contactFormLink" size="lg" color="primary" class="cursor-pointer">
                        Schedule a call
                    </UButton>
                </div>
            </UContainer>
        </section>
    </div>
</template>

<script setup lang="ts">
const casesData = await import('~/data/cases.json').then((m) => m.default);

const config = useRuntimeConfig();

const pageMode = computed(() => config.public?.pageMode || 'pages');
const pageModeSingle = computed(() => pageMode.value === 'single');
const contactFormLink = computed(() => (pageModeSingle.value ? '/#contact' : '/pages/contact'));

const caseFilter = reactive({
    search: '',
    category: '',
    tags: [],
});

const casesLimit = ref<number>(12);

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

const increaseCasesLimit = () => {
    let _casesLimit = Number(casesLimit.value || 12);

    if (_casesLimit < 12 || isNaN(_casesLimit)) {
        _casesLimit = 12;
    }

    casesLimit.value = _casesLimit + 6;
};

const clearFilters = () => {
    casesLimit.value = 12;
    caseFilter.search = '';
    caseFilter.category = '';
    caseFilter.tags = [];
};

const selectedCategory = computed<string | null>(() => caseFilter?.category || null);

const categories = computed<string[]>(() => {
    return [
        ...new Set(casesData.map((c: any) => c.category['en'] ?? null).filter(Boolean)),
    ];
});

const clearedSearchTerm = function (value: any) {
    value = typeof value === 'string' ? value : '';

    return value
        .replaceAll(/(^"|"$)/g, '')
        .toLowerCase()
        .trim();
};

const hasFilter = computed(() => {
    let _category = clearedSearchTerm(selectedCategory.value);
    let _search = clearedSearchTerm(JSON.stringify(caseFilter?.search || ''));

    return Boolean(_category || _search);
});

const casesToShow = computed(() => {
    let _category = clearedSearchTerm(selectedCategory.value);
    let _search = clearedSearchTerm(JSON.stringify(caseFilter?.search || ''));
    let _casesLimit = _category ? 100 : Number(casesLimit.value || 12);

    if (_casesLimit < 12 || isNaN(_casesLimit)) {
        _casesLimit = 12;
    }

    return casesData
        .filter((p: any) => {
            let _result = true;

            if (_result && _category) {
                _result = JSON.stringify(p.category).toLowerCase().includes(_category);
            }

            if (_result && _search) {
                _result = JSON.stringify(p).toLowerCase().includes(_search);
            }

            return _result;
        })
        .slice(0, _casesLimit);
});

useHead({
    title: 'Our Success Cases - Creative Kibbutz',
    meta: [{ name: 'description', content: 'Custom-made projects for community organizations' }],
});
</script>
