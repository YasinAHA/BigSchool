import { Request, Response } from 'express';
import { CreateFacturaUseCase } from '../../../domain/usecases/CreateFacturaUseCase';
import { GetFacturasUseCase } from '../../../domain/usecases/GetFacturasUseCase';
import { GetFacturaByIdUseCase } from '../../../domain/usecases/GetFacturaByIdUseCase';
import { DeleteFacturaUseCase } from '../../../domain/usecases/DeleteFacturaUseCase';
import { UpdateFacturaEstadoUseCase } from '../../../domain/usecases/UpdateFacturaEstadoUseCase';

export class FacturaController {
  constructor(
    private createFacturaUseCase: CreateFacturaUseCase,
    private getFacturasUseCase: GetFacturasUseCase,
    private getFacturaByIdUseCase: GetFacturaByIdUseCase,
    private deleteFacturaUseCase: DeleteFacturaUseCase,
    private updateFacturaEstadoUseCase: UpdateFacturaEstadoUseCase
  ) {}

  async createFactura(req: Request, res: Response): Promise<void> {
    try {
      const factura = await this.createFacturaUseCase.execute(req.body);
      res.status(201).json(factura);
    } catch (error) {
      if (error instanceof Error && error.message.includes('Faltan campos requeridos')) {
        res.status(400).json({
          codigo: 'CAMPOS_REQUERIDOS',
          mensaje: error.message
        });
      } else {
        res.status(500).json({
          codigo: 'ERROR_INTERNO',
          mensaje: 'Error al crear la factura'
        });
      }
    }
  }

  async getFacturas(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        estado: req.query.estado as string | undefined,
        cifCliente: req.query.cifCliente as string | undefined
      };
      
      const result = await this.getFacturasUseCase.execute(filters);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        codigo: 'ERROR_INTERNO',
        mensaje: 'Error al obtener las facturas'
      });
    }
  }

  async getFacturaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const factura = await this.getFacturaByIdUseCase.execute(id);
      
      if (!factura) {
        res.status(404).json({
          codigo: 'FACTURA_NO_ENCONTRADA',
          mensaje: 'Factura no encontrada'
        });
        return;
      }
      
      res.json(factura);
    } catch (error) {
      res.status(500).json({
        codigo: 'ERROR_INTERNO',
        mensaje: 'Error al obtener la factura'
      });
    }
  }

  async deleteFactura(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteFacturaUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Factura no encontrada') {
          res.status(404).json({
            codigo: 'FACTURA_NO_ENCONTRADA',
            mensaje: error.message
          });
        } else if (error.message.includes('No se puede eliminar')) {
          res.status(400).json({
            codigo: 'FACTURA_NO_ELIMINABLE',
            mensaje: error.message
          });
        } else {
          res.status(500).json({
            codigo: 'ERROR_INTERNO',
            mensaje: 'Error al eliminar la factura'
          });
        }
      } else {
        res.status(500).json({
          codigo: 'ERROR_INTERNO',
          mensaje: 'Error al eliminar la factura'
        });
      }
    }
  }

  async updateFacturaEstado(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { estado } = req.body;
      
      const factura = await this.updateFacturaEstadoUseCase.execute(id, estado);
      res.json(factura);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Factura no encontrada') {
          res.status(404).json({
            codigo: 'FACTURA_NO_ENCONTRADA',
            mensaje: error.message
          });
        } else if (error.message.includes('ya está en estado definitivo') || 
                   error.message.includes('Solo se permite')) {
          res.status(400).json({
            codigo: 'ESTADO_INVALIDO',
            mensaje: error.message
          });
        } else {
          res.status(500).json({
            codigo: 'ERROR_INTERNO',
            mensaje: 'Error al actualizar el estado de la factura'
          });
        }
      } else {
        res.status(500).json({
          codigo: 'ERROR_INTERNO',
          mensaje: 'Error al actualizar el estado de la factura'
        });
      }
    }
  }
}