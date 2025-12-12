import { Factura } from '../../types/factura';
import { IFacturaRepository } from '../../infrastructure/persistence/FacturaRepository';

export class UpdateFacturaEstadoUseCase {
  constructor(private facturaRepository: IFacturaRepository) {}

  async execute(id: string, nuevoEstado: string): Promise<Factura> {
    if (nuevoEstado !== 'definitivo') {
      throw new Error('Solo se permite cambiar a estado definitivo');
    }

    const factura = await this.facturaRepository.findById(id);
    
    if (!factura) {
      throw new Error('Factura no encontrada');
    }

    if (factura.estado === 'definitivo') {
      throw new Error('La factura ya está en estado definitivo');
    }

    factura.estado = 'definitivo';
    factura.numero = await this.facturaRepository.getNextNumero();
    factura.fechaDefinitivo = new Date().toISOString();

    return await this.facturaRepository.update(factura);
  }
}