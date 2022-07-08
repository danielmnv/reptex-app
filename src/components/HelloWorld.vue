<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>

<template>
    <div class="text-center flex flex-col gap-y-5">
        <h1 class="text-3xl font-bold underline">{{ msg }}</h1>

        <div>   
            <button type="button" class="btn" @click="count++">count is: {{ count }}</button>
        </div>
    </div>
</template>
