/**
 * import node_modules
 */
import { format as formatUrl } from "url"
import debugFactory from "debug"
import { Request } from "express"
import util from "util"
import { AxiosStatic, AxiosPromise, AxiosResponse, AxiosError } from "axios"

type Method1 = (
  req: Request,
  resource: string,
  params: Record<string, unknown>,
  config: unknown,
  callback: Function,
) => AxiosPromise<any>
type Method2 = (
  req: Request,
  resource: string,
  params: Record<string, unknown>,
  body: Record<string, unknown>,
  config: unknown,
  callback: Function,
) => AxiosPromise<any>

export type ReadMethod = Method1
export type DeleteMethod = Method1
export type CreateMethod = Method2
export type UpdateMethod = Method2

const debug = debugFactory("app:server:services")

export interface BaseService {
  axios: Pick<AxiosStatic, "create">
  name: string
  pathname: string
  params: unknown
  read: ReadMethod
  create: CreateMethod
  update: UpdateMethod
  delete: DeleteMethod
}

export default class BaseServiceClass implements BaseService {
  axios: any

  name: string

  pathname: string

  params: any

  constructor(_config: unknown, name: string, pathname: string, params: any = {}) {
    // axiosは継承先でcreateAxiosする
    this.axios = null
    this.name = name
    this.pathname = pathname
    this.params = params
  }

  /**
   * get parameterを使ってリクエスト URL を生成する
   * @param params
   */
  private getFormattedUrl(params: Record<string, unknown>): string {
    return formatUrl({
      pathname: this.pathname,
      query: { ...this.params, ...params },
    })
  }

  /**
   * read axios.get
   * @param _req - express の req, リクエストに関連する情報が入っている
   * @param resource - 呼び出し時のデータサービス名が入ってくる
   * @param params - request parameter
   * @param _config - その他リクエスト時の処理で渡したい値
   */
  read(_req: Request, resource: string, params: Record<string, unknown>, _config: unknown) {
    debug(`[${resource}][GET]: ${this.getFormattedUrl(params)}`)
    debug(`[${resource}][GET](params): `)
    debug(params)

    return this.axios.get(this.getFormattedUrl(params)).then(
      // Success
      (response: AxiosResponse) => {
        debug("[response.data]")
        debug(util.inspect(response.data, { depth: null, colors: true }))
        return response.data.results
      },

      // Fail
      (error: AxiosError) => {
        debug(util.inspect(error, { depth: null, colors: true }))
        return Promise.reject(error)
      },
    )
  }

  /**
   *
   * @param _req - express の req, リクエストに関連する情報が入っている
   * @param resource - 呼び出し時のデータサービス名が入ってくる
   * @param params - request parameter
   * @param body - request body
   * @param _config - その他リクエスト時の処理で渡したい値
   */
  create(
    _req: Request,
    resource: string,
    params: Record<string, unknown>,
    body: Record<string, unknown>,
    _config: unknown,
  ) {
    debug(`[${resource}][POST]:`)
    debug(`body: `)
    debug(body)
    debug(`[${resource}][POST](params): `)
    debug(params)

    return this.axios.post(this.pathname, body).then(
      // Success
      (response: AxiosResponse) => {
        debug("[response.data]")
        debug(util.inspect(response.data, { depth: null, colors: true }))
        return response.data.results
      },

      // Fail
      (error: AxiosError) => {
        debug(util.inspect(error, { depth: null, colors: true }))
        return Promise.reject(error)
      },
    )
  }

  /**
   * update axios.patch
   * @param _req - express の req, リクエストに関連する情報が入っている
   * @param resource - 呼び出し時のデータサービス名が入ってくる
   * @param params - request parameter
   * @param body - request body
   * @param _config - その他リクエスト時の処理で渡したい値
   */
  update(_req: Request, resource: string, params: Record<string, unknown>, body: unknown, _config: unknown) {
    debug(`[${resource}][UPDATE]: body: ${body}`)
    debug(`[${resource}][UPDATE](params): `)
    debug(params)

    return this.axios.patch(this.getFormattedUrl(params)).then(
      // Success
      (response: AxiosResponse) => {
        debug("[response.data]")
        debug(response.data)
        return response.data.results
      },

      // Fail
      (error: AxiosError) => {
        debug(error)
        return Promise.reject(error)
      },
    )
  }

  /**
   * read axios.delete
   * @param _req - express の req, リクエストに関連する情報が入っている
   * @param resource - 呼び出し時のデータサービス名が入ってくる
   * @param params - request parameter
   * @param _config - その他リクエスト時の処理で渡したい値
   */
  delete(_req: Request, resource: string, params: Record<string, unknown>, _config: unknown) {
    debug(`[${resource}][DELETE]: DELETE ${this.getFormattedUrl(params)}`)
    debug(`[${resource}][DELETE](params): `)
    debug(params)

    return this.axios.delete(this.getFormattedUrl(params)).then(
      // Success
      (response: AxiosResponse) => {
        debug("[response.data]")
        debug(response.data)
        return response.data.results
      },

      // Fail
      (error: AxiosError) => {
        debug(error)
        return Promise.reject(error)
      },
    )
  }
}
