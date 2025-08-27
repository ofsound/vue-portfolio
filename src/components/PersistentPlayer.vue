<script setup lang="ts">
import { onMounted, ref } from 'vue'

const audioContext = new window.AudioContext()
const gainNode = audioContext.createGain()

let startTime = 0
const elapsed = ref(0)
const progressPercentage = ref(0)

let audioBuffer: AudioBuffer = new AudioBuffer({
  numberOfChannels: 2, // Stereo
  length: audioContext.sampleRate * 0.5, // 0.5 seconds of audio
  sampleRate: audioContext.sampleRate,
})

async function playMp3WithWebAudio(url: string): Promise<void> {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer

  source.connect(gainNode).connect(audioContext.destination)

  source.start(0)
}

const playAudio = () => {
  playMp3WithWebAudio('01.mp3').catch((error) => console.error('Error playing audio:', error))
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

function updateProgressBar() {
  // if (source.playbackState === AudioBufferSourceNode.PLAYING_STATE) {
  elapsed.value = audioContext.currentTime - startTime
  if (audioBuffer) {
    progressPercentage.value = (elapsed.value / audioBuffer.duration) * 100
  }

  requestAnimationFrame(updateProgressBar)
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}
</script>

<template>
  <section class="ml-auto flex h-12 max-w-max shrink-0 items-center justify-end gap-4 px-2">
    <div class="h-full w-full bg-gray-200">
      <div :style="{ width: progressPercentage + '%' }" class="h-full bg-green-800"></div>
    </div>
    <div>{{ formatTime(elapsed) }}</div>
    <div>{{ formatTime(audioBuffer.duration) }}</div>
    <input type="range" id="volume" min="0" max="2" value="1" step="0.01" />
    <button
      class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
      @click="playAudio"
    >
      play music ▸
    </button>
    <button
      class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
      @click="toggleAudio"
    >
      toggle music ▸
    </button>
  </section>
</template>
