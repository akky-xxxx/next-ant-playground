/**
 * import node_modules
 */
import { Request, Response } from "express"

/**
 * main
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const responseFormatter = (_req: Request, responseFormatterRes: Response, result: any) => {
  // レスポンスヘッダーを変更したいときはここをいじれば変えられる
  // TODO: 一旦 no-cache だけ入れとく必要なかったら消す
  responseFormatterRes.header("Cache-Control", ["no-store", "no-cache"].join(","))
  responseFormatterRes.header("Pragma", "no-cache")
  return result.data
}

export default responseFormatter
