<script setup lang="ts">
import { ref } from 'vue'

const navArray = ref([
  { title: 'Home', url: '/' },
  { title: 'Grids', url: '/grids' },
  { title: 'Borders', url: '/borders' },
  { title: 'Words', url: '/words' },
  // { title: 'Greensock', url: '/greensock' },
  { title: 'Music', url: '/music' },
])
</script>

<template>
  <nav
    class="mx-auto mt-6 mb-4 flex max-w-max gap-6 rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-7 py-2"
  >
    <template v-for="navItem in navArray" :key="navItem.url">
      <RouterLink
        class="relative text-sm tracking-wider transition-all duration-400 [&.router-link-exact-active]:text-white"
        :to="navItem.url"
        >{{ navItem.title }}</RouterLink
      >
    </template>
  </nav>
</template>
