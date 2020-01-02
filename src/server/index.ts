/**
 * import node_modules
 */
import express, { Request, Response, NextFunction } from "express"

/**
 * import others
 */
import { apiGateway } from "./middlewares"
import config from "./configs"

export default function router() {
  const app = express.Router()
  app.use((_req: Request, _res: Response, next: NextFunction) => {
    next()
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(config.fetchr.clientConfig.xhrPath, apiGateway())

  return app
}
