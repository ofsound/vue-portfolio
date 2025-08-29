<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import SinglePlaylist from '@/components/player/SinglePlaylist.vue'
import PlayerTransport from '@/components/player/PlayerTransport.vue'
import SpectrumVisualizer from '@/components/player/SpectrumVisualizer.vue'
import WaveformVisualizer from '@/components/player/WaveformVisualizer.vue'

import { useAudioContext } from '@/composables/useAudioContext.ts'

import { formatTime } from '@/utils/MathUtils.ts'

const trackData = [
  { title: 'Ghost Camels', file: '01.mp3' },
  { title: 'Abu Rawash', file: '02.mp3' },
  { title: 'Get Thee Behind Me', file: '03.mp3' },
]

let isFirstPlay = true

let startTime = 0
const elapsed = ref(0)
const duration = ref(0)

const armedIndex = ref(0)

const progressPercentage = ref(0)

const volumeInputValue = ref(1)

const playlistVisible = ref(false)

const audioContext = new window.AudioContext()
const buffersReady = ref(false)
const isRunning = ref(false)

const { loadBuffers, armAudio, startAudio, getDuration, getAnalyser, setSeekedAudio, setGain } =
  useAudioContext(audioContext, buffersReady, isRunning)

const playlistClick = (index: number) => {
  armedIndex.value = index
  startTrack(index)
}

const handleTransportClick = (type: string) => {
  switch (type) {
    case 'prev':
      if (armedIndex.value > 0) {
        armedIndex.value--
        startTrack(armedIndex.value)
      }
      break
    case 'playPause':
      if (isFirstPlay) {
        isFirstPlay = false
        startTrack(armedIndex.value)
        audioContext.resume()
      } else {
        if (audioContext.state === 'running') {
          audioContext.suspend()
        } else {
          audioContext.resume()
        }
      }
      break
    case 'next':
      if (armedIndex.value < trackData.length - 1) {
        armedIndex.value++
        startTrack(armedIndex.value)
      }
      break
  }
}

const startTrack = (index: number) => {
  armAudio(index)
  startAudio()
  updateDuration()
  startTime = audioContext.currentTime
  requestAnimationFrame(updateProgressBar)
}

const updateDuration = () => {
  duration.value = getDuration()
}

watch(volumeInputValue, () => {
  setGain(volumeInputValue.value)
})

const seekAudio = (event: MouseEvent) => {
  const clickedElement = event.target as HTMLElement
  const offsetX = event.offsetX
  const startOffset = duration.value * (offsetX / clickedElement.clientWidth)

  setSeekedAudio(startOffset)
  updateDuration()
  startTime = audioContext.currentTime - startOffset
}

watch(buffersReady, () => {
  armAudio(0)
  updateDuration()
  audioContext.suspend()
})

const updateProgressBar = () => {
  elapsed.value = audioContext.currentTime - startTime
  progressPercentage.value = (elapsed.value / duration.value) * 100
  requestAnimationFrame(updateProgressBar)
}

onMounted(() => {
  loadBuffers(trackData.map((track) => track.file))
})
</script>

<template>
  <SinglePlaylist
    :armedIndex
    :titles="trackData.map((track) => track.title)"
    v-if="playlistVisible"
    @trackClicked="playlistClick"
  />
  <div class="relative z-10">
    <div class="flex h-20 basis-1/3 items-center justify-between gap-4 [&>*]:flex-1">
      <div class="mt-5 text-xl font-bold">
        <div class="border-0 border-b-2 border-gray-300 px-1 py-1">
          {{ trackData[armedIndex]?.title }}
        </div>
      </div>
      <PlayerTransport @transportClicked="handleTransportClick" :isRunning />
      <div class="flex h-full flex-col items-end px-2 text-right">
        <button
          class="mt-1 aspect-square rotate-[211deg] cursor-pointer rounded-full bg-gray-200 px-3 py-1 text-sm hover:bg-gray-400"
          @click="playlistVisible = !playlistVisible"
        >
          &#9664;
        </button>
        <input
          class="mt-8 max-w-7/8 px-2"
          type="range"
          id="volume"
          min="0"
          max="1.2"
          v-model="volumeInputValue"
          step="0.01"
        />
      </div>
    </div>
    <div class="text-xs font-bold tabular-nums">
      {{ formatTime(elapsed) }} / {{ formatTime(duration) }}
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
    <SpectrumVisualizer :analyser="getAnalyser()" />
    <WaveformVisualizer :analyser="getAnalyser()" />
  </div>
</template>
