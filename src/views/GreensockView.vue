<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'

const myElement = ref(null)

onMounted(() => {
  if (myElement.value) {
    gsap.to(myElement.value, { duration: 5, x: 200, y: 300, rotation: 20, scale: 4 })
  }
})
</script>

<template>
  <h1 ref="myElement" class="max-w-max">greensock</h1>
</template>
