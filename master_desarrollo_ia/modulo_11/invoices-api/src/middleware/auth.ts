import { Request, Response, NextFunction } from 'express';

const HARDCODED_TOKEN = 'test-token-123';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    res.status(401).json({ error: 'Token de autorización requerido' });
    return;
  }
  
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;
  
  if (token !== HARDCODED_TOKEN) {
    res.status(401).json({ error: 'Token inválido' });
    return;
  }
  
  next();
}