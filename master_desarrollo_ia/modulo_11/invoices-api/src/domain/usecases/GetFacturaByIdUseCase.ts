import { Factura } from '../../types/factura';
import { IFacturaRepository } from '../../infrastructure/persistence/FacturaRepository';

export class GetFacturaByIdUseCase {
  constructor(private facturaRepository: IFacturaRepository) {}

  async execute(id: string): Promise<Factura | null> {
    return await this.facturaRepository.findById(id);
  }
}