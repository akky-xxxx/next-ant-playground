/**
 * import node_modules
 */
import { AuthenticateOptionsGoogle, StrategyOptions } from "passport-google-oauth20"
import dotenv from "dotenv"

/**
 * main
 */
dotenv.config()

// 認証関連で使用される url 一覧
export const URLS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  CALLBACK: "/auth/google/callback",
}

// passport で認証の対象となる strategy の指定
export const STRATEGY = "google"

export const STRATEGY_OPTION: StrategyOptions = {
  clientID: process.env.OAUTH2_CLIENT_ID as string,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET as string,
  callbackURL: process.env.OAUTH2_CALLBACK as string,
}

export const STRATEGY_AUTH_OPTIONS: AuthenticateOptionsGoogle = {
  scope: ["email", "profile"],
  accessType: "offline",
  prompt: "consent",
}
