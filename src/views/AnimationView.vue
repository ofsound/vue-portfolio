<script setup lang="ts">
import { ref } from 'vue'
import GridController from '@/components/GridController.vue'

let index = 0

const cellArray = ref([
  {
    isInner: true,
    isImage: false,
    innerArray: [
      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-amber-500' },
      {
        isImage: true,
        id: index++,
        url: '/src/assets/dark-was-the-night.jpg',
        color: 'bg-blue-500',
      },
      {
        isInner: true,
        isImage: false,
        innerArray: [
          { isImage: false, id: index++, style: 'animate-spin', color: 'bg-pink-500' },
          {
            isImage: true,
            id: index++,
            url: '/src/assets/dark-was-the-night.jpg',
            color: 'bg-blue-500',
          },
          { isImage: false, id: index++, style: 'animate-spin', color: 'bg-white' },
          {
            isInner: true,
            isImage: false,
            innerArray: [
              { isImage: false, id: index++, style: 'animate-spin', color: 'bg-pink-500' },
              {
                isImage: true,
                id: index++,
                url: '/src/assets/dark-was-the-night.jpg',
                color: 'bg-blue-500',
              },
              { isImage: false, id: index++, style: 'animate-spin', color: 'bg-white' },
              { isImage: false, id: index++, style: 'animate-spin', color: 'bg-blue-500' },
            ],
          },
        ],
      },
      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-red-500' },
    ],
  },
  { isImage: true, id: index++, url: '/src/assets/ss.png', color: 'bg-blue-500' },
  { isInner: false, isImage: false, id: index++, style: 'animate-spin', color: 'bg-green-500' },
  {
    isInner: true,
    isImage: false,
    innerArray: [
      {
        isInner: true,
        isImage: false,
        innerArray: [
          { isImage: false, id: index++, style: 'animate-spin', color: 'bg-pink-500' },
          {
            isImage: true,
            id: index++,
            url: '/src/assets/dark-was-the-night.jpg',
            color: 'bg-blue-500',
          },
          { isImage: false, id: index++, style: 'animate-spin', color: 'bg-white' },
          {
            isInner: true,
            isImage: false,
            innerArray: [
              {
                isInner: true,
                isImage: false,
                innerArray: [
                  { isImage: false, id: index++, style: 'animate-spin', color: 'bg-pink-500' },
                  {
                    isImage: true,
                    id: index++,
                    url: '/src/assets/dark-was-the-night.jpg',
                    color: 'bg-blue-500',
                  },
                  { isImage: false, id: index++, style: 'animate-spin', color: 'bg-white' },
                  {
                    isInner: true,
                    isImage: false,
                    innerArray: [
                      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-pink-500' },
                      {
                        isImage: true,
                        id: index++,
                        url: '/src/assets/dark-was-the-night.jpg',
                        color: 'bg-blue-500',
                      },
                      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-white' },
                      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-blue-500' },
                    ],
                  },
                ],
              },
              { isImage: false, id: index++, style: 'animate-spin', color: 'bg-blue-500' },
              {
                isImage: true,
                id: index++,
                url: '/src/assets/dark-was-the-night.jpg',
                color: 'bg-blue-500',
              },
              { isImage: false, id: index++, style: 'animate-spin', color: 'bg-blue-500' },
            ],
          },
        ],
      },

      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-blue-500' },
      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-white' },
      { isImage: false, id: index++, style: 'animate-spin', color: 'bg-blue-500' },
    ],
  },
])
</script>

<template>
  <GridController :cellArray="cellArray" />
</template>
