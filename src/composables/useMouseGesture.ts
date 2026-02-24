import { ref } from "vue"

export function useMouseGesture() {
  const startX = ref(0)
  const startY = ref(0)

  const vectorX = ref(0)
  const vectorY = ref(0)

  const mouseDownHandler = (event: MouseEvent) => {
    const container = event.currentTarget as HTMLElement
    if (!container) return
    const rect = container.getBoundingClientRect()
    startX.value = (event.clientX - rect.left) / rect.width
    startY.value = (event.clientY - rect.top) / rect.height
  }

  const mouseUpHandler = (event: MouseEvent) => {
    const container = event.currentTarget as HTMLElement
    if (!container) return
    const rect = container.getBoundingClientRect()
    const mouseUpX = (event.clientX - rect.left) / rect.width
    const mouseUpY = (event.clientY - rect.top) / rect.height
    vectorX.value = mouseUpX - startX.value
    vectorY.value = mouseUpY - startY.value
  }

  return {
    mouseDownHandler,
    mouseUpHandler,
    startX,
    startY,
    vectorX,
    vectorY
  }
}
