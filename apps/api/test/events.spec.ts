import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, clearDatabase, getAuthToken, getAdminToken } from './helpers';

describe('Events endpoints', () => {
  let app: INestApplication;
  let userToken: string;
  let adminToken: string;
  let venueId: string;

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

    // Create a venue to use in event tests
    const venueRes = await request(app.getHttpServer())
      .post('/api/venues')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Venue', city: 'Cartagena', styles: ['salsa_cubana'] })
      .expect(201);
    venueId = venueRes.body.id;
  });

  const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const socialEventPayload = () => ({
    venueId,
    type: 'social',
    dayOfWeek: 5,
    startTime: '22:00',
    name: 'Viernes Social',
    styles: ['salsa_cubana'],
    workshopIncluded: false,
    entryPrice: 10,
  });

  const intensiveEventPayload = () => ({
    venueId,
    type: 'intensive',
    startDate: todayStr(),
    startTime: '10:00',
    title: 'Bachata Intensive',
    level: 'intermediate',
    price: 50,
    styles: ['bachata_sensual'],
  });

  const congressEventPayload = () => ({
    venueId,
    type: 'congress',
    startDate: todayStr(),
    startTime: '09:00',
    title: 'Cartagena Salsa Congress',
    locality: 'Cartagena',
    durationDays: 3,
    prices: JSON.stringify([{ label: 'Full Pass', price: 120 }]),
    websiteUrl: 'https://example.com/congress',
    styles: ['salsa_cubana', 'salsa_linea'],
  });

  // ─── GET /api/events/week ────────────────────────────────────────────────────

  describe('GET /api/events/week', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer()).get('/api/events/week').expect(401);
    });

    it('returns an array of events for the current week', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/events/week')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);

      const event = res.body[0];
      expect(event).toHaveProperty('id');
      expect(event).toHaveProperty('totalInterested');
      expect(event).toHaveProperty('vibeColor');
      expect(event).toHaveProperty('userVote');
      expect(event.userVote).toBeNull();
    });

    it('filters by type=social — only returns social events', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(intensiveEventPayload())
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/events/week?type=social')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      // We created 1 social + 1 intensive — filter must return only the social one
      expect(res.body).toHaveLength(1);
      // Social events have no 'title' (that field belongs to intensive/congress)
      expect(res.body[0].title).toBeUndefined();
    });

    it('filters by type=intensive — only returns intensive events', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(intensiveEventPayload())
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/events/week?type=intensive')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(1);
    });

    it('unknown type value returns an empty array — not a 400 or 500', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/events/week?type=unknown_type')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body).toEqual([]);
    });

    it('SQL injection in type query param returns empty array — never a 500', async () => {
      const res = await request(app.getHttpServer())
        .get("/api/events/week?type='; DROP TABLE recurring_events; --")
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      // type is used only as a key in a static classMap, never in raw SQL
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  // ─── GET /api/events/:id ─────────────────────────────────────────────────────

  describe('GET /api/events/:id', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .get('/api/events/00000000-0000-0000-0000-000000000000')
        .expect(401);
    });

    it('returns null body for non-existent event (API documents this as a gap — not 404)', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/events/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body).toEqual({});
    });

    it('returns event detail with vote data', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      const res = await request(app.getHttpServer())
        .get(`/api/events/${created.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.id).toBe(created.body.id);
      expect(res.body.totalInterested).toBe(0);
      expect(res.body.userVote).toBeNull();
    });

    it('SQL injection in path param never causes a 500', async () => {
      const res = await request(app.getHttpServer())
        .get("/api/events/'; DROP TABLE recurring_events; --")
        .set('Authorization', `Bearer ${userToken}`);

      expect(res.status).toBeLessThan(500);
    });
  });

  // ─── POST /api/events ────────────────────────────────────────────────────────

  describe('POST /api/events', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .send(socialEventPayload())
        .expect(401);
    });

    it('returns 403 for regular users', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${userToken}`)
        .send(socialEventPayload())
        .expect(403);
    });

    it('creates a recurring social event as admin', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.name).toBe('Viernes Social');
      expect(res.body.dayOfWeek).toBe(5);
      expect(res.body.startTime).toBe('22:00');
    });

    it('creates a one-time intensive event as admin', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(intensiveEventPayload())
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe('Bachata Intensive');
    });

    it('creates a congress event as admin', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(congressEventPayload())
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.title).toBe('Cartagena Salsa Congress');
      expect(res.body.locality).toBe('Cartagena');
      expect(res.body.durationDays).toBe(3);
      expect(res.body.websiteUrl).toBe('https://example.com/congress');
    });

    it('congress event appears in the weekly list', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(congressEventPayload())
        .expect(201);

      const res = await request(app.getHttpServer())
        .get('/api/events/week')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.some((e: any) => e.title === 'Cartagena Salsa Congress')).toBe(true);
    });

    it('returns 400 for missing required venueId', async () => {
      const { venueId: _omit, ...noVenue } = socialEventPayload();
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(noVenue)
        .expect(400);
    });

    it('returns 400 for an invalid type value', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...socialEventPayload(), type: 'fiesta' })
        .expect(400);
    });

    it('returns 400 for dayOfWeek below minimum (< 0)', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...socialEventPayload(), dayOfWeek: -1 })
        .expect(400);
    });

    it('returns 400 for dayOfWeek above maximum (> 6)', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...socialEventPayload(), dayOfWeek: 7 })
        .expect(400);
    });

    it('returns 400 for unknown fields (whitelist)', async () => {
      await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...socialEventPayload(), hackField: 'injected' })
        .expect(400);
    });

    it('SQL injection in name is stored as a literal string', async () => {
      const injection = "'; DROP TABLE recurring_events; --";
      const res = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ...socialEventPayload(), name: injection })
        .expect(201);

      expect(res.body.name).toBe(injection);

      // Events table must still exist and be queryable
      await request(app.getHttpServer())
        .get('/api/events/week')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  // ─── PATCH /api/events/:id ───────────────────────────────────────────────────

  describe('PATCH /api/events/:id', () => {
    it('updates an event as admin', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      const res = await request(app.getHttpServer())
        .patch(`/api/events/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ entryPrice: 15 })
        .expect(200);

      expect(res.body.entryPrice).toBe(15);
    });

    it('returns 403 for a regular user', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/events/${created.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ entryPrice: 15 })
        .expect(403);
    });

    it('returns 401 without token', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/events/${created.body.id}`)
        .send({ entryPrice: 15 })
        .expect(401);
    });

    it('returns 404 for a non-existent event id', async () => {
      await request(app.getHttpServer())
        .patch('/api/events/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ entryPrice: 15 })
        .expect(404);
    });
  });

  // ─── DELETE /api/events/:id ──────────────────────────────────────────────────

  describe('DELETE /api/events/:id', () => {
    it('soft-deletes an event as admin', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/api/events/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      // Event should no longer appear in weekly list
      const weekRes = await request(app.getHttpServer())
        .get('/api/events/week')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      const ids = weekRes.body.map((e: any) => e.id);
      expect(ids).not.toContain(created.body.id);
    });

    it('returns 403 for a regular user', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/api/events/${created.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });

    it('returns 401 without token', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/api/events/${created.body.id}`)
        .expect(401);
    });

    it('returns 404 for a non-existent event id', async () => {
      await request(app.getHttpServer())
        .delete('/api/events/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    it('returns 404 when soft-deleting the same event twice', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .delete(`/api/events/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      // Second delete — event no longer active, findOne returns null → 404
      await request(app.getHttpServer())
        .delete(`/api/events/${created.body.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  // ─── POST /api/events/:id/photo ──────────────────────────────────────────────

  describe('POST /api/events/:id/photo', () => {
    it('returns 401 without token', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .post(`/api/events/${created.body.id}/photo`)
        .expect(401);
    });

    it('returns 403 for a regular user', async () => {
      const created = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(socialEventPayload())
        .expect(201);

      await request(app.getHttpServer())
        .post(`/api/events/${created.body.id}/photo`)
        .set('Authorization', `Bearer ${userToken}`)
        .attach('file', Buffer.from('fake image'), 'photo.jpg')
        .expect(403);
    });

    it.todo('admin uploads a photo and photoUrl is persisted (requires uploads directory on disk)');
  });
});
