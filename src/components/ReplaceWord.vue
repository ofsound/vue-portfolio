<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

import { getRandomIntInc } from '@/utils/MathUtils.ts'

gsap.registerPlugin(TextPlugin)

const textOne = ref(null)

const props = defineProps<{
  word: string
}>()

onMounted(() => {
  gsap.to(textOne.value, {
    duration: 2,
    x: getRandomIntInc(0, 500),
    y: getRandomIntInc(0, 500),
    text: props.word,
  })
})
</script>

<template>
  <div ref="textOne" class="absolute top-0 left-0 mb-4 max-w-max px-2 py-1 uppercase">
    superstitious allies
  </div>
</template>
