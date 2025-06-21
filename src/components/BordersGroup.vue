<script setup lang="ts">
import { ref } from 'vue'
import BordersItem from '@/components/BordersItem.vue'
const bordersArray = ref([
  {
    id: 0,
    classes: ['drop-shadow-md', 'p-1', 'border-1', 'border-blue-800', 'border-dashed', 'rounded'],
  },
  {
    id: 1,
    classes: ['drop-shadow-md', 'p-1', 'border-2', 'border-t-0', 'border-blue-200', 'rounded-4xl'],
  },
  {
    id: 2,
    classes: [
      'drop-shadow-md',
      'p-3',
      'border-2',
      'border-t-0',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
      'border-b-0',
    ],
  },
  {
    id: 3,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-2',
      'border-t-0',
      'border-blue-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 4,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-4',
      'border-t-0',
      'border-gray-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 5,
    classes: ['drop-shadow-md', 'p-1', 'border-4', 'border-black', 'border-dashed', 'rounded-4xl'],
  },
  {
    id: 6,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-3',
      'border-r-0',
      'border-b-0',
      'border-purple-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 7,
    classes: ['drop-shadow-md', 'p-6', 'border-4', 'border-white', 'border-dashed', 'rounded-4xl'],
  },
  {
    id: 8,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-5',
      'border-green-200',
      'border-dashed',
      'rounded-4xl',
    ],
  },
  {
    id: 9,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-4',
      'border-gray-200',
      'border-dashed',
      'border-r-0',
      'rounded-4xl',
    ],
  },
  {
    id: 10,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-3',
      'border-r-0',
      'border-b-0',
      'border-blue-800',
      'border-dashed',
      'border-r-0',
      'rounded',
    ],
  },
  {
    id: 11,
    classes: ['drop-shadow-md', 'p-1', 'border-4', 'border-blue-200', 'rounded-4xl'],
  },
  {
    id: 12,
    classes: [
      'drop-shadow-md',
      'p-3',
      'border-2',
      'border-t-0',
      'border-gray-200',
      'border-dashed',
      'border-r-0',
      'rounded-4xl',
    ],
  },
  {
    id: 13,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-2',
      'border-t-0',
      'border-blue-200',
      'border-dashed',
      'border-r-0',
      'rounded-4xl',
      'border-b-0',
    ],
  },
  {
    id: 14,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-4',
      'border-gray-200',
      'border-dashed',
      'border-l-0',
      'rounded-4xl',
      'border-b-0',
    ],
  },
  {
    id: 15,
    classes: [
      'drop-shadow-md',
      'p-2',
      'border-4',
      'border-black',
      'border-dashed',
      'border-l-0',
      'rounded-4xl',
    ],
  },
  {
    id: 16,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-3',
      'border-r-0',
      'border-b-0',
      'border-purple-200',
      'border-dashed',
      'border-l-0',
      'rounded-4xl',
      'border-b-0',
    ],
  },
  {
    id: 17,
    classes: [
      'drop-shadow-md',
      'p-6',
      'border-4',
      'border-white',
      'border-dashed',
      'border-l-0',
      'rounded-4xl',
    ],
  },
  {
    id: 18,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-4',
      'border-green-200',
      'border-dashed',
      'border-l-0',
      'rounded-4xl',
      'border-b-0',
    ],
  },
  {
    id: 19,
    classes: [
      'drop-shadow-md',
      'p-1',
      'border-4',
      'border-gray-200',
      'border-dashed',
      'border-l-0',
      'rounded-4xl',
      'border-b-0',
    ],
  },
])
</script>

<template>
  <div class="flex h-full">
    <BordersItem :depth="-1" :maxDepth="bordersArray.length - 1" :bordersArray="bordersArray" />
  </div>
</template>
