import { Factura } from '../../types/factura';

export interface FacturaFilters {
  estado?: string;
  cifCliente?: string;
}

export interface IFacturaRepository {
  connect(): Promise<void>;
  save(factura: Factura): Promise<Factura>;
  findById(id: string): Promise<Factura | null>;
  findAll(filters?: FacturaFilters): Promise<Factura[]>;
  delete(id: string): Promise<void>;
  update(factura: Factura): Promise<Factura>;
  getNextNumero(): Promise<string>;
}

export class InMemoryFacturaRepository implements IFacturaRepository {
  private facturas: Map<string, Factura> = new Map();
  private nextNumber: number = 1;

  async connect(): Promise<void> {
    // In-memory repository doesn't need connection
  }

  async save(factura: Factura): Promise<Factura> {
    this.facturas.set(factura.id, factura);
    return factura;
  }

  async findById(id: string): Promise<Factura | null> {
    return this.facturas.get(id) || null;
  }

  async findAll(filters?: FacturaFilters): Promise<Factura[]> {
    let facturas = Array.from(this.facturas.values());

    if (filters?.estado) {
      facturas = facturas.filter(f => f.estado === filters.estado);
    }

    if (filters?.cifCliente) {
      facturas = facturas.filter(f => f.cifCliente === filters.cifCliente);
    }

    return facturas;
  }

  async delete(id: string): Promise<void> {
    this.facturas.delete(id);
  }

  async update(factura: Factura): Promise<Factura> {
    this.facturas.set(factura.id, factura);
    return factura;
  }

  async getNextNumero(): Promise<string> {
    const prefix = process.env.INVOICE_PREFIX || 'BT';
    const numberLength = parseInt(process.env.INVOICE_NUMBER_LENGTH || '3');
    
    const numero = `${prefix}${this.nextNumber.toString().padStart(numberLength, '0')}`;
    this.nextNumber++;
    
    return numero;
  }
}