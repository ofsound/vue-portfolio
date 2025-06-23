<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { getRandomIntInc, getRandomIntIncBip } from '@/utils/MathUtils.ts'
import { randomBackgroundColor } from '@/utils/TailwindColors.ts'

gsap.registerPlugin(MotionPathPlugin)

const div = ref(null)

const bgColorClass = ref(randomBackgroundColor())

const tweenArray: object[] = []

const tweenArrayLength = 50

for (let index = 0; index < tweenArrayLength; index++) {
  const tweenObject = {
    duration: getRandomIntInc(12, 20),
    x: getRandomIntIncBip(300),
    y: getRandomIntIncBip(800),
    skewX: getRandomIntIncBip(50),
    skewY: getRandomIntIncBip(50),
    rotation: getRandomIntIncBip(180),
    scaleX: 1 + Math.random() * 10,
    ease: 'power2.inOut',
    motionPath: [
      { x: getRandomIntIncBip(300), y: getRandomIntIncBip(300) },
      { x: getRandomIntIncBip(300), y: getRandomIntIncBip(300) },
      { x: getRandomIntIncBip(300), y: getRandomIntIncBip(300) },
    ],
  }
  tweenArray.push(tweenObject)
}

onMounted(() => {
  const timeline = gsap.timeline({ repeat: -1, yoyo: true })

  for (let index = 0; index < tweenArray.length; index++) {
    timeline.to(div.value, tweenArray[index])
  }
})
</script>

<template>
  <div
    ref="div"
    :class="bgColorClass"
    class="absolute top-1/2 right-0 left-0 mx-auto h-10 w-10 rounded border border-gray-700 opacity-80"
  ></div>
</template>
