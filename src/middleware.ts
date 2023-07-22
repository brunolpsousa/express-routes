import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'

class CustomAPIError extends Error {
  statusCode: number
  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

export const createCustomError = (statusCode: number, msg: string) => {
  return new CustomAPIError(msg, statusCode)
}

const errorHandlerMiddleware = (
  err: ErrorRequestHandler,
  _: Request,
  res: Response,
  _2: NextFunction,
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res
    .status(500)
    .json({ sucess: false, msg: 'Something went wrong, please try again' })
}
export default errorHandlerMiddleware
