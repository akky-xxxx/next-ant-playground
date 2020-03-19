/**
 * import node_modules
 */
import express from "express"
import passport from "passport"
import oauth20 from "passport-google-oauth20"
import dotenv from "dotenv"

/**
 * import others
 */
import { URLS, STRATEGY, STRATEGY_AUTH_OPTIONS } from "./const"
import extractProfile from "./modules/extractProfile"
import authRequired from "./modules/authRequired"

/**
 * main
 */
dotenv.config()

const GoogleStrategy = oauth20.Strategy
const router = express.Router()

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
  passport.authenticate(STRATEGY, STRATEGY_AUTH_OPTIONS),
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
  router,
  required: authRequired,
}

export default oauth
