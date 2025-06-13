<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <h1 class="mt-10 mb-10 bg-gray-500 text-center text-4xl">Welcome to my Website</h1>
      <nav class="text-2xl">
        <RouterLink
          class="[&.router-link-exact-active]:text-red-500 [&.router-link-exact-active]:hover:text-purple-400"
          to="/"
          >Home</RouterLink
        >
        <RouterLink
          class="[&.router-link-exact-active]:text-red-500 [&.router-link-exact-active]:hover:text-purple-400"
          to="/about"
          >About</RouterLink
        >
      </nav>
    </div>
  </header>
  <RouterView />
</template>
