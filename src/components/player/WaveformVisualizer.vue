<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  analyser: AnalyserNode
}>()

const bufferLength = props.analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

let drawVisual = -1

onMounted(() => {
  const canvas = document.getElementById('myCanvas2') as HTMLCanvasElement

  const canvasCtx = canvas.getContext('2d')

  if (canvasCtx) {
    canvasCtx.clearRect(0, 0, 150, 150)
  }

  function draw() {
    drawVisual = requestAnimationFrame(draw)

    props.analyser.getByteFrequencyData(dataArray)

    if (canvasCtx) {
      canvasCtx.fillStyle = 'rgb(0 0 0)'
      canvasCtx.fillRect(0, 0, 150, 150)

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

        canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`
        canvasCtx.fillRect(x, 150 - barHeight / 2, barWidth, barHeight)

        x += barWidth + 1
      }
    }
  }

  draw()
})
onUnmounted(() => {
  cancelAnimationFrame(drawVisual)
})
</script>

<template>
  <canvas id="myCanvas2" width="150" height="150"></canvas>
</template>
