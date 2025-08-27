<script setup lang="ts">
import SpectrumVisualizer from '@/components/player/SpectrumVisualizer.vue'
import WaveformVisualizer from '@/components/player/WaveformVisualizer.vue'

const props = defineProps<{
  analyser: AnalyserNode
}>()

console.log(props.analyser)
</script>

<template>
  <SpectrumVisualizer :analyser />
  <WaveformVisualizer :analyser />
</template>
