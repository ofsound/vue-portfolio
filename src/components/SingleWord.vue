<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

import MathUtils from '@/utils/MathUtils.ts'

const textOne = ref(null)

defineProps<{
  word: string
}>()

onMounted(() => {
  const split = SplitText.create(textOne.value)

  gsap.from(split.chars, {
    duration: 1,
    x: MathUtils(0, 300),
    y: MathUtils(0, 300),
    autoAlpha: 0,
    stagger: 0.1,
  })

  gsap.to(textOne.value, {
    duration: 2,
    x: MathUtils(0, 300),
    y: MathUtils(0, 300),
  })
})
</script>

<template>
  <div ref="textOne" class="absolute top-0 left-0 mb-4 max-w-max px-2 py-1">
    {{ word }}
  </div>
</template>
