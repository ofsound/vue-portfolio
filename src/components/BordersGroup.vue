<script setup lang="ts">
import { ref } from 'vue'
import BordersItem from '@/components/BordersItem.vue'

import { getRandomIntInc } from '@/utils/MathUtils.ts'

const borderStyles = [
  'border-1',
  'border-4',
  'border-5',
  'border-6',
  'border-8',
  'border-dashed',
  'border-dotted',
  'border-double',
  'rounded',
  'rounded-4xl',
  'rounded-full',
  'rounded-full',
  'rounded-full',
  'rounded-full',
  'rounded-full',
  'rounded-full',
  'rounded-full',
  'rounded-full',
  'p-1',
  'p-2',
  'p-8',
  'drop-shadow-md',
  'drop-shadow-lg',
  'border-t-0',
  'border-b-0',
  'border-l-0',
  'border-r-0',
  'rotate-x-15',
  '-rotate-y-30',
  '-rotate-z-30',
]

const colorBases = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
]

const colorWeights = [
  '-50',
  '-100',
  '-200',
  '-300',
  '-400',
  '-500',
  '-600',
  '-700',
  '-800',
  '-900',
  '-950',
]

const totalLayers = 32
const totalStylesPerLayer = 9

const objectArray = []

for (let i = 0; i < totalLayers; i++) {
  interface StyleObject {
    id: number
    classes: string[]
  }

  const layerObject: StyleObject = {
    id: i,
    classes: ['border'],
  }

  for (let i = 0; i < totalStylesPerLayer; i++) {
    const randomInt = getRandomIntInc(0, borderStyles.length - 1)
    const thisStyle = borderStyles[randomInt]
    if (thisStyle) {
      layerObject.classes.push(thisStyle)
    }
  }

  const randomIntColorBase = getRandomIntInc(0, colorBases.length - 1)
  const randomIntColorWeight = getRandomIntInc(0, colorWeights.length - 1)

  const colorString =
    'border-' + colorBases[randomIntColorBase] + colorWeights[randomIntColorWeight]

  layerObject.classes.push(colorString)

  objectArray.push(layerObject)
}

const bordersArray = ref(objectArray)
</script>

<template>
  <div class="flex h-full bg-black">
    <BordersItem :depth="-1" :maxDepth="bordersArray.length - 1" :bordersArray="bordersArray" />
  </div>
</template>
