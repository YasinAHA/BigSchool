import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { Application } from 'express';
import { createApp } from '../app';

describe('API de Facturas', () => {
  let app: Application;

  beforeEach(() => {
    app = createApp();
  });

  describe('POST /api/facturas', () => {
    it('debería crear una nueva factura en estado borrador', async () => {
      const nuevaFactura = {
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa Ejemplo S.L.',
        direccionFiscal: 'Calle Mayor 123, 28001 Madrid',
        importeBase: 1000.00,
        iva: 210.00
      };

      const response = await request(app)
        .post('/api/facturas')
        .send(nuevaFactura)
        .expect(201);

      expect(response.body).toMatchObject({
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa Ejemplo S.L.',
        direccionFiscal: 'Calle Mayor 123, 28001 Madrid',
        importeBase: 1000.00,
        iva: 210.00,
        importeTotal: 1210.00,
        estado: 'borrador',
        numero: null
      });
      
      expect(response.body.id).toBeDefined();
      expect(response.body.fechaCreacion).toBeDefined();
      expect(response.body.fechaDefinitivo).toBeNull();
    });

    it('debería rechazar una factura sin campos requeridos', async () => {
      const facturaIncompleta = {
        cifCliente: 'B12345678'
      };

      await request(app)
        .post('/api/facturas')
        .send(facturaIncompleta)
        .expect(400);
    });

    it('debería calcular automáticamente el importe total', async () => {
      const nuevaFactura = {
        cifCliente: 'B12345678',
        denominacionSocial: 'Test S.L.',
        direccionFiscal: 'Calle Test 1',
        importeBase: 500.00,
        iva: 105.00
      };

      const response = await request(app)
        .post('/api/facturas')
        .send(nuevaFactura)
        .expect(201);

      expect(response.body.importeTotal).toBe(605.00);
    });
  });

  describe('GET /api/facturas', () => {
    it('debería devolver una lista vacía inicialmente', async () => {
      const response = await request(app)
        .get('/api/facturas')
        .expect(200);

      expect(response.body).toMatchObject({
        facturas: [],
        total: 0
      });
    });

    it('debería filtrar facturas por estado', async () => {
      // Crear facturas de prueba
      const factura1 = {
        cifCliente: 'B11111111',
        denominacionSocial: 'Empresa 1',
        direccionFiscal: 'Calle 1',
        importeBase: 100.00,
        iva: 21.00
      };

      const factura2 = {
        cifCliente: 'B22222222',
        denominacionSocial: 'Empresa 2',
        direccionFiscal: 'Calle 2',
        importeBase: 200.00,
        iva: 42.00
      };

      const factura3 = {
        cifCliente: 'B33333333',
        denominacionSocial: 'Empresa 3',
        direccionFiscal: 'Calle 3',
        importeBase: 300.00,
        iva: 63.00
      };

      // Crear 3 facturas
      const response1 = await request(app).post('/api/facturas').send(factura1);
      const response2 = await request(app).post('/api/facturas').send(factura2);
      const response3 = await request(app).post('/api/facturas').send(factura3);

      // Pasar 2 a definitivo
      await request(app)
        .patch(`/api/facturas/${response1.body.id}/estado`)
        .send({ estado: 'definitivo' });
      
      await request(app)
        .patch(`/api/facturas/${response2.body.id}/estado`)
        .send({ estado: 'definitivo' });

      // Consultar solo borradores
      const borradorResponse = await request(app)
        .get('/api/facturas')
        .query({ estado: 'borrador' })
        .expect(200);

      expect(borradorResponse.body.total).toBe(1);
      expect(borradorResponse.body.facturas).toHaveLength(1);
      expect(borradorResponse.body.facturas[0].cifCliente).toBe('B33333333');
      expect(borradorResponse.body.facturas[0].estado).toBe('borrador');

      // Consultar solo definitivos
      const definitivoResponse = await request(app)
        .get('/api/facturas')
        .query({ estado: 'definitivo' })
        .expect(200);

      expect(definitivoResponse.body.total).toBe(2);
      expect(definitivoResponse.body.facturas).toHaveLength(2);
      expect(definitivoResponse.body.facturas.every((f: any) => f.estado === 'definitivo')).toBe(true);
      expect(definitivoResponse.body.facturas.every((f: any) => f.numero !== null)).toBe(true);
    });

    it('debería filtrar facturas por CIF del cliente', async () => {
      // Crear facturas con diferentes CIFs
      const facturasCIF1 = [
        {
          cifCliente: 'B12345678',
          denominacionSocial: 'Empresa Test A',
          direccionFiscal: 'Calle A1',
          importeBase: 100.00,
          iva: 21.00
        },
        {
          cifCliente: 'B12345678',
          denominacionSocial: 'Empresa Test A',
          direccionFiscal: 'Calle A2',
          importeBase: 200.00,
          iva: 42.00
        }
      ];

      const facturasCIF2 = [
        {
          cifCliente: 'B87654321',
          denominacionSocial: 'Empresa Test B',
          direccionFiscal: 'Calle B1',
          importeBase: 300.00,
          iva: 63.00
        },
        {
          cifCliente: 'B99999999',
          denominacionSocial: 'Empresa Test C',
          direccionFiscal: 'Calle C1',
          importeBase: 400.00,
          iva: 84.00
        }
      ];

      // Crear todas las facturas
      for (const factura of facturasCIF1) {
        await request(app).post('/api/facturas').send(factura);
      }
      for (const factura of facturasCIF2) {
        await request(app).post('/api/facturas').send(factura);
      }

      // Filtrar por CIF B12345678
      const responseCIF1 = await request(app)
        .get('/api/facturas')
        .query({ cifCliente: 'B12345678' })
        .expect(200);

      expect(responseCIF1.body.total).toBe(2);
      expect(responseCIF1.body.facturas).toHaveLength(2);
      expect(responseCIF1.body.facturas.every((f: any) => f.cifCliente === 'B12345678')).toBe(true);

      // Filtrar por CIF B87654321
      const responseCIF2 = await request(app)
        .get('/api/facturas')
        .query({ cifCliente: 'B87654321' })
        .expect(200);

      expect(responseCIF2.body.total).toBe(1);
      expect(responseCIF2.body.facturas).toHaveLength(1);
      expect(responseCIF2.body.facturas[0].cifCliente).toBe('B87654321');

      // Filtrar por CIF inexistente
      const responseCIFInexistente = await request(app)
        .get('/api/facturas')
        .query({ cifCliente: 'B00000000' })
        .expect(200);

      expect(responseCIFInexistente.body.total).toBe(0);
      expect(responseCIFInexistente.body.facturas).toHaveLength(0);
    });

    it('debería combinar filtros de estado y CIF', async () => {
      // Crear facturas con combinaciones de CIF y estado
      const facturas = [
        {
          cifCliente: 'B55555555',
          denominacionSocial: 'Empresa Combo 1',
          direccionFiscal: 'Dir 1',
          importeBase: 100.00,
          iva: 21.00
        },
        {
          cifCliente: 'B55555555',
          denominacionSocial: 'Empresa Combo 1',
          direccionFiscal: 'Dir 2',
          importeBase: 200.00,
          iva: 42.00
        },
        {
          cifCliente: 'B55555555',
          denominacionSocial: 'Empresa Combo 1',
          direccionFiscal: 'Dir 3',
          importeBase: 300.00,
          iva: 63.00
        },
        {
          cifCliente: 'B66666666',
          denominacionSocial: 'Empresa Combo 2',
          direccionFiscal: 'Dir 4',
          importeBase: 400.00,
          iva: 84.00
        }
      ];

      const createdFacturas = [];
      for (const factura of facturas) {
        const response = await request(app).post('/api/facturas').send(factura);
        createdFacturas.push(response.body);
      }

      // Pasar las dos primeras facturas del CIF B55555555 a definitivo
      await request(app)
        .patch(`/api/facturas/${createdFacturas[0].id}/estado`)
        .send({ estado: 'definitivo' });
      
      await request(app)
        .patch(`/api/facturas/${createdFacturas[1].id}/estado`)
        .send({ estado: 'definitivo' });

      // Buscar facturas definitivas del CIF B55555555
      const response = await request(app)
        .get('/api/facturas')
        .query({ 
          cifCliente: 'B55555555',
          estado: 'definitivo'
        })
        .expect(200);

      expect(response.body.total).toBe(2);
      expect(response.body.facturas).toHaveLength(2);
      expect(response.body.facturas.every((f: any) => 
        f.cifCliente === 'B55555555' && 
        f.estado === 'definitivo' &&
        f.numero !== null
      )).toBe(true);

      // Buscar facturas borrador del CIF B55555555
      const responseBorrador = await request(app)
        .get('/api/facturas')
        .query({ 
          cifCliente: 'B55555555',
          estado: 'borrador'
        })
        .expect(200);

      expect(responseBorrador.body.total).toBe(1);
      expect(responseBorrador.body.facturas).toHaveLength(1);
      expect(responseBorrador.body.facturas[0].cifCliente).toBe('B55555555');
      expect(responseBorrador.body.facturas[0].estado).toBe('borrador');
    });

    it('debería devolver todas las facturas cuando no hay filtros', async () => {
      // Crear varias facturas mezcladas
      const facturas = [
        {
          cifCliente: 'B77777777',
          denominacionSocial: 'Empresa All 1',
          direccionFiscal: 'Dir All 1',
          importeBase: 100.00,
          iva: 21.00
        },
        {
          cifCliente: 'B88888888',
          denominacionSocial: 'Empresa All 2',
          direccionFiscal: 'Dir All 2',
          importeBase: 200.00,
          iva: 42.00
        },
        {
          cifCliente: 'B99999999',
          denominacionSocial: 'Empresa All 3',
          direccionFiscal: 'Dir All 3',
          importeBase: 300.00,
          iva: 63.00
        }
      ];

      for (const factura of facturas) {
        await request(app).post('/api/facturas').send(factura);
      }

      const response = await request(app)
        .get('/api/facturas')
        .expect(200);

      expect(response.body.total).toBe(3);
      expect(response.body.facturas).toHaveLength(3);
    });
  });

  describe('GET /api/facturas/:id', () => {
    it('debería devolver 404 para una factura inexistente', async () => {
      await request(app)
        .get('/api/facturas/550e8400-e29b-41d4-a716-446655440000')
        .expect(404);
    });

    it('debería devolver una factura existente', async () => {
      const nuevaFactura = {
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa Test',
        direccionFiscal: 'Calle Test 123',
        importeBase: 1000.00,
        iva: 210.00
      };

      const createResponse = await request(app)
        .post('/api/facturas')
        .send(nuevaFactura)
        .expect(201);

      const facturaId = createResponse.body.id;

      const getResponse = await request(app)
        .get(`/api/facturas/${facturaId}`)
        .expect(200);

      expect(getResponse.body).toMatchObject({
        id: facturaId,
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa Test',
        estado: 'borrador'
      });
    });
  });

  describe('DELETE /api/facturas/:id', () => {
    it('debería eliminar una factura en estado borrador', async () => {
      const nuevaFactura = {
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa a Eliminar',
        direccionFiscal: 'Calle Eliminar 123',
        importeBase: 1000.00,
        iva: 210.00
      };

      const createResponse = await request(app)
        .post('/api/facturas')
        .send(nuevaFactura)
        .expect(201);

      const facturaId = createResponse.body.id;

      await request(app)
        .delete(`/api/facturas/${facturaId}`)
        .expect(204);

      await request(app)
        .get(`/api/facturas/${facturaId}`)
        .expect(404);
    });

    it('debería rechazar eliminar una factura en estado definitivo', async () => {
      const nuevaFactura = {
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa Definitiva',
        direccionFiscal: 'Calle Definitiva 123',
        importeBase: 1000.00,
        iva: 210.00
      };

      const createResponse = await request(app)
        .post('/api/facturas')
        .send(nuevaFactura)
        .expect(201);

      const facturaId = createResponse.body.id;

      await request(app)
        .patch(`/api/facturas/${facturaId}/estado`)
        .send({ estado: 'definitivo' })
        .expect(200);

      const deleteResponse = await request(app)
        .delete(`/api/facturas/${facturaId}`)
        .expect(400);

      expect(deleteResponse.body).toHaveProperty('mensaje');
      expect(deleteResponse.body.mensaje).toMatch(/no se puede eliminar/i);
    });

    it('debería devolver 404 al eliminar una factura inexistente', async () => {
      await request(app)
        .delete('/api/facturas/550e8400-e29b-41d4-a716-446655440000')
        .expect(404);
    });
  });

  describe('PATCH /api/facturas/:id/estado', () => {
    it('debería cambiar una factura a estado definitivo y asignar número', async () => {
      const nuevaFactura = {
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa Test',
        direccionFiscal: 'Calle Test 123',
        importeBase: 1000.00,
        iva: 210.00
      };

      const createResponse = await request(app)
        .post('/api/facturas')
        .send(nuevaFactura)
        .expect(201);

      const facturaId = createResponse.body.id;
      
      const patchResponse = await request(app)
        .patch(`/api/facturas/${facturaId}/estado`)
        .send({ estado: 'definitivo' })
        .expect(200);

      expect(patchResponse.body).toMatchObject({
        id: facturaId,
        estado: 'definitivo'
      });
      expect(patchResponse.body.numero).toMatch(/^BT\d{3}$/);
      expect(patchResponse.body.fechaDefinitivo).toBeDefined();
    });

    it('debería rechazar cambiar una factura ya definitiva', async () => {
      const nuevaFactura = {
        cifCliente: 'B12345678',
        denominacionSocial: 'Empresa Test',
        direccionFiscal: 'Calle Test 123',
        importeBase: 1000.00,
        iva: 210.00
      };

      const createResponse = await request(app)
        .post('/api/facturas')
        .send(nuevaFactura)
        .expect(201);

      const facturaId = createResponse.body.id;

      await request(app)
        .patch(`/api/facturas/${facturaId}/estado`)
        .send({ estado: 'definitivo' })
        .expect(200);

      const secondPatchResponse = await request(app)
        .patch(`/api/facturas/${facturaId}/estado`)
        .send({ estado: 'definitivo' })
        .expect(400);

      expect(secondPatchResponse.body).toHaveProperty('mensaje');
    });

    it('debería mantener numeración correlativa', async () => {
      const factura1 = {
        cifCliente: 'B11111111',
        denominacionSocial: 'Empresa 1',
        direccionFiscal: 'Calle 1',
        importeBase: 100.00,
        iva: 21.00
      };

      const factura2 = {
        cifCliente: 'B22222222',
        denominacionSocial: 'Empresa 2',
        direccionFiscal: 'Calle 2',
        importeBase: 200.00,
        iva: 42.00
      };

      const response1 = await request(app)
        .post('/api/facturas')
        .send(factura1)
        .expect(201);

      const response2 = await request(app)
        .post('/api/facturas')
        .send(factura2)
        .expect(201);

      const patch1 = await request(app)
        .patch(`/api/facturas/${response1.body.id}/estado`)
        .send({ estado: 'definitivo' })
        .expect(200);

      const patch2 = await request(app)
        .patch(`/api/facturas/${response2.body.id}/estado`)
        .send({ estado: 'definitivo' })
        .expect(200);

      const numero1 = parseInt(patch1.body.numero.substring(2));
      const numero2 = parseInt(patch2.body.numero.substring(2));
      
      expect(numero2).toBe(numero1 + 1);
    });

    it('debería devolver 404 para una factura inexistente', async () => {
      await request(app)
        .patch('/api/facturas/550e8400-e29b-41d4-a716-446655440000/estado')
        .send({ estado: 'definitivo' })
        .expect(404);
    });
  });
});