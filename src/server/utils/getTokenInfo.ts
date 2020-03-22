/**
 * import
 */
import connectGoogleApi from "./connectGoogleApi"
import createLogger from "./createLogger"

/**
 * main
 */
interface RequestData {
  params: {
    accessToken: string
  }
}

interface TokenInfo {
  azp: string
  aud: string
  sub: string
  scope: string | string[]
  exp: string // number string
  expires_in: string // number string
  email: string
  email_verified: string // boolean string
  access_type: "offline" | "online"
}

interface GetTokenInfoReturn {
  exp: number
}

type GetTokenInfo = (accessToken: string) => Promise<GetTokenInfoReturn>

const requestData: RequestData = {
  params: {
    accessToken: "",
  },
}

const { sillyLogger, debugLogger, errorLogger } = createLogger("getTokenInfo")
const getTokenInfo: GetTokenInfo = async accessToken => {
  sillyLogger("token 情報取得開始")
  requestData.params.accessToken = accessToken
  try {
    /* cspell:disable-next-line */
    const result = await connectGoogleApi.get<TokenInfo>("/oauth2/v3/tokeninfo", requestData)
    const {
      data: { exp },
    } = result
    // ミリ秒ではなく秒で帰ってくるため、ミリ秒に変換
    const expNumber = parseInt(exp, 10) * 1000

    debugLogger({
      message: "token 情報取得完了",
      data: { exp: expNumber },
    })

    return Promise.resolve({ exp: expNumber })
  } catch (error) {
    errorLogger({ error })
    return Promise.reject(error)
  }
}

export default getTokenInfo
