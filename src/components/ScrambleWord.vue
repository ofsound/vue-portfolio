<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

import { getRandomIntInc } from '@/utils/MathUtils.ts'

gsap.registerPlugin(ScrambleTextPlugin)

const textOne = ref<HTMLElement | null>(null)
let tween: gsap.core.Tween | null = null

const props = defineProps<{
  word: string
}>()

onMounted(() => {
  if (!textOne.value) return

  tween = gsap.to(textOne.value, {
    duration: 2,
    x: getRandomIntInc(0, 500),
    y: getRandomIntInc(0, 500),
    scrambleText: {
      text: props.word,
      speed: 1.3,
    },
  })
})

onUnmounted(() => {
  tween?.kill()
  tween = null
})
</script>

<template>
  <div ref="textOne" class="absolute top-0 left-0 mb-4 max-w-max px-2 py-1 uppercase">
    {{ word }}
  </div>
</template>
