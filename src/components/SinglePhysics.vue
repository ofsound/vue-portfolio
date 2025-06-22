<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

import { getRandomIntInc, getRandomIntIncBip } from '@/utils/MathUtils.ts'

gsap.registerPlugin(PhysicsPropsPlugin)
gsap.registerPlugin(Physics2DPlugin)

const textOne = ref(null)

const randomAcceleration = getRandomIntInc(0, 20)

onMounted(() => {
  gsap.to(textOne.value, {
    duration: 3,
    physics2D: {
      velocity: getRandomIntIncBip(0),
      angle: getRandomIntIncBip(0),
      gravity: getRandomIntIncBip(0),
      friction: 0.01,
    },
    physicsProps: {
      rotation: {
        velocity: 200,
        friction: 0.01,
        acceleration: randomAcceleration,
      },
      scale: {
        velocity: getRandomIntInc(0, 10) * 0.1,
        friction: 0.1,
      },
    },
  })
})
</script>

<template>
  <div
    ref="textOne"
    class="absolute top-1/2 right-0 left-0 mx-auto mb-4 h-30 w-30 border bg-blue-400 px-2 py-1 uppercase opacity-70"
  ></div>
</template>
