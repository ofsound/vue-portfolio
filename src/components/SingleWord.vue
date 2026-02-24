<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

import { getRandomIntInc } from '@/utils/MathUtils.ts'

const textOne = ref<HTMLElement | null>(null)
let split: SplitText | null = null
const tweens: gsap.core.Tween[] = []

defineProps<{
  word: string
}>()

onMounted(() => {
  if (!textOne.value) return

  split = SplitText.create(textOne.value)

  tweens.push(
    gsap.from(split.chars, {
      duration: 1,
      x: getRandomIntInc(0, 300),
      y: getRandomIntInc(0, 300),
      autoAlpha: 0,
      stagger: 0.1,
    }),
  )

  tweens.push(
    gsap.to(textOne.value, {
      duration: 2,
      x: getRandomIntInc(0, 300),
      y: getRandomIntInc(0, 300),
    }),
  )
})

onUnmounted(() => {
  tweens.forEach((tween) => tween.kill())
  split?.revert()
  split = null
})
</script>

<template>
  <div ref="textOne" class="absolute top-0 left-0 mb-4 max-w-max px-2 py-1">
    {{ word }}
  </div>
</template>
