<script setup lang="ts">
import GridController from './GridController.vue'
import SingleCell from './SingleCell.vue'

defineProps({
  cellArray: Array,
})
</script>

<template>
  <section
    class="grid h-full grid-cols-2 grid-rows-2 gap-4 [&>div]:flex [&>div]:items-center [&>div]:justify-center [&>div]:bg-black"
  >
    <div v-for="cell in cellArray" :key="cell.id">
      <SingleCell v-if="!cell.isInner && !cell.isImage" :style="cell.style" :color="cell.color" />

      <GridController v-if="cell.isInner && !cell.isImage" :cellArray="cell.innerArray" />

      <img v-if="cell.isImage" class="h-full w-full object-cover" :src="cell.url" alt="" />
    </div>
    <div></div>
  </section>
</template>

<!--  -->
