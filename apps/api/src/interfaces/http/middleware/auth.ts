import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from './errors.js';

export interface AuthUser {
  id: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-me';

export const signToken = (user: AuthUser): string => jwt.sign(user, SECRET, { expiresIn: '7d' });

export const requireAuth = (req: Request, _res: Response, next: NextFunction): void => {
  const header = req.header('authorization');
  if (!header?.startsWith('Bearer ')) {
    throw new HttpError(401, 'Missing bearer token');
  }
  try {
    const payload = jwt.verify(header.slice(7), SECRET) as AuthUser;
    req.user = payload;
    next();
  } catch {
    throw new HttpError(401, 'Invalid token');
  }
};

export const requireRole =
  (role: AuthUser['role']) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) throw new HttpError(401, 'Unauthenticated');
    if (req.user.role !== role && req.user.role !== 'ADMIN') {
      throw new HttpError(403, 'Forbidden');
    }
    next();
  };
