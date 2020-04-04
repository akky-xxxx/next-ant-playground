/**
 * import node_modules
 */
import express from "express"
import passport from "passport"
import oauth20 from "passport-google-oauth20"
import dotenv from "dotenv"

/**
 * import handlers
 */
import loginHandler from "./handlers/loginHandler"
import callbackHandler from "./handlers/callbackHandler"
import logoutHandler from "./handlers/logoutHandler"
import tokenRefreshHandler from "./handlers/tokenRefreshHandler"
import authRequired from "./handlers/authRequired"

/**
 * import others
 */
import { URLS, STRATEGY, STRATEGY_OPTION, STRATEGY_AUTH_OPTIONS } from "./const"
import verify from "./modules/verify"
import needAuth from "../../utils/needAuth"

/**
 * main
 */
dotenv.config()

const GoogleStrategy = oauth20.Strategy
const router = express.Router()

if (needAuth) {
  passport.use(new GoogleStrategy(STRATEGY_OPTION, verify))

  passport.serializeUser((user, callback) => callback(null, user))
  passport.deserializeUser((obj, callback) => callback(null, obj))
}

/**
 * ログインURLへのアクセス時のハンドリング
 */
router.get(URLS.LOGIN, loginHandler, passport.authenticate(STRATEGY, STRATEGY_AUTH_OPTIONS))

/**
 * ログイン後処理URLへのアクセス時のハンドリング
 */
router.get(URLS.CALLBACK, passport.authenticate(STRATEGY), callbackHandler)

/**
 * ログインアウトURLへのアクセス時のハンドリング
 */
router.get(URLS.LOGOUT, logoutHandler)

const oauth = {
  router,
  required: authRequired,
  tokenRefreshHandler,
}

export default oauth
