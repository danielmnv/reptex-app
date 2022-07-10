<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <div class="hero min-h-full py-10 bg-base-200">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-5xl font-bold">REPTEX</h1>
                <p class="py-6">Nuxt 3 + Vue 3 + Tailwind + DaisyUI</p>
                <button class="btn btn-primary" @click="count++">count is: {{ count }}</button>
            </div>
        </div>
    </div>
</template>