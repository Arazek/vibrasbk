import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, clearDatabase, getAuthToken, getAdminToken } from './helpers';

describe('Users endpoints', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearDatabase(app);
    token = await getAuthToken(app);
  });

  describe('GET /api/users/profile', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).get('/api/users/profile').expect(401);
    });

    it('returns 401 with an invalid token', async () => {
      await request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Authorization', 'Bearer invalidtoken')
        .expect(401);
    });

    it('returns the authenticated user profile with all expected fields', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(res.body.id).toBeDefined();
      expect(res.body.alias).toBe('testuser');
      expect(res.body.applicationRole).toBe('user');
      expect(res.body.dancingRole).toBe('leader');
      expect(res.body.level).toBe('comfortable');
      expect(res.body.styles).toContain('salsa_cubana');
      expect(res.body.city).toBe('Cartagena');
    });
  });

  describe('PATCH /api/users/profile', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/profile')
        .send({ level: 'intermediate' })
        .expect(401);
    });

    it('updates the user level', async () => {
      const res = await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ level: 'intermediate' })
        .expect(200);

      expect(res.body.level).toBe('intermediate');
    });

    it('returns 400 for an invalid level value', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ level: 'expert' })
        .expect(400);
    });

    it('updates dance styles', async () => {
      const res = await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ styles: ['bachata_sensual', 'salsa_linea'] })
        .expect(200);

      expect(res.body.styles).toContain('bachata_sensual');
      expect(res.body.styles).toContain('salsa_linea');
      expect(res.body.styles).not.toContain('salsa_cubana');
    });

    it('accepts an empty styles array (no minimum on PATCH)', async () => {
      const res = await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ styles: [] })
        .expect(200);

      expect(res.body.styles).toHaveLength(0);
    });

    it('updates the fcmToken', async () => {
      const res = await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ fcmToken: 'fcm-test-token-abc123' })
        .expect(200);

      expect(res.body.fcmToken).toBe('fcm-test-token-abc123');
    });

    it('updates the academyId to a real academia', async () => {
      const adminToken = await getAdminToken(app);

      const academiaRes = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Escuela Caribe', city: 'Cartagena' })
        .expect(201);

      const res = await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ academyId: academiaRes.body.id })
        .expect(200);

      expect(res.body.academyId).toBe(academiaRes.body.id);
    });

    it('clears the academyId when set to null', async () => {
      const adminToken = await getAdminToken(app);
      const academiaRes = await request(app.getHttpServer())
        .post('/api/academias')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Escuela Caribe', city: 'Cartagena' })
        .expect(201);

      await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ academyId: academiaRes.body.id })
        .expect(200);

      const res = await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ academyId: null })
        .expect(200);

      expect(res.body.academyId).toBeFalsy();
    });

    it('rejects unknown fields (whitelist validation)', async () => {
      await request(app.getHttpServer())
        .patch('/api/users/profile')
        .set('Authorization', `Bearer ${token}`)
        .send({ unknownField: 'value' })
        .expect(400);
    });

    it('two different users each see their own profile', async () => {
      const token2 = await getAuthToken(app, {
        alias: 'seconduser',
        email: 'second@test.com',
      });

      const [res1, res2] = await Promise.all([
        request(app.getHttpServer())
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${token}`)
          .expect(200),
        request(app.getHttpServer())
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${token2}`)
          .expect(200),
      ]);

      expect(res1.body.alias).toBe('testuser');
      expect(res2.body.alias).toBe('seconduser');
      expect(res1.body.id).not.toBe(res2.body.id);
    });
  });
});
