/**
 *import node_modules
 */
import { RequestHandler } from "express"

/**
 * main
 */
const loginHandler: RequestHandler = (req, _next, next) => {
  if (req.query.return && req.session) {
    req.session.oauth2return = req.query.return
  }

  next()
}

export default loginHandler
