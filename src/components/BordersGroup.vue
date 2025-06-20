<script setup lang="ts">
import { ref } from 'vue'
import BordersItem from '@/components/BordersItem.vue'
const bordersArray = ref([
  {
    id: 0,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-3',
      'border-blue-800',
      'border-dashed',
      'rounded',
    ],
  },
  {
    id: 1,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-4',
      'border-blue-200',
      'rounded-4xl',
    ],
  },
  {
    id: 2,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-3',
      'border-2',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 3,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-2',
      'border-blue-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 4,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-1',
      'border-4',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 5,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-4',
      'border-black',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 6,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-3',
      'border-purple-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 7,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-6',
      'border-4',
      'border-white',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 8,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-5',
      'border-green-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 9,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-4',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 10,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-3',
      'border-blue-800',
      'border-dashed',
      'rounded',
    ],
  },
  {
    id: 11,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-4',
      'border-blue-200',
      'rounded-4xl',
    ],
  },
  {
    id: 12,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-3',
      'border-2',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 13,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-2',
      'border-blue-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 14,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-1',
      'border-4',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 15,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-2',
      'border-4',
      'border-black',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 16,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-3',
      'border-purple-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 17,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-6',
      'border-4',
      'border-white',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 18,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-8',
      'border-green-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 19,
    classes: [
      'translate-z-20 rotate-x-2 -rotate-y-10',
      'drop-shadow-lg',
      'p-4',
      'border-4',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
])
</script>

<template>
  <div class="flex h-full bg-blue-950 transform-3d">
    <BordersItem :depth="-1" :maxDepth="bordersArray.length - 1" :bordersArray="bordersArray" />
  </div>
</template>
