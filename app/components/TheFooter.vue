<template>
    <footer class="bg-gray-900 text-white mt-auto">
        <UContainer class="py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Creative Kibbutz</h3>
                    <p class="text-gray-400">
                        Marketing, Design, and Web Services for non-profit Organizations
                    </p>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">Navigation</h4>
                    <nav class="flex flex-col gap-2">
                        <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
                            Home
                        </NuxtLink>
                        <NuxtLink to="/pages/portfolio" class="text-gray-400 hover:text-white transition-colors">
                            Portfolio
                        </NuxtLink>
                        <NuxtLink to="/pages/contact" class="text-gray-400 hover:text-white transition-colors">
                            Contact
                        </NuxtLink>
                    </nav>
                </div>

                <div>
                    <h4 class="font-semibold mb-4">Get in Touch</h4>
                    <p class="text-gray-400 mb-4">
                        Contact us to schedule an initial consultation
                    </p>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-300 dark:text-gray-400">
                <p>&copy; {{ new Date().getFullYear() }} Audacious Pixel INC. All rights reserved.</p>
            </div>
        </UContainer>
    </footer>
</template>

<script setup lang="ts">
</script>
