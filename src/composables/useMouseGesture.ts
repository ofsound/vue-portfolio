import { ref } from 'vue'

type PointerLikeEvent = MouseEvent | PointerEvent

const clampUnit = (value: number) => Math.min(1, Math.max(0, value))

export function useMouseGesture() {
  const startX = ref(0)
  const startY = ref(0)

  const vectorX = ref(0)
  const vectorY = ref(0)
  const activePointerId = ref<number | null>(null)

  const getNormalizedPosition = (event: PointerLikeEvent, container: HTMLElement) => {
    const rect = container.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      return null
    }

    const normalizedX = clampUnit((event.clientX - rect.left) / rect.width)
    const normalizedY = clampUnit((event.clientY - rect.top) / rect.height)

    return { normalizedX, normalizedY }
  }

  const mouseDownHandler = (event: PointerLikeEvent) => {
    const container = event.currentTarget as HTMLElement
    if (!container) return

    const position = getNormalizedPosition(event, container)
    if (!position) return

    startX.value = position.normalizedX
    startY.value = position.normalizedY

    if ('pointerId' in event && container.setPointerCapture) {
      container.setPointerCapture(event.pointerId)
      activePointerId.value = event.pointerId
    }
  }

  const mouseUpHandler = (event: PointerLikeEvent) => {
    const container = event.currentTarget as HTMLElement
    if (!container) return

    if ('pointerId' in event && activePointerId.value !== null && activePointerId.value !== event.pointerId) {
      return
    }

    const position = getNormalizedPosition(event, container)
    if (!position) return

    vectorX.value = position.normalizedX - startX.value
    vectorY.value = position.normalizedY - startY.value

    if ('pointerId' in event) {
      if (container.hasPointerCapture?.(event.pointerId)) {
        container.releasePointerCapture(event.pointerId)
      }
      activePointerId.value = null
    }
  }

  return {
    mouseDownHandler,
    mouseUpHandler,
    startX,
    startY,
    vectorX,
    vectorY,
  }
}
