<script setup lang="ts">
import { ref } from 'vue'
import SingleWord from '@/components/SingleWord.vue'

const wordArray = ref(['word', 'blue', 'basket', 'avon', 'people', 'brother'])
</script>

<template>
  <SingleWord v-for="item in wordArray" :key="item" :word="item" />
</template>
