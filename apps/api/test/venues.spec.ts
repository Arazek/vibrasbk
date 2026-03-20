import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, clearDatabase, getAuthToken, getAdminToken } from './helpers';

describe('Venues endpoints', () => {
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

  const newVenue = {
    name: 'La Havana',
    city: 'Cartagena',
    lat: 10.39,
    lng: -75.48,
    maxCapacity: 100,
    styles: ['salsa_cubana', 'bachata_sensual'],
  };

  // ─── GET /api/venues ─────────────────────────────────────────────────────────

  describe('GET /api/venues', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).get('/api/venues').expect(401);
    });

    it('returns a list of venues', async () => {
      await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/venues')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
    });

    it('returns an empty array when no venues exist', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/venues')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body).toEqual([]);
    });
  });

  // ─── GET /api/venues/:id ─────────────────────────────────────────────────────

  describe('GET /api/venues/:id', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .get('/api/venues/00000000-0000-0000-0000-000000000000')
        .expect(401);
    });

    it('returns the venue by id with all fields', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      const res = await request(app.getHttpServer())
        .get(`/api/venues/${created.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.id).toBe(created.body.id);
      expect(res.body.name).toBe('La Havana');
      expect(res.body.city).toBe('Cartagena');
      expect(res.body.maxCapacity).toBe(100);
    });

    it('returns null body for a non-existent id (service returns null → 200 empty)', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/venues/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body).toEqual({});
    });

    it('SQL injection in path param never causes a 500', async () => {
      const res = await request(app.getHttpServer())
        .get("/api/venues/'; DROP TABLE venues; --")
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBeLessThan(500);
    });
  });

  // ─── POST /api/venues ────────────────────────────────────────────────────────

  describe('POST /api/venues', () => {
    it('returns 403 for regular users', async () => {
      await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newVenue)
        .expect(403);
    });

    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).post('/api/venues').send(newVenue).expect(401);
    });

    it('creates a venue as admin', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBe('La Havana');
      expect(res.body.city).toBe('Cartagena');
      expect(res.body.maxCapacity).toBe(100);
    });

    it('returns 400 for missing required fields', async () => {
      await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ city: 'Cartagena' })
        .expect(400);
    });

    it('returns 400 when body is empty', async () => {
      await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({})
        .expect(400);
    });

    it('returns 400 for unknown fields (whitelist)', async () => {
      await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...newVenue, secretField: 'hacked' })
        .expect(400);
    });

    it('SQL injection in name is stored as a literal string — table is not dropped', async () => {
      const injection = "'; DROP TABLE venues; --";
      const res = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: injection, city: 'Cartagena', styles: ['salsa_cubana'] })
        .expect(201);

      expect(res.body.name).toBe(injection);

      // Table must still exist and be queryable
      await request(app.getHttpServer())
        .get('/api/venues')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  // ─── PATCH /api/venues/:id ───────────────────────────────────────────────────

  describe('PATCH /api/venues/:id', () => {
    it('updates a venue as admin', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      const res = await request(app.getHttpServer())
        .patch(`/api/venues/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ maxCapacity: 200 })
        .expect(200);

      expect(res.body.maxCapacity).toBe(200);
    });

    it('returns 403 for regular users', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/venues/${created.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ maxCapacity: 200 })
        .expect(403);
    });

    it('returns 401 without token', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/venues/${created.body.id}`)
        .send({ maxCapacity: 200 })
        .expect(401);
    });
  });

  // ─── DELETE /api/venues/:id ──────────────────────────────────────────────────

  describe('DELETE /api/venues/:id', () => {
    it('deletes a venue as admin', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/api/venues/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .get('/api/venues')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200)
        .then((res) => {
          const ids = res.body.map((v: any) => v.id);
          expect(ids).not.toContain(created.body.id);
        });
    });

    it('returns 403 for regular users', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/api/venues/${created.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });

    it('returns 401 without token', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newVenue)
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/api/venues/${created.body.id}`)
        .expect(401);
    });
  });
});
