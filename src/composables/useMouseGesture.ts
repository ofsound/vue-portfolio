import { ref } from "vue"

export function useMouseGesture() {
  const startX = ref(0)
  const startY = ref(0)

  const vectorX = ref(0)
  const vectorY = ref(0)

  const mouseDownHandler = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement

    const offsetX = event.offsetX
    startX.value = offsetX / clickedElement.clientWidth

    const offsetY = event.offsetY
    startY.value = offsetY / clickedElement.clientHeight
  }

  const mouseUpHandler = (event: MouseEvent) => {
    const clickedElement = event.target as HTMLElement

    const offsetX = event.offsetX
    const mouseUpX = offsetX / clickedElement.clientWidth

    const offsetY = event.offsetY
    const mouseUpY = offsetY / clickedElement.clientHeight

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
