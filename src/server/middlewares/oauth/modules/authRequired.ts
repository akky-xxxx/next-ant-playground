/**
 * import node_modules
 */
import { RequestHandler } from "express"

/**
 * import others
 */
import { URLS } from "../const"
import createLogger from "../../../utils/createLogger"
import isPageRequest from "../../../utils/isPageRequest"

/**
 * main
 */
const { sillyLogger, infoLogger } = createLogger("authRequired")

/**
 * 未ログインアクセス時にアクセスしたURLを保持し、ログインURLへリダイレクトさせる
 */
const authRequired: RequestHandler = (req, res, next) => {
  const { url } = req
  infoLogger(
    {
      message: "authRequired 開始",
      data: {
        hasUser: Boolean(req.user),
        hasSession: Boolean(req.session),
        isAuthenticated: req.isAuthenticated(),
        url,
      },
    },
    !isPageRequest(url),
  )
  if (!req.user && req.session && !req.isAuthenticated()) {
    req.session.oauth2return = req.originalUrl
    sillyLogger("authRequired 終了 - 未ログイン", !isPageRequest(url))
    // TODO: 謎の `does not exist` error がなくなったら ignore 削除
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return res.redirect(URLS.LOGIN)
  }
  sillyLogger("authRequired 終了 - ログイン中", !isPageRequest(url))
  return next()
}

export default authRequired
