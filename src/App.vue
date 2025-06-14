<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-gray-500">
    <nav class="mx-10 flex gap-5 py-3 font-bold">
      <RouterLink class="[&.router-link-exact-active]:text-white" to="/">HOME</RouterLink>
      <RouterLink class="[&.router-link-exact-active]:text-white" to="/about">ABOUT</RouterLink>
      <RouterLink class="[&.router-link-exact-active]:text-white" to="/music">MUSIC</RouterLink>
    </nav>
  </header>
  <main class="mx-10 mt-10">
    <RouterView />
  </main>
</template>
