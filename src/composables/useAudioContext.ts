import type { Ref } from 'vue';

export function useAudioContext(audioContext: AudioContext, isLoaded: Ref<boolean>, isRunning: Ref<boolean>) {

  let sourceHasStarted = false

  let source = audioContext.createBufferSource()
  let audioBuffer: AudioBuffer = new AudioBuffer({
    numberOfChannels: 2,
    length: audioContext.sampleRate * 0.5,
    sampleRate: audioContext.sampleRate,
  })

  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 256

  const gainNode = audioContext.createGain()

  async function loadAudioBuffers(fileNames: Array<string>) {
    const buffers = await Promise.all(
      fileNames.map(async (file) => {
        try {
          const response = await fetch(`${file}`)
          const arrayBuffer = await response.arrayBuffer()
          return audioContext.decodeAudioData(arrayBuffer)

        } catch (error) {
          console.error(`Error loading or decoding ${file}:`, error)
          return null
        }
      }),
    )
    return buffers.filter((buffer) => buffer !== null)
  }

  let buffers: AudioBuffer[]

  const loadBuffers = async (fileNames: Array<string>) => {
    buffers = await loadAudioBuffers(fileNames)
    isLoaded.value = true
  }

  const armAudio = (index: number) => {

    if (source && sourceHasStarted) {
      source.stop()
    }

    source = audioContext.createBufferSource()
    if (buffers[index]) {
      source.buffer = buffers[index]
      audioBuffer = buffers[index]
    }

    source.connect(gainNode).connect(analyser).connect(audioContext.destination)
  }

  const startAudio = () => {
    source.start(0)
    sourceHasStarted = true
  }

  const getDuration = (): number => {
    return audioBuffer.duration
  }

  const getAnalyser = (): AnalyserNode => {
    return analyser
  }

  const setGain = (newGain: number) => {
    gainNode.gain.value = newGain
  }

  const setSeekedAudio = (startOffset: number) => {

    if (source && sourceHasStarted) {
      source.stop()
    }

    source = audioContext.createBufferSource()
    source.buffer = audioBuffer
    source.connect(gainNode).connect(audioContext.destination)
    source.start(0, startOffset)
  }

  const handleAudioContextStateChange = () => {
    if (audioContext.state === 'running') {
      isRunning.value = true
    } else {
      isRunning.value = false
    }
  }

  audioContext.addEventListener('statechange', handleAudioContextStateChange)



  return {
    getDuration,
    loadBuffers,
    armAudio,
    startAudio,
    setSeekedAudio,
    setGain,
    getAnalyser
  }
}
