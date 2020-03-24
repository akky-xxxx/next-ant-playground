/**
 *import node_modules
 */
import { RequestHandler } from "express"

/**
 * import others
 */
import createLogger from "../../../utils/createLogger"
import CustomError from "../../../utils/CustomError"

/**
 * main
 */
const { infoLogger } = createLogger("callbackHandler")

const callbackHandler: RequestHandler = (req, res) => {
  infoLogger({
    message: "callbackHandler 開始",
    data: { hasSession: Boolean(req.session) },
  })
  if (!req.session) {
    const message = "セッション情報を取得できませんでした"
    infoLogger({ message })
    return Promise.reject(new CustomError(message, 401))
  }

  const redirectUrl = req.session.oauth2return || "/"
  delete req.session.oauth2return

  infoLogger({
    message: "callbackHandler 終了",
    data: { redirectUrl },
  })
  res.redirect(redirectUrl)
}

export default callbackHandler
