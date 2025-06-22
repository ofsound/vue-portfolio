<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

// ScrambleText, (Replace)Text

const textOne = ref(null)

defineProps<{
  word: string
}>()

onMounted(() => {
  const split = SplitText.create(textOne.value)

  gsap.from(split.chars, {
    duration: 1,
    y: 100,
    autoAlpha: 0,
    stagger: 0.1,
  })

  gsap.to(textOne.value, { duration: 2, x: 200, y: 300 })
})
</script>

<template>
  <div ref="textOne" class="mb-4 max-w-max rounded bg-gray-200 px-2 py-1">{{ word }}</div>
</template>
