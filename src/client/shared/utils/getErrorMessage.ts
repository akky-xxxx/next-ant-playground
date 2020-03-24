/**
 * import
 */
import STATUS_MESSAGES from "../const/statusMessages"

/**
 * main
 */
type GetErrorMessage = (message?: string, statusCode?: number) => string

const getErrorMessage: GetErrorMessage = (message, statusCode) => {
  if (message) return message
  if (!statusCode) return STATUS_MESSAGES[500]
  return STATUS_MESSAGES[statusCode] || STATUS_MESSAGES[500]
}

export default getErrorMessage
