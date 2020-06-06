import { Request, Response, NextFunction } from "express"
import { AnyObject } from "../shared/types/common"

declare module "fetchr" {
  // TODO: 型の厳密化
  /* eslint-disable @typescript-eslint/ban-types */
  export interface Fetchr {
    registerService(fetcher: unknown): void | Error
    getService(name: string): Function | Error
    isRegistered(name: string): boolean
    middleware(options: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responseFormatter?: (req: Request, res: Response, data: any) => any
      statsCollector?: Function
      paramsProcessor?: Function
    }): (req: Request, res: Response, next: NextFunction) => void
    read(resource: string, params: AnyObject, config: AnyObject, callback: Function): void
    read(resource: string, params: AnyObject, config: AnyObject, callback: null): Promise<Record<string, unknown>>
    create(resource: string, params: AnyObject, body: AnyObject, config: AnyObject, callback: Function): void
    create(
      resource: string,
      params: AnyObject,
      body: AnyObject,
      config: AnyObject,
      callback: null,
    ): Promise<Record<string, unknown>>
    update(resource: string, params: AnyObject, body: AnyObject, config: AnyObject, callback: Function): void
    update(
      resource: string,
      params: AnyObject,
      body: AnyObject,
      config: AnyObject,
      callback: null,
    ): Promise<Record<string, unknown>>
    delete(resource: string, params: AnyObject, config: AnyObject, callback: Function): void
    delete(resource: string, params: AnyObject, config: AnyObject, callback: null): Promise<Record<string, unknown>>
  }
  /* eslint-enable @typescript-eslint/ban-types */

  export default class Fetchr implements Fetchr {}
}
