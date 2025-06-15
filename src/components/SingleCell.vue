<script setup lang="ts">
defineProps<{
  style?: string
  color?: string
}>()
</script>

<template>
  <div :class="[style, color]" class="h-3/5 w-3/5"></div>
</template>
