import { format } from "date-fns"

/**
 * import
 */
import winstonLogger from "./winstonLogger"

/**
 * main
 */
type ModuleName = string

interface LoggerOptions {
  message?: string
  data?: unknown
  httpStatus?: number
}

interface ErrorOptions extends LoggerOptions {
  error: Error
}

type SillyLogger = (message?: string, isHidden?: boolean) => void
type CommonLogger = (options?: LoggerOptions, isHidden?: boolean) => void
type ErrorLogger = (options?: ErrorOptions, isHidden?: boolean) => void

interface CrateLoggerReturn {
  sillyLogger: SillyLogger
  infoLogger: CommonLogger
  debugLogger: CommonLogger
  errorLogger: ErrorLogger
}

type CreateLogger = (module: ModuleName) => CrateLoggerReturn

type GetTimeStamp = () => string
const getDatetime: GetTimeStamp = () => format(new Date(), "yyyy-MM-dd HH:mm:ss")

const createLogger: CreateLogger = module => {
  const sillyLogger: SillyLogger = (message, isHidden) => {
    if (!isHidden) winstonLogger.silly(`[${module}] ${message}`)
  }
  const infoLogger: CommonLogger = (options, isHidden) => {
    const loggerData = { module, datetime: getDatetime(), ...options }
    if (!isHidden) winstonLogger.info(JSON.stringify(loggerData))
  }
  const debugLogger: CommonLogger = (options, isHidden) => {
    const loggerData = { module, datetime: getDatetime(), ...options }
    if (!isHidden) winstonLogger.debug(JSON.stringify(loggerData))
  }
  const errorLogger: ErrorLogger = (options, isHidden) => {
    const loggerData = { module, datetime: getDatetime(), ...options }
    if (!isHidden) winstonLogger.error(JSON.stringify(loggerData))
  }

  return {
    sillyLogger,
    infoLogger,
    debugLogger,
    errorLogger,
  }
}

export default createLogger
