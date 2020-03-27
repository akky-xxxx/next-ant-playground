/**
 * import node_modules
 */
import dotenv from "dotenv"

/**
 * import
 */
import connectGoogleApi from "./connectGoogleApi"
import createLogger from "./createLogger"
import str2mask from "./str2mask"

/**
 * main
 */
dotenv.config()

interface PostData {
  refresh_token: string
  client_id: string
  client_secret: string
  grant_type: "refresh_token"
}

interface NewTokenInfo {
  access_token: string
  expires_in: number
  scope: string | string[]
  token_type: string
  id_token: string
}

type GetNewTokenReturn = Pick<NewTokenInfo, "access_token" | "id_token">

type GetNewToken = (refreshToken: string) => Promise<GetNewTokenReturn>

const postData: PostData = {
  refresh_token: "",
  client_id: process.env.OAUTH2_CLIENT_ID as string,
  client_secret: process.env.OAUTH2_CLIENT_SECRET as string,
  grant_type: "refresh_token",
}

const { sillyLogger, debugLogger, errorLogger } = createLogger("getNewToken")

const getNewToken: GetNewToken = async (refreshToken) => {
  sillyLogger("getNewToken 開始")
  postData.refresh_token = refreshToken
  try {
    const result = await connectGoogleApi.post<NewTokenInfo>("/oauth2/v4/token", postData)
    const {
      data: { access_token, id_token },
    } = result

    debugLogger({
      message: "getNewToken 取得完了",
      data: {
        access_token: str2mask(access_token, 10).slice(0, 20),
        id_token: str2mask(id_token, 10).slice(0, 20),
      },
    })

    return Promise.resolve({ access_token, id_token })
  } catch (error) {
    errorLogger({ error })
    return Promise.reject(error)
  }
}

export default getNewToken
