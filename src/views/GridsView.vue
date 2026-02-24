<script setup lang="ts">
import { ref } from 'vue'
import CellGrid from '@/components/CellGrid.vue'
import darkWasTheNightImage from '@/assets/dark-was-the-night.jpg'
import screenshotImage from '@/assets/ss.png'

interface Cell {
  id: number
  isInner: boolean
  isImage: boolean
  style: string
  url: string
  color: string
  innerArray: Cell[]
}

let index = 0

const cellArray = ref<Cell[]>([
  {
    isImage: true,
    id: index++,
    url: darkWasTheNightImage,
    color: 'bg-blue-500',
    isInner: false,
    style: '',
    innerArray: [],
  },

  {
    isInner: false,
    isImage: false,
    id: index++,
    style: 'animate-spin',
    color: 'bg-sky-500',
    url: '',
    innerArray: [],
  },

  {
    isInner: true,
    isImage: false,
    id: index++,
    style: 'animate-spin',
    color: 'bg-green-500',
    url: '',
    innerArray: [
      {
        isInner: true,
        isImage: false,
        id: index++,
        style: 'animate-spin',
        color: 'bg-green-500',
        url: '',
        innerArray: [
          {
            isImage: true,
            id: index++,
            url: screenshotImage,
            color: 'bg-amber-500',
            isInner: false,
            style: '',
            innerArray: [],
          },
          {
            isInner: true,
            isImage: false,
            id: index++,
            style: 'animate-spin',
            color: 'bg-green-500',
            url: '',
            innerArray: [
              {
                isInner: true,
                isImage: false,
                id: index++,
                style: 'animate-spin',
                color: 'bg-green-500',
                url: '',
                innerArray: [
                  {
                    isImage: true,
                    id: index++,
                    url: screenshotImage,
                    color: 'bg-green-500',
                    isInner: false,
                    style: '',
                    innerArray: [],
                  },
                  {
                    isInner: false,
                    isImage: false,
                    id: index++,
                    style: 'animate-spin',
                    color: 'bg-green-500',
                    url: '',
                    innerArray: [],
                  },
                ],
              },
              {
                isInner: false,
                isImage: false,
                id: index++,
                style: 'animate-spin',
                color: 'bg-yellow-500',
                url: '',
                innerArray: [],
              },
              {
                isInner: false,
                isImage: false,
                id: index++,
                style: 'animate-spin',
                color: 'bg-amber-500',
                url: '',
                innerArray: [],
              },
              {
                isInner: false,
                isImage: false,
                id: index++,
                style: 'animate-spin',
                color: 'bg-blue-900',
                url: '',
                innerArray: [],
              },
            ],
          },
        ],
      },
      {
        isInner: false,
        isImage: false,
        id: index++,
        style: 'animate-spin',
        color: 'bg-green-500',
        url: '',
        innerArray: [],
      },
      {
        isInner: false,
        isImage: false,
        id: index++,
        style: 'animate-spin',
        color: 'bg-green-500',
        url: '',
        innerArray: [],
      },
      {
        isImage: true,
        id: index++,
        url: screenshotImage,
        color: 'bg-blue-500',
        isInner: false,
        style: '',
        innerArray: [],
      },
    ],
  },
  {
    isImage: true,
    id: index++,
    url: screenshotImage,
    color: 'bg-blue-500',
    isInner: false,
    style: '',
    innerArray: [],
  },
])
</script>

<template>
  <CellGrid :cellArray="cellArray" />
</template>
