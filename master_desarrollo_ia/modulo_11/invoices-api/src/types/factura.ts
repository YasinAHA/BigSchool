export interface Factura {
  id: string;
  numero: string | null;
  cifCliente: string;
  denominacionSocial: string;
  direccionFiscal: string;
  importeBase: number;
  iva: number;
  importeTotal: number;
  estado: 'borrador' | 'definitivo';
  fechaCreacion: string;
  fechaDefinitivo: string | null;
}