import { Factura } from '../../types/factura';
import { IFacturaRepository, FacturaFilters } from '../../infrastructure/persistence/FacturaRepository';

export interface GetFacturasResult {
  facturas: Factura[];
  total: number;
}

export class GetFacturasUseCase {
  constructor(private facturaRepository: IFacturaRepository) {}

  async execute(filters: FacturaFilters): Promise<GetFacturasResult> {
    const facturas = await this.facturaRepository.findAll(filters);

    return {
      facturas,
      total: facturas.length
    };
  }
}