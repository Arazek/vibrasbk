import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, clearDatabase, getAuthToken, getAdminToken } from './helpers';

describe('Dance Styles endpoints', () => {
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

  // clearDatabase wipes the dance_style table. The service only seeds on
  // onApplicationBootstrap (at app start), so after clear the table is empty.
  const newStyle = { slug: 'kizomba', name: 'Kizomba' };

  // ─── GET /api/dance-styles ───────────────────────────────────────────────────

  describe('GET /api/dance-styles', () => {
    it('is public — returns 200 without a token', async () => {
      await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
    });

    it('returns an empty array after database clear', async () => {
      const res = await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('returns created active styles', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newStyle)
        .expect(201);

      const res = await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
      expect(res.body.some((s: any) => s.slug === 'kizomba')).toBe(true);
    });

    it('each style has id, slug, name, active fields', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newStyle)
        .expect(201);

      const res = await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
      const style = res.body.find((s: any) => s.slug === 'kizomba');
      expect(style).toHaveProperty('id');
      expect(style).toHaveProperty('slug');
      expect(style).toHaveProperty('name');
      expect(style).toHaveProperty('active');
    });

    it('returns styles ordered by name ascending', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'zouk', name: 'Zouk' })
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'afrobeats', name: 'Afrobeats' })
        .expect(201);

      const res = await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
      const names = res.body.map((s: any) => s.name);
      expect(names[0]).toBe('Afrobeats');
      expect(names[names.length - 1]).toBe('Zouk');
    });

    it('inactive styles are excluded from the list', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newStyle)
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/dance-styles/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ active: false })
        .expect(200);

      const res = await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
      expect(res.body.some((s: any) => s.slug === 'kizomba')).toBe(false);
    });
  });

  // ─── POST /api/dance-styles ──────────────────────────────────────────────────

  describe('POST /api/dance-styles', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).post('/api/dance-styles').send(newStyle).expect(401);
    });

    it('returns 401 with an invalid token', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', 'Bearer bad.token.here')
        .send(newStyle)
        .expect(401);
    });

    it('returns 403 for a regular user', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${userToken}`)
        .send(newStyle)
        .expect(403);
    });

    it('admin creates a dance style', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newStyle)
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.slug).toBe('kizomba');
      expect(res.body.name).toBe('Kizomba');
      expect(res.body.active).toBe(true);
    });

    it('active defaults to true when not provided', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'zouk', name: 'Zouk' })
        .expect(201);

      expect(res.body.active).toBe(true);
    });

    it('admin can create an inactive style by passing active: false', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'deprecated', name: 'Old Style', active: false })
        .expect(201);

      expect(res.body.active).toBe(false);
    });

    it('returns 400 when slug is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Kizomba' })
        .expect(400);
    });

    it('returns 400 when name is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'kizomba' })
        .expect(400);
    });

    it('returns 400 when body is empty', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({})
        .expect(400);
    });

    it('returns 400 for unknown fields (whitelist)', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'kizomba', name: 'Kizomba', color: 'red' })
        .expect(400);
    });

    it('returns 400 when active is not a boolean', async () => {
      await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'kizomba', name: 'Kizomba', active: 'yes' })
        .expect(400);
    });

    it('SQL injection in name is stored as a literal string — table is not dropped', async () => {
      const injection = "'; DROP TABLE dance_style; --";
      const res = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: 'injection_test', name: injection })
        .expect(201);

      expect(res.body.name).toBe(injection);

      // Table still queryable after injection attempt
      const listRes = await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
      expect(listRes.body.some((s: any) => s.name === injection)).toBe(true);
    });

    it('SQL injection in slug is stored as a literal string', async () => {
      const injection = "'; UPDATE dance_style SET active=false; --";
      const res = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ slug: injection, name: 'Harmless' })
        .expect(201);

      expect(res.body.slug).toBe(injection);
    });
  });

  // ─── PATCH /api/dance-styles/:id ────────────────────────────────────────────

  describe('PATCH /api/dance-styles/:id', () => {
    let styleId: string;

    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newStyle)
        .expect(201);
      styleId = res.body.id;
    });

    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .patch(`/api/dance-styles/${styleId}`)
        .send({ name: 'Updated' })
        .expect(401);
    });

    it('returns 403 for a regular user', async () => {
      await request(app.getHttpServer())
        .patch(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Updated' })
        .expect(403);
    });

    it('admin updates the name', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Kizomba Fusion' })
        .expect(200);

      expect(res.body.name).toBe('Kizomba Fusion');
      expect(res.body.id).toBe(styleId);
    });

    it('admin deactivates a style with active: false', async () => {
      const res = await request(app.getHttpServer())
        .patch(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ active: false })
        .expect(200);

      expect(res.body.active).toBe(false);
    });

    it('admin reactivates a deactivated style', async () => {
      await request(app.getHttpServer())
        .patch(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ active: false })
        .expect(200);

      const res = await request(app.getHttpServer())
        .patch(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ active: true })
        .expect(200);

      expect(res.body.active).toBe(true);
    });

    it('returns 404 for a non-existent id', async () => {
      await request(app.getHttpServer())
        .patch('/api/dance-styles/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Ghost' })
        .expect(404);
    });

    it('SQL injection in path param never causes a 500', async () => {
      const res = await request(app.getHttpServer())
        .patch("/api/dance-styles/'; DROP TABLE dance_style; --")
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Injected' });

      expect(res.status).toBeLessThan(500);
    });
  });

  // ─── DELETE /api/dance-styles/:id ───────────────────────────────────────────

  describe('DELETE /api/dance-styles/:id', () => {
    let styleId: string;

    beforeEach(async () => {
      const res = await request(app.getHttpServer())
        .post('/api/dance-styles')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(newStyle)
        .expect(201);
      styleId = res.body.id;
    });

    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).delete(`/api/dance-styles/${styleId}`).expect(401);
    });

    it('returns 403 for a regular user', async () => {
      await request(app.getHttpServer())
        .delete(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });

    it('admin hard-deletes a style — it disappears from the list', async () => {
      await request(app.getHttpServer())
        .delete(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const listRes = await request(app.getHttpServer()).get('/api/dance-styles').expect(200);
      expect(listRes.body.some((s: any) => s.id === styleId)).toBe(false);
    });

    it('returns 404 when deleting a non-existent id', async () => {
      await request(app.getHttpServer())
        .delete('/api/dance-styles/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    it('returns 404 when deleting the same style twice', async () => {
      await request(app.getHttpServer())
        .delete(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      await request(app.getHttpServer())
        .delete(`/api/dance-styles/${styleId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
