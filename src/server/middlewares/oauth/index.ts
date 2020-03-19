/**
 * import node_modules
 */
import express, { NextFunction, Request, Response } from "express"
import passport from "passport"
import oauth20 from "passport-google-oauth20"
import dotenv from "dotenv"

/**
 * import others
 */
import extractProfile from "./modules/extractProfile"

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
 * 未ログインアクセス時にアクセスしたURLを保持し、ログインURLへリダイレクトさせる
 * @param req
 * @param res
 * @param next
 */
const authRequired = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user && req.session && !req.isAuthenticated()) {
    req.session.oauth2return = req.originalUrl
    // TODO: 謎の `does not exist` error がなくなったら ignore 削除
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
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
