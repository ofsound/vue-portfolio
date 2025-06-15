<script setup lang="ts">
import SingleCell from './SingleCell.vue'

// do that id adding trick here, to populate a key value from this object

let index = 0
const cellArray = [
  { id: index++, style: 'animate-spin', color: 'bg-amber-500' },
  { id: index++, style: 'animate-bounce', color: 'bg-blue-500' },
  { id: index++, style: 'animate-bounce', color: 'bg-green-500' },
  { id: index++, style: 'animate-spin', color: 'bg-amber-500' },
]
</script>

<template>
  <section
    class="grid h-full grid-cols-2 grid-rows-2 gap-4 [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:bg-black"
  >
    <div v-for="cell in cellArray" :key="cell.id">
      <SingleCell :style="cell.style" :color="cell.color" />
    </div>
  </section>
</template>
