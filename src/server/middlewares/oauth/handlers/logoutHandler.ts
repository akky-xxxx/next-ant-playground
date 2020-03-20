/**
 *import node_modules
 */
import { RequestHandler } from "express"

/**
 * main
 */
const logoutHandler: RequestHandler = (req, res) => {
  req.logout()
  req.session?.destroy(() => {
    res.redirect("/")
  })
}

export default logoutHandler
