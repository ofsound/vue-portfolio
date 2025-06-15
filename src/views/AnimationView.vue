<script setup lang="ts">
import { ref } from 'vue'
import CellGrid from '@/components/CellGrid.vue'

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
    url: '/src/assets/ss.png',
    color: 'bg-blue-500',
    isInner: false,
    style: '',
    innerArray: [],
  },

  {
    isImage: true,
    id: index++,
    url: '/src/assets/ss.png',
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
    color: 'bg-green-500',
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
            url: '/src/assets/ss.png',
            color: 'bg-blue-500',
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
                    url: '/src/assets/ss.png',
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
                color: 'bg-green-500',
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
    ],
  },
])
</script>

<template>
  <CellGrid :cellArray="cellArray" />
</template>
