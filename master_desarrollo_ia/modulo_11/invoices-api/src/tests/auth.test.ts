import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { Application } from 'express';
import { createApp } from '../app';

describe('API de Autenticación', () => {
  let app: Application;

  beforeEach(() => {
    app = createApp();
  });

  describe('GET /api/test/protected', () => {
    it('debería rechazar acceso sin token', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .expect(401);

      expect(response.body).toEqual({
        error: 'Token de autorización requerido'
      });
    });

    it('debería rechazar acceso con token inválido', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .set('Authorization', 'Bearer token-incorrecto')
        .expect(401);

      expect(response.body).toEqual({
        error: 'Token inválido'
      });
    });

    it('debería permitir acceso con token válido (formato Bearer)', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .set('Authorization', 'Bearer test-token-123')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Acceso exitoso a endpoint protegido');
      expect(response.body).toHaveProperty('timestamp');
      expect(typeof response.body.timestamp).toBe('string');
    });

    it('debería permitir acceso con token válido (formato directo)', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .set('Authorization', 'test-token-123')
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Acceso exitoso a endpoint protegido');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('debería devolver timestamp válido en formato ISO', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .set('Authorization', 'Bearer test-token-123')
        .expect(200);

      const timestamp = response.body.timestamp;
      expect(() => new Date(timestamp).toISOString()).not.toThrow();
      expect(new Date(timestamp).toISOString()).toBe(timestamp);
    });

    it('debería rechazar header Authorization vacío', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .set('Authorization', '')
        .expect(401);

      expect(response.body).toEqual({
        error: 'Token de autorización requerido'
      });
    });

    it('debería rechazar header Authorization solo con Bearer', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .set('Authorization', 'Bearer ')
        .expect(401);

      expect(response.body).toEqual({
        error: 'Token inválido'
      });
    });

    it('debería rechazar token con espacios extra', async () => {
      const response = await request(app)
        .get('/api/test/protected')
        .set('Authorization', 'Bearer  test-token-123  ')
        .expect(401);

      expect(response.body).toEqual({
        error: 'Token inválido'
      });
    });
  });
});