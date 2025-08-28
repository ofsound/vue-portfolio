<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import SpectrumVisualizer from '@/components/player/SpectrumVisualizer.vue'
import WaveformVisualizer from '@/components/player/WaveformVisualizer.vue'

let startTime = 0
const trackIndex = ref(0)
const elapsed = ref(0)
const progressPercentage = ref(0)

const rangeValue = ref(1)

let firstPlay = true

const audioContext = new window.AudioContext()
let source = audioContext.createBufferSource()
const gainNode = audioContext.createGain()

const analyser = audioContext.createAnalyser()

analyser.fftSize = 256

let audioBuffer: AudioBuffer = new AudioBuffer({
  numberOfChannels: 2,
  length: audioContext.sampleRate * 0.5,
  sampleRate: audioContext.sampleRate,
})

const audioData = [
  { title: 'Ghost Camels', file: '01.mp3' },
  { title: 'Abu Rawash', file: '02.mp3' },
  { title: 'Get Thee Behind Me', file: '03.mp3' },
]

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

playAudio(0)

const toggleAudio = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  } else {
    audioContext.suspend()
  }
}

const playlistClick = (index: number) => {
  trackIndex.value = index
  playAudio(index)
}

const prevTrack = () => {
  if (trackIndex.value > 0) {
    trackIndex.value--
    playAudio(trackIndex.value)
  }
}
const nextTrack = () => {
  if (trackIndex.value < audioData.length - 1) {
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
})
</script>

<template>
  <div class="px-12">
    <section class="w-full shrink-0 border-1 border-gray-300">
      <div class="my-4 hidden bg-gray-400 p-4">
        <div
          class="hover:underline"
          v-for="(track, index) in audioData.map((track) => track.title)"
          :key="track"
          @click="playlistClick(index)"
        >
          {{ index + 1 }}. {{ track }}
          {{ index == trackIndex ? '*' : '' }}
        </div>
      </div>

      <div class="px-2">
        <div class="flex h-20 basis-1/3 items-center justify-between gap-4 [&>*]:flex-1">
          <div class="flex h-full flex-col">
            <div class="mt-6">{{ currentTrackTitle }}</div>
            <div class="mt-auto text-sm">{{ formatTime(elapsed) }}</div>
          </div>
          <div class="flex h-2/3 justify-center gap-2">
            <button
              class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
              @click="prevTrack"
            >
              &lt;
            </button>
            <button
              class="h-full w-23 cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
              @click="toggleAudio"
            >
              {{ audioContext.state === 'suspended' ? 'play' : 'pause' }}
            </button>
            <button
              class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
              @click="nextTrack"
            >
              &gt;
            </button>
          </div>
          <div class="flex h-full flex-col items-end text-right">
            <input
              class="mt-8 max-w-7/8"
              type="range"
              id="volume"
              min="0"
              max="1.2"
              v-model="rangeValue"
              step="0.01"
            />
            <div class="mt-auto text-sm">{{ formatTime(audioBuffer.duration) }}</div>
          </div>
        </div>
      </div>

      <div class="flex h-4 w-full bg-gray-200" @click="seekAudio">
        <div
          :style="{ width: progressPercentage + '%' }"
          class="pointer-events-none h-full bg-green-800"
        ></div>
      </div>

      <div class="mt-6 hidden gap-8 bg-gray-300 p-10">
        <SpectrumVisualizer :analyser />
        <WaveformVisualizer :analyser />
      </div>
    </section>
  </div>
</template>
