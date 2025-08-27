<script setup lang="ts">
async function playMp3WithWebAudio(url: string): Promise<void> {
  const audioContext = new window.AudioContext()

  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer

  source.connect(audioContext.destination)

  source.start(0)
}

const playAudio = () => {
  playMp3WithWebAudio('01.mp3').catch((error) => console.error('Error playing audio:', error))
}
</script>

<template>
  <section class="ml-auto flex h-12 max-w-max shrink-0 items-center justify-end px-2">
    <button
      class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
      @click="playAudio"
    >
      play music ▸
    </button>
  </section>
</template>
