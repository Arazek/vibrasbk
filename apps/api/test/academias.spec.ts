import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, clearDatabase, getAuthToken, getAdminToken } from './helpers';

describe('Academias endpoints', () => {
  let app: INestApplication;
  let userToken: string;
  let adminToken: string;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearDatabase(app);
    userToken = await getAuthToken(app);
    adminToken = await getAdminToken(app);
  });

  const newAcademia = { name: 'Escuela Salsa CTG', city: 'Cartagena' };

  // ─── GET /api/academias ──────────────────────────────────────────────────────

  describe('GET /api/academias', () => {
    it('is public — returns 200 without a token', async () => {
      await request(app.getHttpServer()).get('/api/academias').expect(200);
    });

    it('returns an empty array when no academias exist', async () => {
      const res = await request(app.getHttpServer()).get('/api/academias').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body).toHaveLength(0);
    });

    it('also returns 200 with a valid user token', async () => {
      await request(app.getHttpServer())
        .get('/api/academias')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });

    it('each academia has id, name, city fields', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newAcademia)
        .expect(201);

      const res = await request(app.getHttpServer()).get('/api/academias').expect(200);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('city');
    });

    it('returns academias ordered by name ascending', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Zumba Studio', city: 'Cartagena' })
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Academia Bachata' })
        .expect(201);

      const res = await request(app.getHttpServer()).get('/api/academias').expect(200);
      expect(res.body).toHaveLength(2);
      expect(res.body[0].name).toBe('Academia Bachata');
      expect(res.body[1].name).toBe('Zumba Studio');
    });
  });

  // ─── POST /api/academias ─────────────────────────────────────────────────────

  describe('POST /api/academias', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).post('/api/academias').send(newAcademia).expect(401);
    });

    it('returns 401 with an invalid token', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', 'Bearer invalidtoken')
        .send(newAcademia)
        .expect(401);
    });

    it('returns 403 for a regular user', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newAcademia)
        .expect(403);
    });

    it('admin creates an academia with name and city', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newAcademia)
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBe(newAcademia.name);
      expect(res.body.city).toBe(newAcademia.city);
    });

    it('city is optional — creates with name only', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Solo Nombre' })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBe('Solo Nombre');
    });

    it('returns 400 when name is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ city: 'Cartagena' })
        .expect(400);
    });

    it('returns 400 when body is empty', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({})
        .expect(400);
    });

    it('returns 400 when name is not a string', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 123 })
        .expect(400);
    });

    it('returns 400 for unknown fields (whitelist)', async () => {
      await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Valid', unknownField: 'x' })
        .expect(400);
    });

    it('SQL injection in name is stored as a literal string — table is not dropped', async () => {
      const injection = "'; DROP TABLE academia; --";
      const res = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: injection, city: 'Cartagena' })
        .expect(201);

      expect(res.body.name).toBe(injection);

      // The table must still exist and remain queryable after the injection attempt
      const listRes = await request(app.getHttpServer()).get('/api/academias').expect(200);
      expect(listRes.body.some((a: any) => a.name === injection)).toBe(true);
    });

    it('SQL injection in city is stored as a literal string', async () => {
      const injection = "' OR '1'='1";
      const res = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Safe Name', city: injection })
        .expect(201);

      expect(res.body.city).toBe(injection);
    });

    it('XSS payload in name is stored as a literal string, not interpreted', async () => {
      const xss = '<script>alert("xss")</script>';
      const res = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: xss })
        .expect(201);

      // Must be stored verbatim — sanitization is the frontend's responsibility
      expect(res.body.name).toBe(xss);
    });
  });

  // ─── PATCH /api/academias/:id ────────────────────────────────────────────────

  describe('PATCH /api/academias/:id', () => {
    let academiaId: string;

    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newAcademia)
        .expect(201);
      academiaId = res.body.id;
    });

    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .patch(`/api/academias/${academiaId}`)
        .send({ name: 'Updated' })
        .expect(401);
    });

    it('returns 403 for a regular user', async () => {
      await request(app.getHttpServer())
        .patch(`/api/academias/${academiaId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Updated' })
        .expect(403);
    });

    it('admin updates the name', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/academias/${academiaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Nuevo Nombre' })
        .expect(200);

      expect(res.body.name).toBe('Nuevo Nombre');
      expect(res.body.id).toBe(academiaId);
    });

    it('admin updates the city', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/academias/${academiaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ city: 'Bogotá' })
        .expect(200);

      expect(res.body.city).toBe('Bogotá');
    });

    it('returns 404 for a non-existent id', async () => {
      await request(app.getHttpServer())
        .patch('/api/academias/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Ghost' })
        .expect(404);
    });

    it('SQL injection in path param never causes a 500', async () => {
      const res = await request(app.getHttpServer())
        .patch("/api/academias/'; DROP TABLE academia; --")
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Injected' });

      expect(res.status).toBeLessThan(500);
    });
  });

  // ─── DELETE /api/academias/:id ───────────────────────────────────────────────

  describe('DELETE /api/academias/:id', () => {
    let academiaId: string;

    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newAcademia)
        .expect(201);
      academiaId = res.body.id;
    });

    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).delete(`/api/academias/${academiaId}`).expect(401);
    });

    it('returns 403 for a regular user', async () => {
      await request(app.getHttpServer())
        .delete(`/api/academias/${academiaId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });

    it('admin deletes an academia and it disappears from the list', async () => {
      await request(app.getHttpServer())
        .delete(`/api/academias/${academiaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const listRes = await request(app.getHttpServer()).get('/api/academias').expect(200);
      expect(listRes.body.map((a: any) => a.id)).not.toContain(academiaId);
    });

    it('returns 404 when deleting a non-existent id', async () => {
      await request(app.getHttpServer())
        .delete('/api/academias/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    it('returns 404 when deleting the same academia twice', async () => {
      await request(app.getHttpServer())
        .delete(`/api/academias/${academiaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/api/academias/${academiaId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
