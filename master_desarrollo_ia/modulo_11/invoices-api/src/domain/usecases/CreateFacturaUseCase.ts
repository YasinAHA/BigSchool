import { randomUUID } from 'crypto';
import { Factura } from '../../types/factura';
import { IFacturaRepository } from '../../infrastructure/persistence/FacturaRepository';

export interface CreateFacturaDTO {
  cifCliente: string;
  denominacionSocial: string;
  direccionFiscal: string;
  importeBase: number;
  iva: number;
}

export class CreateFacturaUseCase {
  constructor(private facturaRepository: IFacturaRepository) {}

  async execute(data: CreateFacturaDTO): Promise<Factura> {
    this.validateData(data);

    const nuevaFactura: Factura = {
      id: randomUUID(),
      numero: null,
      cifCliente: data.cifCliente,
      denominacionSocial: data.denominacionSocial,
      direccionFiscal: data.direccionFiscal,
      importeBase: data.importeBase,
      iva: data.iva,
      importeTotal: data.importeBase + data.iva,
      estado: 'borrador',
      fechaCreacion: new Date().toISOString(),
      fechaDefinitivo: null
    };

    return await this.facturaRepository.save(nuevaFactura);
  }

  private validateData(data: CreateFacturaDTO): void {
    if (!data.cifCliente || !data.denominacionSocial || !data.direccionFiscal || 
        data.importeBase === undefined || data.iva === undefined) {
      throw new Error('Faltan campos requeridos: cifCliente, denominacionSocial, direccionFiscal, importeBase, iva');
    }
  }
}