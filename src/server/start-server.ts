/**
 * # カスタムサーバー
 */
/**
 * import node_modules
 */
import next from "next"
import express from "express"
import session from "express-session"
import * as path from "path"
import Routes from "next-routes"
import passport from "passport"

/**
 * import others
 */
import router from "./index"
import sessionConfig from "./const/sessionConfig"
import oauth from "./middlewares/oauth"
import isDev from "./utils/isDev"

const port = 3000
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

    server.use(session(sessionConfig))

    if (!isDev) {
      server.use(session(sessionConfig))
      server.use(passport.initialize())
      server.use(passport.session())
      server.use(oauth.router)
      server.use(oauth.required)
    }

    server.use(router())
    server.use(handle)

    server.listen(port, (err: Error) => {
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
