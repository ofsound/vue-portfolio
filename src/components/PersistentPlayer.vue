<script setup lang="ts">
import { useTemplateRef, ref } from 'vue'
const audioSrc = ref('https://benmontgomery.com/test.mp3')

const myAudioPlayer = useTemplateRef('audioPlayer')

const isPlaying = ref(false)

const playAudio = () => {
  if (myAudioPlayer.value) myAudioPlayer.value.play()
  isPlaying.value = !isPlaying.value
}
const pauseAudio = () => {
  if (myAudioPlayer.value) myAudioPlayer.value.pause()
  isPlaying.value = !isPlaying.value
}
</script>

<template>
  <section class="ml-auto flex h-12 max-w-max shrink-0 items-center justify-end px-2">
    <audio ref="audioPlayer" :src="audioSrc"></audio>
    <button
      v-if="!isPlaying"
      class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
      @click="playAudio"
    >
      play music ▸
    </button>
    <button
      v-if="isPlaying"
      class="cursor-pointer rounded-xl bg-linear-to-t from-sky-600 to-indigo-300 px-3 py-1 text-sm hover:bg-gray-400"
      @click="pauseAudio"
    >
      pause music ⥰
    </button>
  </section>
</template>
