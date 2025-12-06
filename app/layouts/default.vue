<template>
    <UApp>
        <div class="min-h-screen flex flex-col">
            <TheHeaderHome />
            <main class="flex-1">
                <slot />
            </main>
            <TheFooter />
        </div>
    </UApp>
</template>

<script setup lang="ts"></script>
