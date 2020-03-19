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
import createLogger from "./utils/createLogger"

const port = 3000
const rootDir = path.resolve(__dirname, "../")
const dir = path.resolve(rootDir, "src/client")
const app = next({
  dir,
  dev: isDev,
})
const routes = new Routes()
const handle = routes.getRequestHandler(app)
const { sillyLogger, infoLogger, errorLogger } = createLogger("start server")

infoLogger({
  message: "prepare server",
  data: {
    mode: isDev ? "develop" : "production",
  },
})
app
  .prepare()
  .then(() => {
    const server = express()
    sillyLogger("create server")

    if (!isDev) {
      server.use(session(sessionConfig))
      server.use(passport.initialize())
      server.use(passport.session())
      server.use(oauth.router)
      server.use(oauth.required)
    }

    server.use(router())
    server.use(handle)

    server.listen(port, (error: Error) => {
      if (error) {
        errorLogger({ error })
        throw error
      }

      sillyLogger("========================================")
      sillyLogger(`Ready on http://localhost:${port}`)
      sillyLogger(`Serving files from: ${dir}`)
      sillyLogger("========================================")
    })
  })
  .catch(error => {
    errorLogger({ error })
    process.exit(1)
  })
