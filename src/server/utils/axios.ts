/**
 * import node_modules
 */
import axios, { AxiosRequestConfig } from "axios"
import { Service } from "axios-middleware"

/**
 * import others
 */
import createLogger from "./createLogger"

/**
 * main
 */
const service = new Service(axios)
const { infoLogger } = createLogger("axios middleware")

service.register({
  onRequest(config: AxiosRequestConfig) {
    if (config.headers.bearerToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${config.headers.bearerToken}`,
      }
    }

    infoLogger({ data: config })
    return config
  },
})
