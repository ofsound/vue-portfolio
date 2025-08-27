<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'

let startTime = 0
const trackIndex = ref(0)
const elapsed = ref(0)
const progressPercentage = ref(0)

let firstPlay = true

let drawVisual = 55
let drawVisual2 = 55

const audioContext = new window.AudioContext()
let source = audioContext.createBufferSource()
const gainNode = audioContext.createGain()

const analyser = audioContext.createAnalyser()

analyser.fftSize = 256
const bufferLength = analyser.frequencyBinCount
const dataArray = new Uint8Array(bufferLength)

let audioBuffer: AudioBuffer = new AudioBuffer({
  numberOfChannels: 2,
  length: audioContext.sampleRate * 0.5,
  sampleRate: audioContext.sampleRate,
})

async function loadAudioBuffers(fileNames: Array<string>) {
  const buffers = await Promise.all(
    fileNames.map(async (file) => {
      try {
        const response = await fetch(`${file}`)
        const arrayBuffer = await response.arrayBuffer()
        return audioContext.decodeAudioData(arrayBuffer)
      } catch (error) {
        console.error(`Error loading or decoding ${file}:`, error)
        return null
      }
    }),
  )
  return buffers.filter((buffer) => buffer !== null)
}

const audioData = [
  { title: 'Ghost Camels', file: '01.mp3' },
  { title: 'Abu Rawash', file: '02.mp3' },
  { title: 'Get Thee Behind Me', file: '03.mp3' },
]

const buffers = await loadAudioBuffers(audioData.map((track) => track.file))

const playAudio = (index: number) => {
  if (source && !firstPlay) {
    source.stop()
  }

  firstPlay = false

  source = audioContext.createBufferSource()
  if (buffers[index]) {
    source.buffer = buffers[index]
    audioBuffer = buffers[index]
  }

  source.connect(gainNode).connect(analyser).connect(audioContext.destination)
  source.start(0)

  startTime = audioContext.currentTime
  requestAnimationFrame(updateProgressBar)
}

const toggleAudio = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  } else {
    audioContext.suspend()
  }
}

const playlistClick = (index: number) => {
  playAudio(index)
}

const prevTrack = () => {
  if (trackIndex.value > 0) {
    trackIndex.value--
    playAudio(trackIndex.value)
  }
}
const nextTrack = () => {
  if (trackIndex.value < audioData.length) {
    trackIndex.value++
    playAudio(trackIndex.value)
  }
}

const seekAudio = (event: MouseEvent) => {
  if (source) {
    source.stop()
  }

  const clickedElement = event.target as HTMLElement
  const offsetX = event.offsetX
  const startOffset = audioBuffer.duration * (offsetX / clickedElement.clientWidth)

  source = audioContext.createBufferSource()
  source.buffer = audioBuffer
  source.connect(gainNode).connect(audioContext.destination)
  source.start(0, startOffset)

  startTime = audioContext.currentTime - startOffset
}

function updateProgressBar() {
  elapsed.value = audioContext.currentTime - startTime
  progressPercentage.value = (elapsed.value / audioBuffer.duration) * 100
  requestAnimationFrame(updateProgressBar)
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

const currentTrackTitle = computed(() => {
  const thisObject = audioData[trackIndex.value]
  if (thisObject) {
    return thisObject.title
  } else {
    return 'none'
  }
})

onUnmounted(() => {
  cancelAnimationFrame(drawVisual)
  cancelAnimationFrame(drawVisual2)
})

onMounted(() => {
  const volumeControl = document.querySelector('#volume') as HTMLInputElement
  if (volumeControl) {
    volumeControl.addEventListener(
      'input',
      () => {
        gainNode.gain.value = parseFloat(volumeControl.value)
      },
      false,
    )
  }
  const canvas = document.getElementById('myCanvas') as HTMLCanvasElement
  const canvas2 = document.getElementById('myCanvas2') as HTMLCanvasElement

  const canvasCtx = canvas.getContext('2d')
  const canvasCtx2 = canvas2.getContext('2d')

  if (canvasCtx) {
    canvasCtx.clearRect(0, 0, 150, 150)
  }

  if (canvasCtx2) {
    canvasCtx2.clearRect(0, 0, 150, 150)
  }

  // canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)

  function draw() {
    drawVisual = requestAnimationFrame(draw)

    analyser.getByteFrequencyData(dataArray)

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

  function draw2() {
    drawVisual2 = requestAnimationFrame(draw2)

    analyser.getByteTimeDomainData(dataArray)

    if (canvasCtx2) {
      canvasCtx2.fillStyle = 'rgb(200 200 200)'
      canvasCtx2.fillRect(0, 0, 150, 150)

      canvasCtx2.lineWidth = 2
      canvasCtx2.strokeStyle = 'rgb(0 0 0)'
      canvasCtx2.beginPath()

      const sliceWidth = 150 / bufferLength
      let x = 0
      for (let i = 0; i < bufferLength; i++) {
        const thisDataArray = dataArray[i]

        if (thisDataArray) {
          const v = thisDataArray / 128.0
          const y = v * (150 / 2)

          if (i === 0) {
            canvasCtx2.moveTo(x, y)
          } else {
            canvasCtx2.lineTo(x, y)
          }

          x += sliceWidth
        }
      }

      canvasCtx2.lineTo(150, 150 / 2)
      canvasCtx2.stroke()
    }
  }

  draw()
  draw2()
})
</script>

<template>
  <section class="ml-auto w-full shrink-0">
    <div class="my-4 bg-gray-400 p-4">
      <div
        class="hover:underline"
        v-for="(track, index) in audioData.map((track) => track.title)"
        :key="track"
        @click="playlistClick(index)"
      >
        {{ track }}
      </div>
    </div>
    <div>{{ currentTrackTitle }}</div>
    <div class="flex h-12 items-center justify-end gap-4">
      <div class="h-full w-full bg-gray-200" @click="seekAudio">
        <div
          :style="{ width: progressPercentage + '%' }"
          class="pointer-events-none h-full bg-green-800"
        ></div>
      </div>
      <div>{{ formatTime(elapsed) }}</div>
      <div>{{ formatTime(audioBuffer.duration) }}</div>
      <input type="range" id="volume" min="0" max="2" value="1" step="0.01" />
      <button
        class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
        @click="prevTrack"
      >
        prev
      </button>
      <button
        class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
        @click="toggleAudio"
      >
        play/pause
      </button>
      <button
        class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
        @click="nextTrack"
      >
        next
      </button>
    </div>
    <div class="flex">
      <div class="flex-1">
        <canvas id="myCanvas" width="150" height="150"></canvas>
      </div>
      <div class="flex-1">
        <canvas id="myCanvas2" width="150" height="150"></canvas>
      </div>
    </div>
  </section>
</template>
