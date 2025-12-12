import { Factura } from '../../types/factura';
import { IFacturaRepository, FacturaFilters } from './FacturaRepository';
import { pool } from '../database/connection';
import { PoolClient } from 'pg';

export class PostgreSQLFacturaRepository implements IFacturaRepository {

  async connect(): Promise<void> {
    try {
      await pool.connect();
      console.log('✅ PostgreSQL repository connected successfully');
    } catch (error) {
      console.error('❌ PostgreSQL repository connection failed:', error);
      throw error;
    }
  }
  
  private mapRowToFactura(row: any): Factura {
    return {
      id: row.id,
      numero: row.numero,
      cifCliente: row.cif_cliente,
      denominacionSocial: row.denominacion_social,
      direccionFiscal: row.direccion_fiscal,
      importeBase: parseFloat(row.importe_base),
      iva: parseFloat(row.iva),
      importeTotal: parseFloat(row.importe_total),
      estado: row.estado,
      fechaCreacion: row.fecha_creacion,
      fechaDefinitivo: row.fecha_definitivo
    };
  }

  async save(factura: Factura): Promise<Factura> {
    const query = `
      INSERT INTO facturas (
        id, numero, cif_cliente, denominacion_social, direccion_fiscal,
        importe_base, iva, importe_total, estado, fecha_creacion, fecha_definitivo
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
    
    const values = [
      factura.id,
      factura.numero,
      factura.cifCliente,
      factura.denominacionSocial,
      factura.direccionFiscal,
      factura.importeBase,
      factura.iva,
      factura.importeTotal,
      factura.estado,
      factura.fechaCreacion,
      factura.fechaDefinitivo
    ];

    const result = await pool.query(query, values);
    return this.mapRowToFactura(result.rows[0]);
  }

  async findById(id: string): Promise<Factura | null> {
    const query = 'SELECT * FROM facturas WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return this.mapRowToFactura(result.rows[0]);
  }

  async findAll(filters?: FacturaFilters): Promise<Factura[]> {
    let query = 'SELECT * FROM facturas';
    const conditions: string[] = [];
    const values: any[] = [];
    let paramCounter = 1;

    if (filters?.estado) {
      conditions.push(`estado = $${paramCounter}`);
      values.push(filters.estado);
      paramCounter++;
    }

    if (filters?.cifCliente) {
      conditions.push(`cif_cliente = $${paramCounter}`);
      values.push(filters.cifCliente);
      paramCounter++;
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY fecha_creacion DESC';

    const result = await pool.query(query, values);
    return result.rows.map(row => this.mapRowToFactura(row));
  }

  async delete(id: string): Promise<void> {
    const query = 'DELETE FROM facturas WHERE id = $1';
    await pool.query(query, [id]);
  }

  async update(factura: Factura): Promise<Factura> {
    const query = `
      UPDATE facturas SET
        numero = $2,
        cif_cliente = $3,
        denominacion_social = $4,
        direccion_fiscal = $5,
        importe_base = $6,
        iva = $7,
        importe_total = $8,
        estado = $9,
        fecha_creacion = $10,
        fecha_definitivo = $11,
        updated_at = NOW()
      WHERE id = $1
      RETURNING *
    `;
    
    const values = [
      factura.id,
      factura.numero,
      factura.cifCliente,
      factura.denominacionSocial,
      factura.direccionFiscal,
      factura.importeBase,
      factura.iva,
      factura.importeTotal,
      factura.estado,
      factura.fechaCreacion,
      factura.fechaDefinitivo
    ];

    const result = await pool.query(query, values);
    return this.mapRowToFactura(result.rows[0]);
  }

  async getNextNumero(): Promise<string> {
    const prefix = process.env.INVOICE_PREFIX || 'BT';
    const numberLength = parseInt(process.env.INVOICE_NUMBER_LENGTH || '3');
    
    const query = 'SELECT nextval(\'factura_number_seq\') as next_number';
    const result = await pool.query(query);
    
    const nextNumber = result.rows[0].next_number;
    return `${prefix}${nextNumber.toString().padStart(numberLength, '0')}`;
  }
}