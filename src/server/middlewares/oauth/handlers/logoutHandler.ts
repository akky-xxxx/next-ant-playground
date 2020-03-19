/**
 *import node_modules
 */
import { RequestHandler } from "express"

/**
 * main
 */
const logoutHandler: RequestHandler = (req, res) => {
  req.logout()
  res.redirect("/")
}

export default logoutHandler
