/**
 * import node_modules
 */
import dotenv from "dotenv"
import { Format } from "logform"
import { format, transports, LoggerOptions } from "winston"

/**
 * import others
 */
import formatParams from "./modules/formatParams"
import isDev from "../isDev"

/**
 * main
 */
dotenv.config()

const { timestamp, align, printf, colorize, combine } = format

const formats: Format[] = [timestamp(), align(), printf(formatParams)]
if (isDev) {
  formats.unshift(colorize())
}

type TransportValues = typeof transports.Console
const transportValues: TransportValues[] = [new transports.Console()]

const options: LoggerOptions = {
  level: process.env.LOG_LEVEL || "silly",
  format: combine(...formats),
  transports: transportValues,
}

export default options
