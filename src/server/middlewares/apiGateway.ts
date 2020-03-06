/**
 * import node_modules
 */
import debugFactory from "debug"
import { Request, Response, NextFunction } from "express"
import Fetchr from "fetchr"

/**
 * import others
 */
import services, { Services } from "../services"
import { BaseService, ReadMethod, DeleteMethod, CreateMethod, UpdateMethod } from "../services/BaseService"

const debug = debugFactory("app:server:middleware:apiGateway")

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
  debug("------------------------------------")
  Object.values(services).forEach((Service: Services) => {
    const service = new Service()
    debug(`❇️ Registering service: ${service.name}`)
    return Fetchr.registerService(makeServiceAdapter(service))
  })
  debug("------------------------------------")

  return (req: Request, res: Response, next: NextFunction) => {
    return Fetchr.middleware({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseFormatter: (_req: Request, responseFormatterRes: Response, result: any) => {
        // レスポンスヘッダーを変更したいときはここをいじれば変えられる
        // TODO: 一旦 no-cache だけ入れとく必要なかったら消す
        /* eslint-disable @typescript-eslint/ban-ts-ignore */
        // TODO: 謎の `does not exist` error がなくなったら ignore 削除
        // @ts-ignore
        responseFormatterRes.header("Cache-Control", ["no-store", "no-cache"].join(","))
        // @ts-ignore
        responseFormatterRes.header("Pragma", "no-cache")
        /* eslint-enable @typescript-eslint/ban-ts-ignore */
        return result.data
      },
    })(req, res, next)
  }
}
