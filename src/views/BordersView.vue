<script setup lang="ts">
import BordersGroup from '@/components/BordersGroup.vue'

import { ref } from 'vue'

const componentKey = ref(0)

const forceRerender = () => {
  componentKey.value += 1
}

// Maybe GSAP smooth transitions between different generated states
</script>

<template>
  <BordersGroup @click="forceRerender" :key="componentKey" />
</template>
