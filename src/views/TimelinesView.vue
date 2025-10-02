<script setup lang="ts">
import { ref } from 'vue'
import SingleTimeline from '@/components/SingleTimeline.vue'

import { useMouseGesture } from '@/composables/useMouseGesture.ts'
const { mouseDownHandler, mouseUpHandler, startX, startY } = useMouseGesture()

let timelineTotal = 10
let tweensTotal = 10

const timelineArray = ref<number[]>([])

const resetValues = () => {
  timelineTotal = 100 * startX.value
  tweensTotal = 100 * startY.value

  timelineArray.value = []

  for (let index = 0; index < timelineTotal; index++) {
    timelineArray.value.push(index)
  }
}

const updateAnimation = (e: MouseEvent) => {
  mouseUpHandler(e)
  resetValues()
}
</script>

<template>
  <div
    @mousedown="mouseDownHandler"
    @mouseup="updateAnimation"
    class="relative h-full overflow-hidden bg-white dark:bg-black"
  >
    <SingleTimeline v-for="item in timelineArray" :key="item" :tweensTotal />
  </div>
</template>
