import express, { Application } from 'express';
import { createFacturaRouter } from './infrastructure/transport/routes/facturaRoutes';
import { createTestRouter } from './infrastructure/transport/routes/testRoutes';
import { InMemoryFacturaRepository } from './infrastructure/persistence/FacturaRepository';
import { PostgreSQLFacturaRepository } from './infrastructure/persistence/PostgreSQLFacturaRepository';
import { requestLogger } from './middleware/requestLogger';

export function createApp(usePostgreSQL: boolean = false): Application {
  const app = express();
  
  // Request logging middleware
  app.use(requestLogger);
  
  app.use(express.json());
  
  // Create repository instance based on configuration
  const facturaRepository = usePostgreSQL 
    ? new PostgreSQLFacturaRepository()
    : new InMemoryFacturaRepository();
    
  app.use('/api/facturas', createFacturaRouter(facturaRepository));
  app.use('/api/test', createTestRouter());
  
  return app;
}