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
  <section class="flex h-12 w-full shrink-0 items-center justify-end bg-gray-500 px-10">
    <audio ref="audioPlayer" :src="audioSrc"></audio>
    <button v-if="!isPlaying" class="mr-4 cursor-pointer rounded border px-3" @click="playAudio">
      play ▸
    </button>
    <button v-if="isPlaying" class="cursor-pointer border px-3" @click="pauseAudio">pause ⥰</button>
  </section>
</template>
