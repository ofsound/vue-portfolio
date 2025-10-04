<script setup lang="ts">
import PersistentPlayer from '@/components/PersistentPlayer.vue'

import SiteNav from '@/components/SiteNav.vue'

import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div
    class="flex h-full flex-col bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 p-4 dark:bg-black dark:bg-none"
  >
    <header class="relative">
      <button
        class="absolute right-0 mx-auto rounded-xl bg-black px-3 py-1 text-xs text-amber-50 dark:bg-gray-400 dark:text-white"
        @click="toggleDark()"
      >
        {{ isDark ? '&#128161; light' : '&#128161; dark' }}
      </button>
      <SiteNav />
    </header>
    <main
      class="my-4 hidden w-full grow-1 overflow-auto border-4 border-gray-100 px-4 py-4 dark:border-gray-300"
    >
      <RouterView />
    </main>
    <PersistentPlayer />
  </div>
</template>
