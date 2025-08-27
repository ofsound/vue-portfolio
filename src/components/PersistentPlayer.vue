<script setup lang="ts">
import { onMounted } from 'vue'

const audioContext = new window.AudioContext()
const gainNode = audioContext.createGain()

async function playMp3WithWebAudio(url: string): Promise<void> {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer

  source.connect(gainNode).connect(audioContext.destination)

  source.start(0)
}

const playAudio = () => {
  playMp3WithWebAudio('01.mp3').catch((error) => console.error('Error playing audio:', error))
}

const toggleAudio = () => {
  // Check if context is in suspended state (autoplay policy)
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
</script>

<template>
  <section class="ml-auto flex h-12 max-w-max shrink-0 items-center justify-end px-2">
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
