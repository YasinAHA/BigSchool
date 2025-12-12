import { createApp } from './app';
import { InMemoryFacturaRepository } from './infrastructure/persistence/FacturaRepository';
import { PostgreSQLFacturaRepository } from './infrastructure/persistence/PostgreSQLFacturaRepository';
import { createFacturaRouter } from './infrastructure/transport/routes/facturaRoutes';
import { createTestRouter } from './infrastructure/transport/routes/testRoutes';
import { requestLogger } from './middleware/requestLogger';
import express from 'express';

const PORT = process.env.PORT || 3000;
const USE_POSTGRESQL = process.env.USE_POSTGRESQL === 'true';

async function startServer() {
  try {
    const app = express();
    
    // Request logging middleware
    app.use(requestLogger);
    app.use(express.json());

    // Create and connect repository
    const facturaRepository = USE_POSTGRESQL 
      ? new PostgreSQLFacturaRepository()
      : new InMemoryFacturaRepository();
    
    await facturaRepository.connect();
    
    // Setup routes
    app.use('/api/facturas', createFacturaRouter(facturaRepository));
    app.use('/api/test', createTestRouter());

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(`Using ${USE_POSTGRESQL ? 'PostgreSQL' : 'In-Memory'} repository`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();