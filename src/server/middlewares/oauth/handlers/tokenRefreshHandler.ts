/**
 * import node_modules
 */
import { RequestHandler } from "express"

/**
 * import others
 */
import createLogger from "../../../utils/createLogger"
import isPageRequest from "../../../utils/isPageRequest"
// import str2mask from "../../../utils/str2mask"
import { ExtendedRequest } from "../../../types/common"
import getNewToken from "../modules/getNewToken"
import getTokenExpire from "../modules/getTokenInfo"

/**
 * main
 */
const { sillyLogger, infoLogger, errorLogger } = createLogger("tokenRefreshHandler")

const tokenRefreshHandler: RequestHandler = async (req, _res, next) => {
  if (!isPageRequest(req.url)) {
    next()
    return
  }

  sillyLogger("tokenRefreshHandler 開始")

  const { user, session } = req as ExtendedRequest

  if (!session) {
    sillyLogger("session がありません")
    next()
    return
  }

  if (!user) {
    sillyLogger("user がありません")
    next()
    return
  }

  const { displayName, email, expire, refreshToken } = user

  if (!refreshToken) {
    sillyLogger("refreshToken がありません")
    next()
    return
  }

  if (expire && new Date(expire) >= new Date()) {
    infoLogger({
      message: "access token は有効です",
      data: {
        email,
        expire,
      },
    })
    next()
    return
  }

  infoLogger({
    message: "access token が無効です",
    data: {
      email,
      expire,
    },
  })
  // token の発行と有効期限の取得
  try {
    const newToken = await getNewToken(refreshToken)
    const { access_token } = newToken

    const tokenInfo = await getTokenExpire(access_token)
    const { exp } = tokenInfo

    if (req.session) {
      req.session.passport.user = {
        ...user,
        accessToken: access_token,
        expire: exp,
      }
    }

    infoLogger({
      message: "token refresh 完了",
      data: { user: { displayName, email, expire } },
    })
    next()
  } catch (error) {
    errorLogger({ error })
    next()
  }
}

export default tokenRefreshHandler
