import { Router } from 'express';
import { FacturaController } from '../controllers/FacturaController';
import { CreateFacturaUseCase } from '../../../domain/usecases/CreateFacturaUseCase';
import { GetFacturasUseCase } from '../../../domain/usecases/GetFacturasUseCase';
import { GetFacturaByIdUseCase } from '../../../domain/usecases/GetFacturaByIdUseCase';
import { DeleteFacturaUseCase } from '../../../domain/usecases/DeleteFacturaUseCase';
import { UpdateFacturaEstadoUseCase } from '../../../domain/usecases/UpdateFacturaEstadoUseCase';
import { IFacturaRepository } from '../../persistence/FacturaRepository';

export function createFacturaRouter(facturaRepository: IFacturaRepository): Router {
  const router = Router();
  
  const createFacturaUseCase = new CreateFacturaUseCase(facturaRepository);
  const getFacturasUseCase = new GetFacturasUseCase(facturaRepository);
  const getFacturaByIdUseCase = new GetFacturaByIdUseCase(facturaRepository);
  const deleteFacturaUseCase = new DeleteFacturaUseCase(facturaRepository);
  const updateFacturaEstadoUseCase = new UpdateFacturaEstadoUseCase(facturaRepository);
  const facturaController = new FacturaController(
    createFacturaUseCase, 
    getFacturasUseCase, 
    getFacturaByIdUseCase, 
    deleteFacturaUseCase, 
    updateFacturaEstadoUseCase
  );

  router.post('/', (req, res) => facturaController.createFactura(req, res));
  router.get('/', (req, res) => facturaController.getFacturas(req, res));
  router.get('/:id', (req, res) => facturaController.getFacturaById(req, res));
  router.delete('/:id', (req, res) => facturaController.deleteFactura(req, res));
  router.patch('/:id/estado', (req, res) => facturaController.updateFacturaEstado(req, res));

  return router;
}