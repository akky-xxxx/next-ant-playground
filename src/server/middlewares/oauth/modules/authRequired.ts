/**
 * import node_modules
 */
import { NextFunction, Request, Response } from "express"

/**
 * import others
 */
import { URLS } from "../const"

/**
 * main
 */
type AuthRequired = (req: Request, res: Response, next: NextFunction) => void

/**
 * 未ログインアクセス時にアクセスしたURLを保持し、ログインURLへリダイレクトさせる
 */
const authRequired: AuthRequired = (req, res, next) => {
  if (!req.user && req.session && !req.isAuthenticated()) {
    req.session.oauth2return = req.originalUrl
    // TODO: 謎の `does not exist` error がなくなったら ignore 削除
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    return res.redirect(URLS.LOGIN)
  }
  return next()
}

export default authRequired
