<script setup lang="ts">
defineProps<{
  style?: string
  color?: string
}>()
</script>

<template>
  <div :class="[style, color]" class="h-20 w-20"></div>
</template>
