<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import SpectrumVisualizer from '@/components/player/SpectrumVisualizer.vue'
import WaveformVisualizer from '@/components/player/WaveformVisualizer.vue'

let startTime = 0
const trackIndex = ref(0)
const elapsed = ref(0)
const progressPercentage = ref(0)

const rangeValue = ref(1)

const playlistVisible = ref(false)

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

const toggleAudio = () => {
  if (audioContext.state === 'suspended') {
    audioContext.resume()
  } else {
    audioContext.suspend()
  }
}

const openPlaylist = () => {
  playlistVisible.value = !playlistVisible.value
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
  playAudio(0)
})
</script>

<template>
  <div class="mb-8">
    <section class="w-full shrink-0">
      <Teleport to="body" v-if="playlistVisible">
        <div class="absolute z-0 flex h-full w-full flex-col bg-gray-100 p-30">
          <a
            href="#"
            class="block border-b-1 border-gray-400 px-1 py-2 hover:bg-gray-200"
            v-for="(track, index) in audioData.map((track) => track.title)"
            :key="track"
            @click="playlistClick(index)"
          >
            <span class="mr-1 text-xs font-bold">{{ index + 1 }}.</span> {{ track }}
            {{ index == trackIndex ? '*' : '' }}
          </a>
        </div>
      </Teleport>
      <div class="relative z-10">
        <div class="flex h-20 basis-1/3 items-center justify-between gap-4 [&>*]:flex-1">
          <div class="flex h-full flex-col">
            <div class="mt-5 text-xl font-bold">
              <div class="border-0 border-b-2 border-gray-300 px-1 py-1">
                {{ currentTrackTitle }}
              </div>
            </div>
          </div>
          <div class="flex h-2/3 justify-center gap-2">
            <button
              class="mt-1 aspect-square max-h-7/8 cursor-pointer rounded-full bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm font-black hover:bg-gray-400"
              @click="prevTrack"
            >
              &#9664;
            </button>
            <button
              class="relative block aspect-square cursor-pointer rounded-full bg-linear-to-t from-sky-600 to-indigo-300 px-3 hover:bg-gray-400"
              @click="toggleAudio"
            >
              <svg
                v-if="audioContext.state === 'suspended'"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute top-[15px] right-0 left-1 mr-auto ml-auto h-6 w-6"
                viewBox="0 0 512 512"
              >
                <path
                  d="M133 440a35.37 35.37 0 01-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37 7.46-27.53 19.46-34.33a35.13 35.13 0 0135.77.45l247.85 148.36a36 36 0 010 61l-247.89 148.4A35.5 35.5 0 01133 440z"
                />
              </svg>
              <svg
                v-if="audioContext.state !== 'suspended'"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute top-[15.5px] right-0 left-0 mr-auto ml-auto h-6 w-6"
                viewBox="0 0 512 512"
              >
                <path
                  d="M208 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16zM352 432h-48a16 16 0 01-16-16V96a16 16 0 0116-16h48a16 16 0 0116 16v320a16 16 0 01-16 16z"
                />
              </svg>
            </button>
            <button
              class="mt-1 aspect-square max-h-7/8 cursor-pointer rounded-full bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
              @click="nextTrack"
            >
              &#9654;
            </button>
          </div>
          <div class="flex h-full flex-col items-end px-2 text-right">
            <button
              class="mt-1 aspect-square rotate-[211deg] cursor-pointer rounded-full px-3 py-1 text-sm hover:bg-gray-400"
              @click="openPlaylist"
            >
              &#9664;
            </button>
            <input
              class="mt-8 max-w-7/8 px-2"
              type="range"
              id="volume"
              min="0"
              max="1.2"
              v-model="rangeValue"
              step="0.01"
            />
          </div>
        </div>
        <div class="text-xs font-bold tabular-nums">
          {{ formatTime(elapsed) }} / {{ formatTime(audioBuffer.duration) }}
        </div>
        <div class="mt-1 opacity-80 hover:opacity-100">
          <div class="flex h-4 w-full bg-gray-100" @click="seekAudio">
            <div
              :style="{ width: progressPercentage + '%' }"
              class="pointer-events-none h-full bg-green-800"
            ></div>
          </div>
        </div>
      </div>
      <div class="mt-6 hidden gap-8 bg-gray-900 p-10">
        <SpectrumVisualizer :analyser />
        <WaveformVisualizer :analyser />
      </div>
    </section>
  </div>
</template>
