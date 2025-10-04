<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef } from 'vue'

const props = defineProps<{
  analyser: AnalyserNode
}>()

const bufferLength = props.analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

let drawVisual = -1

const canvas = useTemplateRef('myCanvas')

onMounted(() => {
  if (canvas.value) {
    const canvasContext = canvas.value.getContext('2d')

    if (canvasContext) {
      canvasContext.clearRect(0, 0, 150, 150)
    }

    function draw() {
      drawVisual = requestAnimationFrame(draw)

      props.analyser.getByteFrequencyData(dataArray)

      if (canvasContext) {
        canvasContext.fillStyle = 'rgb(0 0 0)'
        canvasContext.fillRect(0, 0, 150, 150)

        const barWidth = (150 / bufferLength) * 2.5
        let barHeight
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const thisDataArray = dataArray[i]

          if (thisDataArray) {
            barHeight = thisDataArray / 2
          } else {
            barHeight = 10
          }

          canvasContext.fillStyle = `rgb(${barHeight + 100} 50 50)`
          canvasContext.fillRect(x, 150 - barHeight / 2, barWidth, barHeight)

          x += barWidth + 1
        }
      }
    }

    draw()
  }
})
onUnmounted(() => {
  cancelAnimationFrame(drawVisual)
})
</script>

<template>
  <canvas ref="myCanvas" width="150" height="150"></canvas>
</template>
