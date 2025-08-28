export default function MathUtils() {
}

export const getRandomIntInc = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomIntIncBip = (max: number) => {
  max = Math.floor(max) * 2
  return (Math.floor(Math.random() * (max + 1) - max / 2))
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}
