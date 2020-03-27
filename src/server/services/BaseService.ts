/**
 * import node_modules
 */
import { format as formatUrl } from "url"
import { Request } from "express"
import { AxiosInstance } from "axios"
import axios from "axios"

/**
 * import others
 */
import commonConfigs from "../configs"
import createLogger from "../utils/createLogger"

/**
 * main
 */
const { axios: axiosConfig } = commonConfigs
const { infoLogger, errorLogger } = createLogger("BaseService")

type Method1 = (
  req: Request,
  resource: string,
  params: Record<string, unknown>,
  config: unknown,
  callback: Function,
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any>
type Method2 = (
  req: Request,
  resource: string,
  params: Record<string, unknown>,
  body: Record<string, unknown>,
  config: unknown,
  callback: Function,
) => // eslint-disable-next-line @typescript-eslint/no-explicit-any
Promise<any>

export type ReadMethod = Method1
export type DeleteMethod = Method1
export type CreateMethod = Method2
export type UpdateMethod = Method2

export interface BaseService {
  axios: AxiosInstance
  name: string
  /* eslint-disable @typescript-eslint/no-explicit-any */
  options?: Record<string, any>
  configs?: Record<string, any>
  /* eslint-enable @typescript-eslint/no-explicit-any */
  endpoints: string[]
  read: ReadMethod
  delete: DeleteMethod
  create: CreateMethod
  update: UpdateMethod
}

export default class BaseServiceClass implements BaseService {
  axios: AxiosInstance = axios.create(axiosConfig)

  name: string

  endpoints: string[]

  /* eslint-disable @typescript-eslint/no-explicit-any */
  options?: Record<string, any>

  configs?: Record<string, any>
  /* eslint-enable @typescript-eslint/no-explicit-any */

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(name: string, endpoints: string[], options?: Record<string, any>, configs?: Record<string, any>) {
    this.name = name // fetchr との紐付け
    this.endpoints = endpoints
    this.options = options // query param や request body
    this.configs = configs // header 情報等
  }

  /**
   * get parameterを使ってリクエスト URL を生成する
   */
  getFormattedUrl() {
    if (!this.options) return this.endpoints

    return this.endpoints.map((endpoint) => {
      return formatUrl({
        pathname: endpoint,
        query: { ...this.options },
      })
    })
  }

  async read() {
    const configs = {
      data: {
        // MEMO: 本来は api token を取得して格納する箇所
        bearerToken: "bearerTokenValue",
      },
      headers: {
        ...this.configs,
      },
    }
    const endpoints = this.getFormattedUrl()
    infoLogger({
      data: {
        method: "get",
        name: this.name,
        endpoints: endpoints.reduce((str, endpoint) => `${str}\n- ${endpoint}`, ""),
      },
    })

    try {
      const results = await Promise.all(endpoints.map((endpoint) => this.axios.get(endpoint, configs)))
      return results[0].data
    } catch (error) {
      errorLogger({ error })
      return error.response.data
    }
  }

  async delete() {
    const configs = this.configs || {}
    const endpoints = this.getFormattedUrl()
    infoLogger({
      data: {
        method: "delete",
        name: this.name,
        endpoints: endpoints.reduce((str, endpoint) => `${str}\n- ${endpoint}`, ""),
      },
    })

    try {
      const results = await Promise.all(endpoints.map((endpoint) => this.axios.delete(endpoint, configs)))
      return results
    } catch (error) {
      errorLogger({ error })
      return error
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_req: Request) {
    const options = this.options || {}
    const configs = this.configs || {}
    infoLogger({
      data: {
        method: "post",
        name: this.name,
        endpoints: this.endpoints,
      },
    })

    try {
      const results = await Promise.all(this.endpoints.map((endpoint) => this.axios.post(endpoint, options, configs)))
      return results
    } catch (error) {
      errorLogger({ error })
      return error
    }
  }

  async update() {
    const options = this.options || {}
    const configs = this.configs || {}
    infoLogger({
      data: {
        method: "put",
        name: this.name,
        endpoints: this.endpoints,
      },
    })

    try {
      const results = await Promise.all(this.endpoints.map((endpoint) => this.axios.put(endpoint, options, configs)))
      return results
    } catch (error) {
      errorLogger({ error })
      return error
    }
  }
}
