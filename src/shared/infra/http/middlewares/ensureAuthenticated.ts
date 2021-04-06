import authConfig from '@config/auth';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
  type: string;
}

export default function ensuredAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { id, type } = decoded as ITokenPayload;

    request.user = {
      id,
      type,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT token.', 401);
  }
}
