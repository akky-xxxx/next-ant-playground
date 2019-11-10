/**
 * # カスタムサーバー
 */
/**
 * import node_modules
 */
import next from "next"
import express from "express"
import Fetchr from "fetchr"
import * as path from "path"
import Routes from "next-routes"

/**
 * import others
 */
import router from "./index"

const port = 3000
const isDev = process.env.NODE_ENV !== "production"
const rootDir = path.resolve(__dirname, "../")
const dir = path.resolve(rootDir, "src/client")
const app = next({
  dir,
  dev: isDev,
})
const routes = new Routes()
const handle = routes.getRequestHandler(app)

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(router(Fetchr))
    server.use(handle)

    // TODO: any を外せたら外す
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server.listen(port, (err: any) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
      console.log(`-------------------------------------`)
      console.log(`Serving files from: ${dir}`)
    })
  })
  .catch(error => {
    console.error(error.stack)
    process.exit(1)
  })
