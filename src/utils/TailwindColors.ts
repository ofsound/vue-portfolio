import { getRandomIntInc } from '@/utils/MathUtils.ts'

export function randomBackgroundColor() {
  const randomIntColorBase = getRandomIntInc(0, colorBases.length - 1)
  const randomIntColorWeight = getRandomIntInc(0, colorWeights.length - 1)
  return `bg-${colorBases[randomIntColorBase]}${colorWeights[randomIntColorWeight]}`
}

export function randomBorderColor() {
  const randomIntColorBase = getRandomIntInc(0, colorBases.length - 1)
  const randomIntColorWeight = getRandomIntInc(0, colorWeights.length - 1)
  return `border-${colorBases[randomIntColorBase]}${colorWeights[randomIntColorWeight]}`
}

const colorBases = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
]

const colorWeights = [
  '-50',
  '-100',
  '-200',
  '-300',
  '-400',
  '-500',
  '-600',
  '-700',
  '-800',
  '-900',
  '-950',
]
