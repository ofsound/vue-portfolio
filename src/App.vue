<script setup lang="ts">
import PersistentPlayer from '@/components/PersistentPlayer.vue'
import SiteNav from '@/components/SiteNav.vue'
</script>

<template>
  <header>
    <SiteNav />
  </header>
  <main class="my-4 w-full grow-1 overflow-auto border-4 border-gray-100 px-4 py-4">
    <RouterView />
  </main>
  <PersistentPlayer />
</template>
