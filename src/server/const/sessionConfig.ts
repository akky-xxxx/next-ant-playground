/**
 * import node_modules
 */
import session from "express-session"
import memorystore from "memorystore"
import dotenv from "dotenv"

/**
 * import others
 */
import isDev from "../utils/isDev"

/**
 * main
 */
dotenv.config()

const MemoryStore = memorystore(session)

const sessionConfig = {
  store: new MemoryStore({
    checkPeriod: 86400000,
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET as string,
  cookie: {
    secure: !isDev,
    maxAge: 86400000,
    httpOnly: true,
  },
}

export default sessionConfig
