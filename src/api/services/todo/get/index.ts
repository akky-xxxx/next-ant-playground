/**
 * import others
 */
import { ApiType } from "./types"
import defaultPattern from "./patterns/default"
import error400 from "./patterns/error400"

const ApiList: ApiType[] = [defaultPattern, error400]

export default ApiList
