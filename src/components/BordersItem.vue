<script setup lang="ts">
import { ref } from 'vue'

interface Custom {
  id: number
  classes: string[]
}

const props = defineProps<{
  maxDepth: number
  depth: number
  bordersArray: Custom[]
}>()

const theseClasses = ref<string[]>([])

if (props.depth < props.maxDepth) {
  theseClasses.value = props.bordersArray[props.depth + 1].classes
}
</script>

<template>
  <div v-if="depth < maxDepth" class="flex w-full transform-3d" :class="theseClasses">
    <BordersItem :depth="depth + 1" :bordersArray="bordersArray" :maxDepth="maxDepth" />
  </div>
</template>
