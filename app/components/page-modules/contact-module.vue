<template>
    <!-- Contact Form & Info -->
    <section class="py-16">
        <UContainer>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                <!-- Contact Form -->
                <div>
                    <h2 class="text-3xl font-bold mb-6">
                        {{ $t('contact.title') }}
                    </h2>
                    <UCard>
                        <UForm :schema="schema" :state="state" class="space-y-6" @submit="submitContact">
                            <UFormField :label="$t('contact.form.name')" name="name" required>
                                <UInput
                                    v-model="state.name"
                                    type="text"
                                    size="lg"
                                    :class="['w-full']"
                                    placeholder="John Doe"
                                    icon="i-heroicons-user"
                                />
                            </UFormField>

                            <UFormField :label="$t('contact.form.email')" name="email" required>
                                <UInput
                                    v-model="state.email"
                                    type="email"
                                    size="lg"
                                    :class="['w-full']"
                                    placeholder="john@example.com"
                                    icon="i-heroicons-envelope"
                                />
                            </UFormField>

                            <UFormField :label="$t('contact.form.phone')" name="phone">
                                <UInput
                                    v-model="state.phone"
                                    type="tel"
                                    size="lg"
                                    :class="['w-full']"
                                    placeholder="+1 (555) 123-4567"
                                    icon="i-heroicons-phone"
                                />
                            </UFormField>

                            <UFormField :label="$t('contact.form.message')" name="message" required>
                                <UTextarea
                                    v-model="state.message"
                                    :rows="6"
                                    size="lg"
                                    :class="['w-full']"
                                    placeholder="Tell us about your project..."
                                />
                            </UFormField>

                            <UButton type="submit" size="lg" block :loading="isSubmitting" class="cursor-pointer">
                                {{ $t('contact.form.send') }}
                            </UButton>
                        </UForm>
                    </UCard>
                </div>

                <!-- Contact Information -->
                <div>
                    <h2 class="text-3xl font-bold mb-6">
                        {{ $t('cta.title') }}
                    </h2>

                    <div class="space-y-6">
                        <UCard>
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full flex-shrink-0"
                                >
                                    <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-primary-600" />
                                </div>
                                <div class="w-full">
                                    <h3 class="font-semibold text-lg mb-1">Email</h3>
                                    <div class="text-gray-600 flex gap-3 items-center justify-between">
                                        <span>{{ protectedContactEmail }}</span>
                                        <button
                                            @click.stop.prevwent="showContactEmail = !showContactEmail"
                                            class="min-w-32 text-center cursor-pointer text-white bg-primary-500 border-0 py-1 px-2 focus:outline-none hover:bg-primary-600 rounded-xl"
                                        >
                                            {{ showContactEmail ? $t('contact.hide-email') : $t('contact.show-email') }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </UCard>

                        <UCard v-if="activeFones.length">
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full flex-shrink-0"
                                >
                                    <UIcon name="i-heroicons-phone" class="w-6 h-6 text-primary-600" />
                                </div>
                                <div class="w-full">
                                    <h3 class="font-semibold text-lg mb-1">Phones</h3>
                                    <ul class="text-gray-600 flex-wrap flex flex-col gap-2 w-full">
                                        <template v-for="(activeFone, index) in activeFones" :key="index">
                                            <li
                                                :class="[
                                                    'flex flex-row items-center gap-1 w-full',
                                                    {
                                                        'md:pb-2 md:border-b':
                                                            activeFones.length > 1 && index + 1 < activeFones.length,
                                                    },
                                                ]"
                                            >
                                                <span class="w-4/12">{{ activeFone?.label }}</span>
                                                <span class="w-5/12">{{ activeFone?.value }}</span>
                                                <span class="w-3/12 flex gap-1 self-stretch items-center">
                                                    <span v-if="activeFone.accept_calls" title="Accept Calls">
                                                        <UIcon name="material-symbols:call" />
                                                    </span>
                                                    <span v-if="activeFone.im.includes('WA')" title="WhatsApp">
                                                        <UIcon name="ic:outline-whatsapp" />
                                                    </span>
                                                    <span v-if="activeFone.im.includes('TG')" title="Telegram">
                                                        <UIcon name="ic:outline-telegram" />
                                                    </span>
                                                </span>
                                            </li>
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </UCard>

                        <UCard>
                            <div class="flex items-start gap-4">
                                <div
                                    class="flex items-center justify-center w-12 h-12 bg-primary-100 rounded-full flex-shrink-0"
                                >
                                    <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-lg mb-1">Location</h3>
                                    <p class="text-gray-600">{{ siteConfig.contact.location }}</p>
                                </div>
                            </div>
                        </UCard>

                        <!-- Why Choose Us -->
                        <UCard class="bg-primary-50 border-primary-200">
                            <h3 class="font-semibold text-lg mb-4">{{ $t('features.title') }}</h3>
                            <ul class="space-y-3">
                                <li class="flex items-start gap-2">
                                    <UIcon
                                        name="i-heroicons-check-circle"
                                        class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                                    />
                                    <span class="text-gray-700">{{ $t('features.team.title') }}</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <UIcon
                                        name="i-heroicons-check-circle"
                                        class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                                    />
                                    <span class="text-gray-700">{{ $t('features.model.title') }}</span>
                                </li>
                                <li class="flex items-start gap-2">
                                    <UIcon
                                        name="i-heroicons-check-circle"
                                        class="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                                    />
                                    <span class="text-gray-700">{{ $t('features.ready.title') }}</span>
                                </li>
                            </ul>
                        </UCard>
                    </div>
                </div>
            </div>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
import { z } from 'zod';

import type { FormSubmitEvent } from '@nuxt/ui';

const { t } = useI18n();
const toast = useToast();

// const oldSiteConfig = await import('~/data/old-site-config.json').then((m) => m.default);

const appConfig = useAppConfig();
const siteConfig = appConfig?.siteConfig || {};

const schema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().optional(),
    message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
    name: '',
    email: '',
    phone: '',
    message: '',
});

const isSubmitting = ref(false);

const submitContact = async (event: FormSubmitEvent<Schema>) => {
    isSubmitting.value = true;

    try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        toast.add({
            title: 'Success!',
            description: 'Your message has been sent. We will get back to you soon.',
            color: 'success',
        });

        state.name = '';
        state.email = '';
        state.phone = '';
        state.message = '';
    } catch (error) {
        toast.add({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            color: 'error',
        });
    } finally {
        isSubmitting.value = false;
    }
};

const activeFones = computed(() => {
    return (siteConfig.contact?.phones || [])
        .filter((i: any) => i?.show !== false)
        .map((i: any) => {
            return {
                im: i?.im || [],
                ...i,
            };
        });
});

const showContactEmail = ref(false);

const protectedContactEmail = computed(() => {
    return showContactEmail.value ? siteConfig.contact.email : '**********@*******.com';
});

useHead({
    title: `${t('contact.title')} - Creative Kibbutz`,
    meta: [{ name: 'description', content: t('cta.description') }],
});
</script>
