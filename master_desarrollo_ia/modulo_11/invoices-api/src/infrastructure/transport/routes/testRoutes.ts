import { Router } from 'express';
import { authMiddleware } from '../../../middleware/auth';

export function createTestRouter(): Router {
  const router = Router();
  
  router.get('/protected', authMiddleware, (req, res) => {
    res.json({ 
      message: 'Acceso exitoso a endpoint protegido',
      timestamp: new Date().toISOString()
    });
  });
  
  return router;
}