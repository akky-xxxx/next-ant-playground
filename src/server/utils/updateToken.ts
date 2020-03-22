/**
 * import node_modules
 */
import { Request, NextFunction } from "express"

/**
 * import others
 */
import { ExtendedRequest } from "../types/common"
import getNewToken from "./getNewToken"
import getTokenExpire from "./getTokenInfo"
import createLogger from "./createLogger"
import CustomError from "./CustomError"

/**
 * main
 */
type UpdateToken = (req: Request, next?: NextFunction) => Promise<void>

const { sillyLogger, infoLogger, errorLogger } = createLogger("updateToken")

const updateToken: UpdateToken = async (req, next) => {
  const { user, session } = req as ExtendedRequest

  if (!session) {
    const message = "session がありません"
    sillyLogger(message)

    if (next) {
      next()
      return Promise.resolve()
    }
    return Promise.reject(new CustomError(message, 401))
  }

  if (!user) {
    const message = "user がありません"
    sillyLogger(message)

    if (next) {
      next()
      return Promise.resolve()
    }
    return Promise.reject(new CustomError(message, 401))
  }

  const { displayName, email, expire, refreshToken } = user

  if (!refreshToken) {
    const message = "refreshToken がありません"
    sillyLogger(message)

    if (next) {
      next()
      return Promise.resolve()
    }
    return Promise.reject(new CustomError(message, 401))
  }

  if (expire && new Date(expire) >= new Date()) {
    infoLogger({
      message: "access token は有効です",
      data: {
        email,
        expire,
      },
    })

    if (next) next()
    return Promise.resolve()
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

    if (next) next()
    return Promise.resolve()
  } catch (error) {
    errorLogger({ error })

    if (next) next()
    return Promise.reject(error)
  }
}

export default updateToken
