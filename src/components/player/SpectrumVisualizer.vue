<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

import { gsap } from 'gsap'

import { PhysicsPropsPlugin } from 'gsap/PhysicsPropsPlugin'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'

// import { getRandomIntIncBip } from '@/utils/MathUtils.ts'

gsap.registerPlugin(PhysicsPropsPlugin, Physics2DPlugin)

const props = defineProps<{
  analyser: AnalyserNode
}>()

const bufferLength = props.analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

let drawVisual = -1

const canvas = useTemplateRef('spectrumCanvas')

const canvasWidth = ref(600) // make this dynamic

const binGroupTotal = 8

const binGroupSize = bufferLength / binGroupTotal

const binsArray = ref<number[][]>([])

const binTotalsDisplay = ref<number[]>([])
binTotalsDisplay.value = new Array(8).fill(0)

const binTriggers = ref<boolean[]>([])
binTriggers.value = new Array(8).fill(false)

const div0 = ref(null)
const div1 = ref(null)
const div2 = ref(null)
const div3 = ref(null)
const div4 = ref(null)
const div5 = ref(null)
const div6 = ref(null)
const div7 = ref(null)

const divArray = [div0, div1, div2, div3, div4, div5, div6, div7]

for (let index = 0; index < binGroupTotal; index++) {
  const element = [binGroupSize * index, binGroupSize * (index + 1)]
  binsArray.value.push(element)
}

binsArray.value = [
  [0, 1],
  [2, 6],
  [7, 10],
  [11, 15],
  [16, 22],
  [23, 32],
  [33, 64],
  [65, 128],
]

const binThresholds = [220, 400, 300, 300, 500, 400, 200, 10]

const handleTrigger = (thisBin: number) => {
  for (let index = 0; index < divArray.length; index++) {
    const thisBinRef = divArray[thisBin]

    if (thisBinRef) {
      const thisDiv = thisBinRef.value

      gsap.to(thisDiv, {
        duration: 0.05,
        x: '+=1px',
      })
    }
  }
}

watch(binTotalsDisplay, (newValue, oldValue) => {
  for (let index = 0; index < binThresholds.length; index++) {
    const prevValue = oldValue[index] as number
    const thisValue = newValue[index] as number
    const thisThreshold = binThresholds[index] as number

    if (thisValue > thisThreshold) {
      if (prevValue < thisThreshold) {
        handleTrigger(index)
      }
    }
  }
})

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

        const binTotals: number[] = new Array(8).fill(0)

        for (let i = 0; i < bufferLength; i++) {
          const thisDataArray = dataArray[i]

          if (thisDataArray) {
            barHeight = thisDataArray / 2

            for (let j = 0; j < binsArray.value.length; j++) {
              if (binsArray.value[j]) {
                const thisBin = binsArray.value[j]

                if (thisBin) {
                  const lowerLimit = thisBin[0]
                  const upperLimit = thisBin[1]

                  // console.log('lower:', lowerLimit)
                  // console.log('upper:', upperLimit)

                  if (lowerLimit != null && upperLimit) {
                    if (i >= lowerLimit && i < upperLimit) {
                      // console.log(j)

                      binTotals[j] = thisDataArray + (binTotals[j] as number)
                    }
                  }
                }
              }
            }
          } else {
            barHeight = 10
          }

          canvasContext.fillStyle = `rgb(${barHeight + 100} 50 50)`
          canvasContext.fillRect(x, 150 - barHeight / 2, barWidth, barHeight)

          x += barWidth
        }

        binTotalsDisplay.value = binTotals
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
  <canvas ref="spectrumCanvas" :width="canvasWidth" height="150"></canvas>
  <div class="h-full bg-white p-10">
    <div class="font-bold">Metrics</div>
    <div class="flex">
      <div>
        <div v-for="(value, index) in binsArray" :key="index">
          {{ value }}
        </div>
      </div>
      <div class="ml-4 w-12">
        <div v-for="(value, index) in binThresholds" :key="index">
          {{ value }}
        </div>
      </div>
      <div class="ml-4 w-12">
        <div v-for="(value, index) in binTotalsDisplay" :key="index">
          {{ value }}
        </div>
      </div>
      <div class="ml-4">
        <div ref="div0">*</div>
        <div ref="div1">*</div>
        <div ref="div2">*</div>
        <div ref="div3">*</div>
        <div ref="div4">*</div>
        <div ref="div5">*</div>
        <div ref="div6">*</div>
        <div ref="div7">*</div>
      </div>
    </div>
  </div>
</template>
