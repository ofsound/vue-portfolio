<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  axios
    .get('https://benmontgomery.com/wp-json/wp/v2/pages/8?acf_format=standard')
    .then((response) => {
      console.log(response.data.acf.albums)
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <h2>Maybe nothing is even here.</h2>
</template>

<style scoped></style>
