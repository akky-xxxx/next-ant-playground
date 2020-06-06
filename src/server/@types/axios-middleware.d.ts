import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosPromise } from "axios"

interface Middleware {
  onRequest?: (config: AxiosRequestConfig) => config
  onResponse?: (response: AxiosResponse) => response
  onSync?: (promise: AxiosPromise) => promise
}

declare module "axios-middleware" {
  export default class HttpMiddlewareService {
    constructor(axios: AxiosInstance): void

    public setHttp(axios: AxiosInstance): this

    public unsetHttp(): this

    // Record の generics の any は Record の default
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public has(middleware: Record<string, any> | Middleware[]): boolean

    public register(middleware: Middleware): this

    public unregister(middleware: Middleware): this

    public reset(): this

    public adapter(config: AxiosRequestConfig): AxiosPromise
  }
}
