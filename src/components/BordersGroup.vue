<script setup lang="ts">
import { ref } from 'vue'
import BordersItem from '@/components/BordersItem.vue'
const bordersArray = ref([{ id: 0, color: 'bg-green-200' }])
</script>

<template>
  <div>
    <div v-for="item in bordersArray" :key="item.id">
      <BordersItem :color="item.color" />
    </div>
  </div>
</template>
