/**
 * import node_modules
 */
import { Request, Response, NextFunction, RequestHandler } from "express"
import Fetchr from "fetchr"

/**
 * import others
 */
import services, { Services } from "../../services"
import makeServiceAdapter from "./makeServiceAdapter"
import responseFormatter from "./responseFormatter"
import createLogger from "../../utils/createLogger"

/**
 * main
 */
const { sillyLogger } = createLogger("apiGateway")

/**
 * service を Fetchr に登録する
 */
export default function apiGateway(): RequestHandler {
  sillyLogger("------------------------------------")
  Object.values(services).forEach((Service: Services) => {
    const service = new Service()
    sillyLogger(`❇️ Registering service: ${service.name}`)
    return Fetchr.registerService(makeServiceAdapter(service))
  })
  sillyLogger("------------------------------------")

  return (req: Request, res: Response, next: NextFunction) => {
    return Fetchr.middleware({
      responseFormatter,
    })(req, res, next)
  }
}
