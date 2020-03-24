/**
 * import node_modules
 */
import { Request } from "express"

/**
 * import others
 */
import { BaseService, CreateMethod, DeleteMethod, ReadMethod, UpdateMethod } from "../../services/BaseService"

/**
 * main
 */
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

export default makeServiceAdapter
