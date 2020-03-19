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
type ExtractProfile = (profile: Profile) => UserInfo
const extractProfile: ExtractProfile = profile => ({
  googleId: profile.id,
  displayName: profile.displayName,
  email: profile.emails ? profile.emails[0].value : "",
  photo: profile.photos ? profile.photos[0].value : "",
})

export default extractProfile
