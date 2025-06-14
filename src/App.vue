<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PersistentPlayer from '@/components/PersistentPlayer.vue'
</script>

<template>
  <header class="bg-gray-500">
    <nav class="mx-10 flex h-12 gap-5 py-3 font-bold">
      <RouterLink class="[&.router-link-exact-active]:text-white" to="/">HOME</RouterLink>
      <RouterLink class="[&.router-link-exact-active]:text-white" to="/about">ABOUT</RouterLink>
      <RouterLink class="[&.router-link-exact-active]:text-white" to="/music">MUSIC</RouterLink>
    </nav>
  </header>
  <main class="w-full grow-1 overflow-auto bg-gray-400 px-10 py-10">
    <RouterView />
  </main>
  <PersistentPlayer />
</template>
