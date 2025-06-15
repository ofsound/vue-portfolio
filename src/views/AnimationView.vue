<script setup lang="ts">
import { ref } from 'vue'
import CellGrid from '@/components/CellGrid.vue'

interface Person {
  id: number
  isInner: boolean
  isImage: boolean
  style: string
  url: string
  color: string
  innerArray: Person[]
}

let index = 0

const cellArray = ref<Person[]>([
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
    innerArray: [
      {
        isInner: true,
        isImage: false,
        innerArray: [
          {
            isImage: false,
            id: index++,
            style: 'animate-spin',
            color: 'bg-pink-500',
            isInner: false,
            url: '',
            innerArray: [],
          },
          {
            isImage: true,
            id: index++,
            url: '/src/assets/dark-was-the-night.jpg',
            color: 'bg-blue-500',
            isInner: false,
            style: '',
            innerArray: [],
          },
          {
            isImage: false,
            id: index++,
            style: 'animate-spin',
            color: 'bg-white',
            isInner: false,
            url: '',
            innerArray: [],
          },
          {
            isInner: true,
            isImage: false,
            innerArray: [
              {
                isInner: true,
                isImage: false,
                innerArray: [
                  {
                    isImage: false,
                    id: index++,
                    style: 'animate-spin',
                    color: 'bg-pink-500',
                    isInner: false,
                    url: '',
                    innerArray: [],
                  },
                  {
                    isImage: true,
                    id: index++,
                    url: '/src/assets/dark-was-the-night.jpg',
                    color: 'bg-blue-500',
                    isInner: false,
                    style: '',
                    innerArray: [],
                  },
                  {
                    isImage: false,
                    id: index++,
                    style: 'animate-spin',
                    color: 'bg-white',
                    isInner: false,
                    url: '',
                    innerArray: [],
                  },
                  {
                    isInner: true,
                    isImage: false,
                    innerArray: [
                      {
                        isImage: false,
                        id: index++,
                        style: 'animate-spin',
                        color: 'bg-pink-500',
                        isInner: false,
                        url: '',
                        innerArray: [],
                      },
                      {
                        isImage: true,
                        id: index++,
                        url: '/src/assets/dark-was-the-night.jpg',
                        color: 'bg-blue-500',
                        isInner: false,
                        style: '',
                        innerArray: [],
                      },
                      {
                        isImage: false,
                        id: index++,
                        style: 'animate-spin',
                        color: 'bg-white',
                        isInner: false,
                        url: '',
                        innerArray: [],
                      },
                      {
                        isImage: false,
                        id: index++,
                        style: 'animate-spin',
                        color: 'bg-blue-500',
                        isInner: false,
                        url: '',
                        innerArray: [],
                      },
                    ],
                    id: index++,
                    style: '',
                    url: '',
                    color: '',
                  },
                ],
                id: index++,
                style: '',
                url: '',
                color: '',
              },
              {
                isImage: false,
                id: index++,
                style: 'animate-spin',
                color: 'bg-blue-500',
                isInner: false,
                url: '',
                innerArray: [],
              },
              {
                isImage: true,
                id: index++,
                url: '/src/assets/dark-was-the-night.jpg',
                color: 'bg-blue-500',
                isInner: false,
                style: '',
                innerArray: [],
              },
              {
                isImage: false,
                id: index++,
                style: 'animate-spin',
                color: 'bg-blue-500',
                isInner: false,
                url: '',
                innerArray: [],
              },
            ],
            id: 0,
            style: '',
            url: '',
            color: '',
          },
        ],
      },

      {
        isImage: false,
        id: index++,
        style: 'animate-spin',
        color: 'bg-blue-500',
        isInner: false,
        url: '',
        innerArray: [],
      },
      {
        isImage: false,
        id: index++,
        style: 'animate-spin',
        color: 'bg-white',
        isInner: false,
        url: '',
        innerArray: [],
      },
      {
        isImage: false,
        id: index++,
        style: 'animate-spin',
        color: 'bg-blue-500',
        isInner: false,
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
