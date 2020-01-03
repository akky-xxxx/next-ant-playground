/**
 * import node_modules
 */
import axios, { AxiosRequestConfig } from "axios"
import { Service } from "axios-middleware"

/**
 * main
 */
const service = new Service(axios)

service.register({
  onRequest(config: AxiosRequestConfig) {
    const parsedData = JSON.parse(config.data)
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${parsedData.bearerToken}`,
    }

    console.log("↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓")
    console.log(config)
    console.log("↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑")
    return config
  },
})

export default axios
