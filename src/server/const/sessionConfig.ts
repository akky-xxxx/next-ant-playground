/**
 * import node_modules
 */
import session from "express-session"
import memorystore from "memorystore"
import dotenv from "dotenv"

/**
 * import others
 */
import isLocal from "../utils/isLocal"

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
    secure: !isLocal,
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  },
}

export default sessionConfig
