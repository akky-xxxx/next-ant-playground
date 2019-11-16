import { Request, Response, NextFunction } from "express"

/**
 * Fetcher class for the server.
 * Provides interface to register data services and
 * to later access those services.
 * @class Fetcher
 * @param {Object} options configuration options for Fetcher
 * @param {Object} [options.req] The express request object.  It can contain per-request/context data.
 * @param {string} [options.xhrPath="/api"] The path for XHR requests. Will be ignored server side.
 * @param {Function} [options.statsCollector] The function will be invoked with 1 argument:
 *      the stats object, which contains resource, operation, params (request params),
 *      statusCode, err, and time (elapsed time)
 * @param {Function} [options.paramsProcessor] The function will be invoked with 3 arguments:
 *      the req object, the serviceInfo object, and the params object.  It is expected to return the processed params object.
 * @constructor
 */
export interface FetchrConstructor {
  registerService(fetcher: unknown): void | Error
  getService(name: string): Function | Error
  isRegistered(name: string): boolean
  read(resource: string, params: {}, config: {}, callback: Function): void
  read(resource: string, params: {}, config: {}, callback: null): Promise<Record<string, unknown>>
  create(resource: string, params: {}, body: {}, config: {}, callback: Function): void
  create(resource: string, params: {}, body: {}, config: {}, callback: null): Promise<Record<string, unknown>>
  update(resource: string, params: {}, body: {}, config: {}, callback: Function): void
  update(resource: string, params: {}, body: {}, config: {}, callback: null): Promise<Record<string, unknown>>
  delete(resource: string, params: {}, config: {}, callback: Function): void
  delete(resource: string, params: {}, config: {}, callback: null): Promise<Record<string, unknown>>
  middleware(options: {
    responseFormatter?: (req: Request, res: Response, data: unknown) => unknown
    statsCollector?: Function
    paramsProcessor?: Function
  }): (req: Request, res: Response, next: NextFunction) => void
}
