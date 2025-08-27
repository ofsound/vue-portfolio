<script setup lang="ts">
import { ref } from 'vue'

interface Custom {
  id: number
  classes: string[]
}

const props = defineProps<{
  maxDepth: number
  depth: number
  borders: Custom[]
}>()

const theseClasses = ref<string[]>([])

if (props.depth < props.maxDepth) {
  const thisObject = props.borders[props.depth + 1]
  if (thisObject) {
    theseClasses.value = thisObject.classes
  }
}
</script>

<template>
  <div v-if="depth < maxDepth" class="flex w-full" :class="theseClasses">
    <BordersItem :depth="depth + 1" :borders="borders" :maxDepth="maxDepth" />
  </div>
</template>
