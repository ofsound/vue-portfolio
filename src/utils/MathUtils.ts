
export default function MathUtils() {
}

export function getRandomIntInc(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomIntIncBip(max: number) {
  max = Math.floor(max) * 2
  return (Math.floor(Math.random() * (max + 1) - max / 2))
}
