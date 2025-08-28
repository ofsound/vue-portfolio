<script setup lang="ts">
import { ref } from 'vue'

import SinglePhysics from '@/components/SinglePhysics.vue'

import { getRandomIntInc } from '@/utils/MathUtils.ts'
import { randomBackgroundColor } from '@/utils/TailwindColors.ts'

interface StyleObject {
  id: number
  classes: string[]
}

const classesArray = ref<StyleObject[]>([])

const classPool = [
  'rounded',
  'rounded-md',
  'rounded-lg',
  'rounded-4xl',
  'rounded-full',
  'rotate-12',
  'rotate-6',
  'scale-75',
  'scale-50',
  'scale-200',
]

const recursionDepth = 3
const itemsPerGroup = 5
const classesPerLayer = 6

for (let i = 0; i < recursionDepth + 1; i++) {
  const object: StyleObject = {
    id: i,
    classes: [],
  }

  for (let i = 0; i < classesPerLayer; i++) {
    const randomInt = getRandomIntInc(0, classPool.length - 1)
    const randomClassFromPool = classPool[randomInt]
    if (randomClassFromPool) {
      object.classes.push(randomClassFromPool)
    }
  }

  object.classes.push(randomBackgroundColor())

  classesArray.value.push(object)
}
</script>

<template>
  <div class="relative flex h-full bg-gray-200">
    <SinglePhysics
      :depth="-1"
      :itemsPerGroup="itemsPerGroup"
      :maxDepth="classesArray.length - 1"
      :classesArray="classesArray"
    />
  </div>
</template>
