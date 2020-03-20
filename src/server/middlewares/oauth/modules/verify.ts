/**
 * import node_modules
 */
import { Profile, VerifyCallback } from "passport-google-oauth20"

/**
 * import others
 */
import extractProfile from "./extractProfile"

/**
 * main
 */
type Verify = (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => void

const verify: Verify = (accessToken, refreshToken, profile, callback) => {
  callback(undefined, extractProfile(profile, accessToken, refreshToken))
}

export default verify
