const WIDTH = 768

const PC = `(min-width: ${WIDTH}px)`
const TB = `(max-width: ${WIDTH - 1}px)`

const MEDIA_QUERIES = {
  PC,
  TB,
} as const

export default MEDIA_QUERIES
