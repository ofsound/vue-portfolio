<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const myElement = ref(null)

onMounted(() => {
  if (myElement.value) {
    gsap.to(myElement.value, { x: 200, y: 300 })
  }
})
</script>

<template>
  <h1 ref="myElement">greensock</h1>
</template>
