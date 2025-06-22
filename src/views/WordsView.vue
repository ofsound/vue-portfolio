<script setup lang="ts">
import { ref } from 'vue'
import SingleWord from '@/components/SingleWord.vue'
import ScrambleWord from '@/components/ScrambleWord.vue'
import ReplaceWord from '@/components/ReplaceWord.vue'

const wordArray = ref([
  'word',
  'blue',
  'basket',
  'avon',
  'people',
  'brother',
  'resink',
  'typhic',
  'poststertorous',
  'indevout',
  'anatomicopathologic',
  'unimpenetrable',
  'unmistrusted',
  'quadrigamist',
  'repudiationist',
  'unagile',
  'chaplain',
  'bekerchief',
  'subproduct',
  'pointingly',
  'Physonectae',
  'bumpingly',
  'endogenous',
  'velours',
  'carmoisin',
  'reaccomplish',
  'protistic',
])
</script>

<template>
  <div class="relative">
    <ScrambleWord v-for="item in wordArray" :key="item" :word="item" />
    <SingleWord v-for="item in wordArray" :key="item" :word="item" />
    <ReplaceWord v-for="item in wordArray" :key="item" :word="item" />
  </div>
</template>
