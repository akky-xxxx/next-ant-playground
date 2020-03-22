class CustomError extends Error {
  statusCode: number
  body: string

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.body = message
  }
}

export default CustomError
