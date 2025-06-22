<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

import { getRandomIntIncBip } from '@/utils/MathUtils.ts'

gsap.registerPlugin(PhysicsPropsPlugin, Physics2DPlugin)

interface Custom {
  id: number
  classes: string[]
}

const props = defineProps<{
  maxDepth: number
  depth: number
  itemsPerGroup: number
  classesArray: Custom[]
}>()

const itemsPerGroupArray: number[] = []

for (let index = 0; index < props.itemsPerGroup; index++) {
  itemsPerGroupArray.push(index)
}

const theseClasses = ref<string[]>([])

if (props.depth < props.maxDepth) {
  theseClasses.value = props.classesArray[props.depth + 1].classes
}

const div = ref(null)

onMounted(() => {
  gsap.to(div.value, {
    delay: props.depth * 1,
    duration: 30,
    physics2D: {
      velocity: getRandomIntIncBip(30) * props.depth,
      acceleration: Math.random() * 2,
      angle: getRandomIntIncBip(180),
      gravity: getRandomIntIncBip(0),
      friction: 0.005,
    },
    physicsProps: {
      rotation: {
        // velocity: getRandomIntInc(100, 300),
        friction: 0.01,
        // acceleration: getRandomIntInc(0, 20),
      },
      scale: {
        // velocity: getRandomIntInc(0, 1) * 0.1,
        friction: 0.11 * Math.random(),
      },
    },
  })
})
</script>

<template>
  <div v-if="depth < maxDepth" ref="div" :class="theseClasses">
    <SinglePhysics
      v-for="navItem in itemsPerGroupArray"
      :key="navItem"
      :depth="depth + 1"
      :classesArray="classesArray"
      :itemsPerGroup="itemsPerGroup"
      :maxDepth="maxDepth"
    />
  </div>
</template>

<style scoped>
div {
  position: absolute;
  left: 0;
  right: 0;
  margin-inline: auto;
  height: 25px;
  width: 25px;
  border: 1px solid #000;
}

/* Hide the initial solo container instance of this */
.h-full > div:first-child {
  background: transparent;
  border: 0;
  top: 50%;
}
</style>
