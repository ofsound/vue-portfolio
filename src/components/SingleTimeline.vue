<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import MathUtils from '@/utils/MathUtils.ts'

gsap.registerPlugin(MotionPathPlugin)

const myElement = ref(null)

onMounted(() => {
  const timeline = gsap.timeline({ repeat: -1, yoyo: true })
  timeline
    .timeScale(0.3)
    .to(myElement.value, {
      duration: 1,
      ease: 'power2.in',
      x: MathUtils(0, 300) - 150,
      motionPath: [
        { x: 100, y: MathUtils(0, 200) - 100 },
        { x: MathUtils(0, 200) - 100, y: MathUtils(0, 200) - 100 },
        { x: MathUtils(0, 300) - 150, y: MathUtils(0, 200) - 100 },
      ],
    })
    .to(myElement.value, {
      duration: 1,
      x: 0,
      ease: 'power3.out',
      motionPath: [
        { x: 100, y: 50 },
        { x: MathUtils(0, 200) - 100, y: MathUtils(0, 200) - 100 },
        { x: MathUtils(0, 300) - 150, y: MathUtils(0, 200) - 100 },
      ],
    })
    .to(myElement.value, {
      duration: 1,
      y: '-10',
      ease: 'power2.in',
      motionPath: [
        { x: MathUtils(0, 200) - 100, y: 50 },
        { x: MathUtils(0, 200) - 100, y: MathUtils(0, 200) - 100 },
        { x: MathUtils(0, 300) - 150, y: MathUtils(0, 200) - 100 },
      ],
    })
    .to(myElement.value, {
      duration: 1,
      y: '10',
      ease: 'circ.inOut',
      motionPath: [
        { x: 100, y: 50 },
        { x: MathUtils(0, 200) - 100, y: MathUtils(0, 200) - 100 },
        { x: MathUtils(0, 300) - 150, y: MathUtils(0, 200) - 100 },
      ],
    })
    .to(myElement.value, {
      duration: 1,
      x: MathUtils(0, 800),
      y: MathUtils(0, 600),
      ease: 'sine.in',
      motionPath: [
        { x: 100, y: 50 },
        { x: MathUtils(0, 200) - 100, y: MathUtils(0, 200) - 100 },
        { x: 300, y: 100 },
      ],
    })
})
</script>

<template>
  <div
    ref="myElement"
    class="absolute top-1/2 right-0 left-0 mx-auto h-10 w-10 rounded-full bg-blue-600 opacity-80"
  ></div>
</template>
