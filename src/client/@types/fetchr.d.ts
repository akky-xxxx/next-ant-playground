import { Request, Response, NextFunction } from "express"

declare module "fetchr" {
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
    read(resource: string, params: {}, config: {}, callback: Function): void
    read(resource: string, params: {}, config: {}, callback: null): Promise<Record<string, unknown>>
    create(resource: string, params: {}, body: {}, config: {}, callback: Function): void
    create(resource: string, params: {}, body: {}, config: {}, callback: null): Promise<Record<string, unknown>>
    update(resource: string, params: {}, body: {}, config: {}, callback: Function): void
    update(resource: string, params: {}, body: {}, config: {}, callback: null): Promise<Record<string, unknown>>
    delete(resource: string, params: {}, config: {}, callback: Function): void
    delete(resource: string, params: {}, config: {}, callback: null): Promise<Record<string, unknown>>
  }

  export default class Fetchr implements Fetchr {}
}
