/**
 * import node_modules
 */
import { RequestHandler } from "express"

/**
 * import others
 */
import createLogger from "../../../utils/createLogger"
import isPageRequest from "../../../utils/isPageRequest"
import updateToken from "../../../utils/updateToken"

/**
 * main
 */
const { sillyLogger, errorLogger } = createLogger("tokenRefreshHandler")

const tokenRefreshHandler: RequestHandler = async (req, _res, next) => {
  if (!isPageRequest(req.url)) {
    next()
    return
  }

  sillyLogger("tokenRefreshHandler 開始")

  try {
    await updateToken(req, next)
  } catch (error) {
    errorLogger({ error })
  }
}

export default tokenRefreshHandler
