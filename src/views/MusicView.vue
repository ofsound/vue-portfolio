<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const dataLoaded = ref(false)
const albumsArray = ref([{ title: 'default', url: 'default', image: { url: 'default' } }])

onMounted(() => {
  axios
    .get('https://benmontgomery.com/wp-json/wp/v2/pages/8?acf_format=standard')
    .then((response) => {
      dataLoaded.value = true
      albumsArray.value = response.data.acf.albums
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h1 class="mb-4 text-4xl">Music</h1>
  <section class="flex flex-wrap gap-4">
    <template v-if="dataLoaded">
      <a :href="album.url" v-for="album in albumsArray" :key="album.title">
        <div class="hidden">{{ album.title }}</div>
        <div>
          <img class="max-w-50" :src="album.image.url" alt="" />
        </div>
      </a>
    </template>
  </section>
</template>
