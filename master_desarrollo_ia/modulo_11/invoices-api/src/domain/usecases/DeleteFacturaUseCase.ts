import { IFacturaRepository } from '../../infrastructure/persistence/FacturaRepository';

export class DeleteFacturaUseCase {
  constructor(private facturaRepository: IFacturaRepository) {}

  async execute(id: string): Promise<void> {
    const factura = await this.facturaRepository.findById(id);
    
    if (!factura) {
      throw new Error('Factura no encontrada');
    }

    if (factura.estado === 'definitivo') {
      throw new Error('No se puede eliminar una factura en estado definitivo');
    }

    await this.facturaRepository.delete(id);
  }
}