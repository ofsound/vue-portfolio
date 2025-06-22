<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

import getRandomIntInclusive from '@/utils/getRandomIntInclusive.ts'

gsap.registerPlugin(ScrambleTextPlugin)

const textOne = ref(null)

const props = defineProps<{
  word: string
}>()

onMounted(() => {
  gsap.to(textOne.value, {
    duration: 2,
    x: getRandomIntInclusive(0, 500),
    y: getRandomIntInclusive(0, 500),
    scrambleText: {
      text: props.word,
      speed: 1.3,
    },
  })
})
</script>

<template>
  <div ref="textOne" class="absolute top-0 left-0 mb-4 max-w-max px-2 py-1 uppercase">
    {{ word }}
  </div>
</template>
