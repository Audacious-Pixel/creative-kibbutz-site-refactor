<template>
    <!-- Contact Form -->
    <section class="py-16">
        <UContainer>
            <div class="text-center max-w-3xl mx-auto mb-12">
                <h2 class="text-4xl font-bold mb-4">Contact Us</h2>
                <p class="text-xl text-gray-600">Contact us to schedule an initial consultation</p>
            </div>
            <div class="max-w-2xl mx-auto">
                <UCard>
                    <UForm :schema="schema" :state="state" class="space-y-6" @submit="submitContact">
                        <UFormField label="Name" name="name" required>
                            <UInput
                                v-model="state.name"
                                type="text"
                                size="lg"
                                :class="['w-full']"
                                placeholder="John Doe"
                                icon="i-heroicons-user"
                            />
                        </UFormField>

                        <UFormField label="Email" name="email" required>
                            <UInput
                                v-model="state.email"
                                type="email"
                                size="lg"
                                :class="['w-full']"
                                placeholder="john@example.com"
                                icon="i-heroicons-envelope"
                            />
                        </UFormField>

                        <UFormField label="Phone" name="phone">
                            <UInput
                                v-model="state.phone"
                                type="tel"
                                size="lg"
                                :class="['w-full']"
                                placeholder="+1 (555) 123-4567"
                                icon="i-heroicons-phone"
                            />
                        </UFormField>

                        <UFormField label="Message" name="message" required>
                            <UTextarea
                                v-model="state.message"
                                :rows="6"
                                size="lg"
                                :class="['w-full']"
                                placeholder="Tell us about your project..."
                            />
                        </UFormField>

                        <UButton type="submit" size="lg" block :loading="isSubmitting" class="cursor-pointer">
                            Send
                        </UButton>
                    </UForm>
                </UCard>
            </div>
        </UContainer>
    </section>
</template>

<script setup lang="ts">
import { z } from 'zod';

import type { FormSubmitEvent } from '@nuxt/ui';

const toast = useToast();

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

const submitContactOLD = async (event: FormSubmitEvent<Schema>) => {
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

const submitContact = async () => {
  isSubmitting.value = true;

  try {
    await fetch("https://formspree.io/f/xeoyrybj", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state)
    });

    toast.add({
      title: 'Success',
      description: 'Your message has been sent.',
      color: 'success'
    });

    Object.assign(state, { name: '', email: '', phone: '', message: '' });
  } catch {
    toast.add({
      title: 'Error',
      description: 'Could not send the form',
      color: 'error'
    });
  } finally {
    isSubmitting.value = false;
  }
};






useHead({
    title: 'Contact Us - Creative Kibbutz',
    meta: [{ name: 'description', content: 'Contact us to schedule an initial consultation' }],
});
</script>
