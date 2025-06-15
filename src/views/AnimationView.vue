<script setup lang="ts"></script>

<template>
  <section
    class="grid h-full grid-cols-2 grid-rows-2 gap-4 [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:bg-black"
  >
    <div>
      <div class="h-20 w-20 animate-spin bg-amber-500"></div>
    </div>
    <div>
      <div class="h-20 w-20 animate-bounce bg-blue-500"></div>
    </div>
    <div>
      <div class="h-20 w-20 animate-bounce bg-green-500"></div>
    </div>
    <div>
      <div class="h-20 w-20 animate-spin bg-amber-500"></div>
    </div>
  </section>
</template>

<style scoped></style>
