import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(403).json({ error: 'No authentication token provided' })
  }

  const idToken = authHeader.split('Bearer ')[1]
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    res.locals.uid = decodedToken.uid
    return next()
  } catch (error) {
    console.error('Error verifying auth token:', error)
    return res.status(403).json({ error: 'Invalid authentication token' })
  }
}
