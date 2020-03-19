/**
 * import node_modules
 */
import { AuthenticateOptionsGoogle } from "passport-google-oauth20"

/**
 * main
 */
// 認証関連で使用される url 一覧
export const URLS = {
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  CALLBACK: "/auth/google/callback",
}

// passport で認証の対象となる strategy の指定
export const STRATEGY = "google"

export const STRATEGY_AUTH_OPTIONS: AuthenticateOptionsGoogle = {
  scope: ["email", "profile"],
}
