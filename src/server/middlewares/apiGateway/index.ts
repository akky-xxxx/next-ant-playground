/**
 * import node_modules
 */
import { Request, Response, NextFunction } from "express"
import Fetchr from "fetchr"

/**
 * import others
 */
import services, { Services } from "../../services"
import makeServiceAdapter from "./makeServiceAdapter"
import createLogger from "../../utils/createLogger"

/**
 * main
 */
const { sillyLogger } = createLogger("apiGateway")

/**
 * service を Fetchr に登録する
 */
export default function apiGateway() {
  sillyLogger("------------------------------------")
  Object.values(services).forEach((Service: Services) => {
    const service = new Service()
    sillyLogger(`❇️ Registering service: ${service.name}`)
    return Fetchr.registerService(makeServiceAdapter(service))
  })
  sillyLogger("------------------------------------")

  return (req: Request, res: Response, next: NextFunction) => {
    return Fetchr.middleware({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseFormatter: (_req: Request, responseFormatterRes: Response, result: any) => {
        // レスポンスヘッダーを変更したいときはここをいじれば変えられる
        // TODO: 一旦 no-cache だけ入れとく必要なかったら消す
        responseFormatterRes.header("Cache-Control", ["no-store", "no-cache"].join(","))
        responseFormatterRes.header("Pragma", "no-cache")
        return result.data
      },
    })(req, res, next)
  }
}
