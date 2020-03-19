/**
 *import node_modules
 */
import { RequestHandler } from "express"

/**
 * main
 */
const callbackHandler: RequestHandler = (req, res) => {
  if (!req.session) {
    console.error("セッション情報を取得できませんでした。")
    return Promise.reject()
  }

  const redirectUrl = req.session.oauth2return || "/"
  delete req.session.oauth2return

  res.redirect(redirectUrl)
}

export default callbackHandler
