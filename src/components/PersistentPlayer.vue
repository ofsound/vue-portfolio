<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

let startTime = 0
const trackIndex = ref(0)
const elapsed = ref(0)
const progressPercentage = ref(0)

let firstPlay = true

const audioContext = new window.AudioContext()
let source = audioContext.createBufferSource()
const gainNode = audioContext.createGain()

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
  return buffers.filter((buffer) => buffer !== null) // Filter out any failed loads
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

  source.connect(gainNode).connect(audioContext.destination)
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
  <section class="ml-auto w-full shrink-0">
    <div>
      <a
        v-for="(track, index) in audioData.map((track) => track.title)"
        :key="track"
        @click="playlistClick(index)"
      >
        {{ track }}
      </a>
    </div>
    <div>{{ currentTrackTitle }}</div>
    <div class="flex h-12 items-center justify-end gap-4 px-2">
      <div class="h-full w-full bg-gray-200" @click="seekAudio">
        <div
          :style="{ width: progressPercentage + '%' }"
          class="pointer-events-none h-full bg-green-800"
        ></div>
      </div>
      <div>{{ formatTime(elapsed) }}</div>
      <div>{{ formatTime(audioBuffer.duration) }}</div>
      <input type="range" id="volume" min="0" max="2" value="1" step="0.01" />
      <!-- <button
        class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
        @click="playAudio"
      >
        play
      </button> -->
      <button
        class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
        @click="toggleAudio"
      >
        toggle
      </button>
    </div>
  </section>
</template>
