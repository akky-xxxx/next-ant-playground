/**
 * import node_modules
 */
import express, { NextFunction, Request, Response } from "express"
import passport, { Profile } from "passport"
import oauth20 from "passport-google-oauth20"
import dotenv from "dotenv"

/**
 * import others
 */
import { UserInfo } from "../types/common"
// import { ENDPOINTS } from "../const/common"
// import getToken from "../utils/getGoogleToken"

/**
 * main
 */
dotenv.config()

// 認証関連で使用される url 一覧
const URLS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  CALLBACK: "/auth/google/callback",
}
const STRATEGY = "google" // passport で認証の対象となる strategy の指定
const GoogleStrategy = oauth20.Strategy
const router = express.Router()

/**
 * ユーザー情報が存在するかチェックし、存在しない時は新規登録し、エラーが帰ってきた場合は画面を表示しない
 * @param req
 * @param res
 */
// const checkUser = async (req: Request, res: Response): Promise<void> => {
//   if (!req.session) {
//     console.error("セッション情報を取得できませんでした。")
//     return Promise.reject()
//   }
//
//   const redirectUrl = req.session.oauth2return || "/"
//   delete req.session.oauth2return
//
//   try {
//     // セッションにIAMのトークンをセットする
//     req.session.token = await getToken()
//
//     res.redirect(redirectUrl)
//     return Promise.resolve()
//   } catch (error) {
//     req.logout()
//     console.error(error)
//     res.status(error.response.data.code).end()
//     return Promise.reject()
//   }
// }

/**
 * ログイン情報から必要なユーザ情報だけを抜き出す
 * @param profile
 */
const extractProfile = (profile: Profile) =>
  ({
    googleId: profile.id,
    displayName: profile.displayName,
    email: profile.emails ? profile.emails[0].value : "",
    photo: profile.photos ? profile.photos[0].value : "",
  } as UserInfo)

/**
 * 未ログインアクセス時にアクセスしたURLを保持し、ログインURLへリダイレクトさせる
 * @param req
 * @param res
 * @param next
 */
const authRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user && req.session && !req.isAuthenticated()) {
    req.session.oauth2return = req.originalUrl
    return res.redirect(URLS.LOGIN)
  }
  return next()
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH2_CLIENT_ID as string,
      clientSecret: process.env.OAUTH2_CLIENT_SECRET as string,
      callbackURL: process.env.OAUTH2_CALLBACK as string,
    },
    (_accessToken, _refreshToken, profile, callback) => {
      callback(undefined, extractProfile(profile))
    },
  ),
)

passport.serializeUser((user, callback) => callback(null, user))
passport.deserializeUser((obj, callback) => callback(null, obj))

/**
 * ログインURLへのアクセス時のハンドリング
 */
router.get(
  URLS.LOGIN,
  (req, _next, next) => {
    if (req.query.return && req.session) {
      req.session.oauth2return = req.query.return
    }

    next()
  },
  passport.authenticate(STRATEGY, { scope: ["email", "profile"] }),
)

/**
 * ログイン後処理URLへのアクセス時のハンドリング
 */
router.get(URLS.CALLBACK, passport.authenticate(STRATEGY), async (req, res) => {
  if (!req.session) {
    console.error("セッション情報を取得できませんでした。")
    return Promise.reject()
  }

  const redirectUrl = req.session.oauth2return || "/"
  delete req.session.oauth2return

  res.redirect(redirectUrl)
})

/**
 * ログインアウトURLへのアクセス時のハンドリング
 */
router.get(URLS.LOGOUT, (req, res) => {
  req.logout()
  res.redirect("/")
})

const oauth = {
  extractProfile,
  router,
  required: authRequired,
}

export default oauth
