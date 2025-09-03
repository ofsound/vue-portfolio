<script setup lang="ts">
import { ref } from 'vue'

import { useMouseGesture } from '@/composables/useMouseGesture.ts'
const { mouseDownHandler, mouseUpHandler, startX, startY, vectorX } = useMouseGesture()

import SinglePhysics from '@/components/SinglePhysics.vue'

import { getRandomIntInc } from '@/utils/MathUtils.ts'
import { randomBackgroundColor } from '@/utils/TailwindColors.ts'

interface StyleObject {
  id: number
  classes: string[]
}

const keyIndex = ref(0)

const classesArray = ref<StyleObject[]>([])
const itemsPerGroup = ref(5)

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

const resetValues = () => {
  classesArray.value.length = 0

  const recursionDepth = Math.round(3 * startX.value) + 1
  itemsPerGroup.value = Math.round(5 * startY.value)
  const classesPerLayer = Math.round(10 * vectorX.value)

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
}

const updateAnimation = (e: MouseEvent) => {
  mouseUpHandler(e)

  resetValues()
  keyIndex.value++
}
</script>

<template>
  <div
    @mousedown="mouseDownHandler"
    @mouseup="updateAnimation"
    class="relative flex h-full bg-gray-200 dark:bg-gray-950"
  >
    <SinglePhysics
      :key="keyIndex"
      :depth="-1"
      :itemsPerGroup="itemsPerGroup"
      :maxDepth="classesArray.length - 1"
      :classesArray="classesArray"
    />
  </div>
</template>
