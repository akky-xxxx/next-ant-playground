/**
 * import node_modules
 */
import { Request, Response } from "express"
import { AxiosResponse } from "axios"

/**
 * main
 */
type ResponseFormatter = (req: Request, responseFormatterRes: Response, result: unknown) => unknown

const isAxiosResponse = (args: unknown): args is AxiosResponse =>
  typeof args === "object" && (args as AxiosResponse).data !== undefined

const responseFormatter: ResponseFormatter = (_req, responseFormatterRes, result) => {
  // レスポンスヘッダーを変更したいときはここをいじれば変えられる
  // TODO: 一旦 no-cache だけ入れとく必要なかったら消す
  responseFormatterRes.header("Cache-Control", ["no-store", "no-cache"].join(","))
  responseFormatterRes.header("Pragma", "no-cache")

  if (isAxiosResponse(result)) return result.data
  return result
}

export default responseFormatter
