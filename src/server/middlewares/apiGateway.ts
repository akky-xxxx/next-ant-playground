/**
 * import node_modules
 */
import debugFactory from "debug"
import { Request, Response, NextFunction } from "express"

/**
 * import others
 */
import services, { Services } from "../services"
import { FetchrConstructor } from "../types/Fetchr"
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
  methods1.forEach(method => {
    if (service[method]) {
      // TODO: types 解決
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      adapter[method] = async (
        req: Request,
        resource: string,
        params: Record<string, unknown>,
        config: unknown,
        callback: Function,
      ) => {
        service[method](req, resource, params, config, callback).then(
          // TODO: any を外せたら外す -> おそらく agreed との連携が必要
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result: any) => {
            callback(null, result)
          },
          (error: Record<string, unknown>) => {
            callback(error)
          },
        )
      }
    }
  })

  // create と update
  methods2.forEach(method => {
    if (service[method]) {
      // TODO: types 解決
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      adapter[method] = async (
        req: Request,
        resource: string,
        params: Record<string, unknown>,
        body: Record<string, unknown>,
        config: unknown,
        callback: Function,
      ) => {
        service[method](req, resource, params, body, config, callback).then(
          // TODO: any を外せたら外す -> おそらく agreed との連携が必要
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result: any) => {
            callback(null, result)
          },
          (error: Record<string, unknown>) => {
            callback(error)
          },
        )
      }
    }
  })

  return adapter
}

/**
 * service を Fetchr に登録する
 * @param config
 * @param Fetchr
 */
export default function apiGateway(config: unknown, Fetchr: FetchrConstructor) {
  debug("------------------------------------")
  Object.values(services).forEach((Service: Services) => {
    const service = new Service(config)
    debug(`❇️ Registering service: ${service.name}`)
    return Fetchr.registerService(makeServiceAdapter(service))
  })
  debug("------------------------------------")

  return (req: Request, res: Response, next: NextFunction) => {
    return Fetchr.middleware({
      responseFormatter: (_req, _res, data) => {
        // レスポンスヘッダーを変更したいときはここをいじれば変えられる
        // TODO: 一旦 no-cache だけ入れとく必要なかったら消す
        _res.header("Cache-Control", ["no-store", "no-cache"].join(","))
        _res.header("Pragma", "no-cache")
        return data
      },
    })(req, res, next)
  }
}
