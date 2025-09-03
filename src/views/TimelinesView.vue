<script setup lang="ts">
import { ref } from 'vue'
import SingleTimeline from '@/components/SingleTimeline.vue'

const timelineTotal = 120

const timelineArray = ref<number[]>([])

for (let index = 0; index < timelineTotal; index++) {
  timelineArray.value.push(index)
}
</script>

<template>
  <div class="relative h-full overflow-hidden bg-white dark:bg-black">
    <SingleTimeline v-for="item in timelineArray" :key="item" />
  </div>
</template>
