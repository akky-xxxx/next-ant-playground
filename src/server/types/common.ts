/**
 * import node_modules
 */
import { Request } from "express"

/**
 * main
 */
export interface UserInfo {
  googleId: string
  displayName: string
  email: string
  photo: string
  accessToken?: string
  refreshToken?: string
  expire?: number
}

export interface ExtendedRequest extends Request {
  user?: UserInfo
}
