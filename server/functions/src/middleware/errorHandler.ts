import { Request, Response, NextFunction } from 'express'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Normally you would log the error to an error reporting service
  console.error(err.stack)
  return res.status(500).json({ error: 'An unexpected error occurred' })
}
