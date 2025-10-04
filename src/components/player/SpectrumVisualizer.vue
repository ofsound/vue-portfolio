<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

const props = defineProps<{
  analyser: AnalyserNode
}>()

const bufferLength = props.analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

let drawVisual = -1

const canvas = useTemplateRef('myCanvas')

const canvasWidth = ref(600) // make this dynamic

const binGroupTotal = 8

const binGroupSize = bufferLength / binGroupTotal

const binsArray = ref<number[][]>([])

for (let index = 0; index < binGroupTotal; index++) {
  const element = [binGroupSize * index, binGroupSize * (index + 1)]
  console.log(element)

  binsArray.value.push(element)
}

onMounted(() => {
  if (canvas.value) {
    const canvasContext = canvas.value.getContext('2d')

    if (canvasContext) {
      canvasContext.clearRect(0, 0, canvasWidth.value, 150)
    }

    function draw() {
      drawVisual = requestAnimationFrame(draw)

      props.analyser.getByteFrequencyData(dataArray)

      if (canvasContext) {
        canvasContext.fillStyle = 'rgb(0 0 0)'
        canvasContext.fillRect(0, 0, canvasWidth.value, 150)

        const barWidth = canvasWidth.value / bufferLength
        let barHeight
        let x = 0

        let lowTotal = 0

        for (let i = 0; i < bufferLength; i++) {
          const thisDataArray = dataArray[i]

          if (thisDataArray) {
            barHeight = thisDataArray / 2
            if (i < 10) {
              lowTotal += thisDataArray
            }
          } else {
            barHeight = 10
          }

          canvasContext.fillStyle = `rgb(${barHeight + 100} 50 50)`
          canvasContext.fillRect(x, 150 - barHeight / 2, barWidth, barHeight)

          x += barWidth
        }

        if (lowTotal > 1800) {
          console.log(lowTotal - 1800)
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
  <canvas ref="myCanvas" :width="canvasWidth" height="150"></canvas>
  <div class="h-full bg-white p-10">
    <div class="font-bold">Metrics</div>
    <div v-for="(value, index) in binsArray" :key="index">
      {{ value }}
    </div>
  </div>
</template>
