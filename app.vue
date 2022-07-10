<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'

const loading = ref(true)

function hideLoader() {
    setTimeout(() => {
        loading.value = false;
    }, 1000)
}

onBeforeMount(() => window.addEventListener('load', hideLoader))
</script>

<template>
  <div>
    <Loader v-if="loading" />

    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
