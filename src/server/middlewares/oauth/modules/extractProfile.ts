/**
 * import node_modules
 */
import { Profile } from "passport"

/**
 * import others
 */
import { UserInfo } from "../../../types/common"

/**
 * ログイン情報から必要なユーザ情報だけを抜き出す
 * @param profile
 */
type ExtractProfile = (profile: Profile, accessToken: string, refreshToken: string) => UserInfo
const extractProfile: ExtractProfile = (profile, accessToken, refreshToken) => ({
  googleId: profile.id,
  displayName: profile.displayName,
  email: profile.emails ? profile.emails[0].value : "",
  photo: profile.photos ? profile.photos[0].value : "",
  accessToken,
  refreshToken,
})

export default extractProfile
