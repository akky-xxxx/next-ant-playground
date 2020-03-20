/**
 * import node_modules
 */
import { createLogger, Logger } from "winston"
import dotenv from "dotenv"

/**
 * import others
 */
import config from "./config"

/**
 * main
 */
dotenv.config()

const winstonLogger: Logger = createLogger(config)

export default winstonLogger
