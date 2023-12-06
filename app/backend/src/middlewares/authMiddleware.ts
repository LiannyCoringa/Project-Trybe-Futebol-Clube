import { NextFunction, Request, Response } from 'express';

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

class authMiddleware {
  static async authMiddleware(req: Request, res: Response, next: NextFunction)
    : Promise<void | Response> {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = extractToken(authorization);
    if (!token) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}

export default authMiddleware;
