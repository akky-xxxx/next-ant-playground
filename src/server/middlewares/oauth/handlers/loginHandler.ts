/**
 *import node_modules
 */
import { RequestHandler } from "express"

/**
 * import others
 */
import createLogger from "../../../utils/createLogger"

/**
 * main
 */
const { sillyLogger, infoLogger } = createLogger("loginHandler")

const loginHandler: RequestHandler = (req, _next, next) => {
  infoLogger({
    message: "loginHandler 開始",
    data: {
      hasSession: Boolean(req.session),
      queryReturn: req.query.return,
    },
  })
  if (req.query.return && req.session) {
    req.session.oauth2return = req.query.return
  }

  sillyLogger("loginHandler 終了")
  next()
}

export default loginHandler
