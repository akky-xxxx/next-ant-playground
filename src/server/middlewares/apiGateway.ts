/**
 * import node_modules
 */
import { Request, Response, NextFunction } from "express"
import Fetchr from "fetchr"

/**
 * import others
 */
import services, { Services } from "../services"
import { BaseService, ReadMethod, DeleteMethod, CreateMethod, UpdateMethod } from "../services/BaseService"
import createLogger from "../utils/createLogger"

/**
 * main
 */
const { sillyLogger } = createLogger("apiGateway")

type Adapter = {
  name: string
  read?: ReadMethod
  delete?: DeleteMethod
  create?: CreateMethod
  update?: UpdateMethod
}
const methods1 = ["read", "delete"] as const
const methods2 = ["create", "update"] as const

function makeServiceAdapter(service: BaseService) {
  const adapter: Adapter = {
    name: service.name,
  }
  // read と delete
  methods1.forEach(method => {
    adapter[method] = async (
      req: Request,
      resource: string,
      params: Record<string, unknown>,
      config: unknown,
      callback: Function,
    ) => {
      service[method](req, resource, params, config, callback).then(
        result => {
          callback(null, result)
        },
        (error: Record<string, unknown>) => {
          callback(error)
        },
      )
    }
  })

  // create と update
  methods2.forEach(method => {
    adapter[method] = async (
      req: Request,
      resource: string,
      params: Record<string, unknown>,
      body: Record<string, unknown>,
      config: unknown,
      callback: Function,
    ) => {
      service[method](req, resource, params, body, config, callback).then(
        result => {
          callback(null, result)
        },
        (error: Record<string, unknown>) => {
          callback(error)
        },
      )
    }
  })

  return adapter
}

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
