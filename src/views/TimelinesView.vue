<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SingleTimeline from '@/components/SingleTimeline.vue'

import { useMouseGesture } from '@/composables/useMouseGesture.ts'
const { mouseDownHandler, mouseUpHandler, startX, startY } = useMouseGesture()

const timelineTotal = ref(10)
const tweensTotal = ref(10)

const timelineArray = ref<number[]>([])

const resetValues = () => {
  timelineTotal.value = Math.round(100 * startX.value) || 10
  tweensTotal.value = Math.round(100 * startY.value) || 10

  timelineArray.value = []

  for (let index = 0; index < timelineTotal.value; index++) {
    timelineArray.value.push(index)
  }
}

const updateAnimation = (e: PointerEvent) => {
  mouseUpHandler(e)
  resetValues()
}

onMounted(resetValues)
</script>

<template>
  <div
    @pointerdown="mouseDownHandler"
    @pointerup="updateAnimation"
    @pointercancel="mouseUpHandler"
    class="relative h-full touch-none overflow-hidden bg-white dark:bg-black"
  >
    <SingleTimeline v-for="item in timelineArray" :key="item" :tweensTotal="tweensTotal" />
  </div>
</template>
