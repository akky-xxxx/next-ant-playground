/**
 * import node_modules
 */
import { Request } from "express"

/**
 * import others
 */
import BaseServiceClass from "./BaseService"
import updateToken from "../utils/updateToken"
import createLogger from "../utils/createLogger"
import needAuth from "../utils/needAuth"

/**
 * main
 */
const { sillyLogger, errorLogger } = createLogger("CheckToken service")

/**
 * token チェック
 */
export default class CheckToken extends BaseServiceClass {
  constructor() {
    super("checkToken", [])
  }

  async create(req: Request) {
    sillyLogger("開始")

    if (!needAuth) {
      sillyLogger("成功")
      return Promise.resolve()
    }

    try {
      await updateToken(req)
      sillyLogger("成功")
      return Promise.resolve()
    } catch (error) {
      errorLogger({ error })
      return Promise.reject(error)
    }
  }
}
