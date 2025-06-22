<script setup lang="ts">
import { ref } from 'vue'
import SinglePhysics from '@/components/SinglePhysics.vue'

import { getRandomIntInc } from '@/utils/MathUtils.ts'
import { randomBackgroundColor } from '@/utils/TailwindColors.ts'

const classPool = [
  'rounded',
  'rounded-md',
  'rounded-lg',
  'rounded-4xl',
  'rounded-full',
  'drop-shadow-md',
  'drop-shadow-lg',
]

const itemsPerGroup = 2
const totalLayers = 4
const totalStylesPerLayer = 0

const objectArray = []

for (let i = 0; i < totalLayers; i++) {
  // interface StyleObject {
  //   id: number
  //   classes: string[]
  // }

  const layerObject = {
    id: i,
    classes: ['border'],
  }

  for (let i = 0; i < totalStylesPerLayer; i++) {
    const randomInt = getRandomIntInc(0, classPool.length - 1)
    layerObject.classes.push(classPool[randomInt])
  }

  const colorString = randomBackgroundColor()

  layerObject.classes.push(colorString)

  objectArray.push(layerObject)
}

const classesArray = ref(objectArray)
</script>

<template>
  <div class="flex h-full bg-white">
    <SinglePhysics
      :depth="-1"
      :itemsPerGroup="itemsPerGroup"
      :maxDepth="classesArray.length - 1"
      :classesArray="classesArray"
    />
  </div>
</template>
