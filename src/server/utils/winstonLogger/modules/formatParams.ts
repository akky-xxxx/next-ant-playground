/**
 * import node_modules
 */
import { TransformableInfo } from "logform"

/**
 * main
 */
type FormatParams = (info: TransformableInfo) => string
const formatParams: FormatParams = info => {
  const { level, message } = info
  return `${level}:${message}`
}

export default formatParams
