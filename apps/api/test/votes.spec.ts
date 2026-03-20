import { INestApplication } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { createTestApp, clearDatabase, getAuthToken, getAdminToken } from './helpers';
import { toIsoWeek } from '../src/modules/events/events.service';

describe('Votes endpoints', () => {
  let app: INestApplication;
  let userToken: string;
  let adminToken: string;
  let eventId: string;

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

    // Create a venue + event to vote on
    const venueRes = await request(app.getHttpServer())
      .post('/api/venues')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ name: 'Test Venue', city: 'Cartagena', styles: ['salsa_cubana'] })
      .expect(201);

    const eventRes = await request(app.getHttpServer())
      .post('/api/events')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        venueId: venueRes.body.id,
        type: 'social',
        dayOfWeek: 5,
        startTime: '22:00',
        name: 'Viernes Social',
        styles: ['salsa_cubana'],
      })
      .expect(201);

    eventId = eventRes.body.id;
  });

  // ─── POST /api/votes ─────────────────────────────────────────────────────────

  describe('POST /api/votes', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .send({ eventId, status: 'going' })
        .expect(401);
    });

    it('casts a going vote successfully', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.status).toBe('going');
      expect(res.body.eventId).toBe(eventId);
    });

    it('casts a maybe vote successfully', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'maybe' })
        .expect(201);

      expect(res.body.status).toBe('maybe');
    });

    it('casts a not_going vote successfully', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'not_going' })
        .expect(201);

      expect(res.body.status).toBe('not_going');
    });

    it('returns 409 when voting twice for the same event in the same week', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'maybe' })
        .expect(409);
    });

    it('reflects the vote in the event detail', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      const eventRes = await request(app.getHttpServer())
        .get(`/api/events/${eventId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(eventRes.body.userVote).toBe('going');
      expect(eventRes.body.totalInterested).toBe(1);
      expect(eventRes.body.goingCount).toBe(1);
    });

    it('returns 400 for an invalid status value', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'definitely' })
        .expect(400);
    });

    it('returns 400 when status is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId })
        .expect(400);
    });

    it('returns 400 when eventId is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'going' })
        .expect(400);
    });

    it('returns 400 when eventId is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId: 'not-a-uuid', status: 'going' })
        .expect(400);
    });

    it('SQL injection in eventId is rejected by UUID validation — returns 400', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId: "'; DROP TABLE intention_votes; --", status: 'going' })
        .expect(400);
    });

    it('returns 400 for unknown fields (whitelist)', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going', extra: 'field' })
        .expect(400);
    });
  });

  // ─── PATCH /api/votes/:id ────────────────────────────────────────────────────

  describe('PATCH /api/votes/:id', () => {
    it('changes the vote status', async () => {
      const castRes = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      const voteId = castRes.body.id;

      const res = await request(app.getHttpServer())
        .patch(`/api/votes/${voteId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'maybe' })
        .expect(200);

      expect(res.body.status).toBe('maybe');
    });

    it('returns 401 without token', async () => {
      const castRes = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/votes/${castRes.body.id}`)
        .send({ status: 'maybe' })
        .expect(401);
    });

    it('returns 403 when modifying another user\'s vote', async () => {
      const otherToken = await getAuthToken(app, {
        alias: 'otheruser',
        email: 'other@test.com',
      });

      // Other user casts a vote
      const castRes = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${otherToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      // Current user tries to update it
      await request(app.getHttpServer())
        .patch(`/api/votes/${castRes.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'maybe' })
        .expect(403);
    });

    it('returns 404 for a non-existent vote id', async () => {
      await request(app.getHttpServer())
        .patch('/api/votes/00000000-0000-0000-0000-000000000000')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'maybe' })
        .expect(404);
    });

    it('returns 400 for an invalid status value', async () => {
      const castRes = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/votes/${castRes.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'super_going' })
        .expect(400);
    });

    it('returns 400 when status is missing from body', async () => {
      const castRes = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      await request(app.getHttpServer())
        .patch(`/api/votes/${castRes.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({})
        .expect(400);
    });

    it('blocks update < 2 hours before event start', async () => {
      // Create a venue for this test
      const venueRes = await request(app.getHttpServer())
        .post('/api/venues')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Cutoff Venue', city: 'Cartagena', styles: ['salsa_cubana'] })
        .expect(201);

      // Event projected to today (system dayOfWeek: 0=Mon..6=Sun), starting in 1 hour
      const jsDay = new Date().getDay(); // 0=Sun..6=Sat
      const systemDay = (jsDay + 6) % 7; // convert to 0=Mon..6=Sun
      const in1Hour = new Date(Date.now() + 60 * 60 * 1000);
      const startTime = `${String(in1Hour.getHours()).padStart(2, '0')}:${String(in1Hour.getMinutes()).padStart(2, '0')}`;

      const cutoffEventRes = await request(app.getHttpServer())
        .post('/api/events')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          venueId: venueRes.body.id,
          type: 'social',
          dayOfWeek: systemDay,
          startTime,
          name: 'Cutoff Test Event',
          styles: ['salsa_cubana'],
        })
        .expect(201);

      // Cast a vote for this near-future event
      const castRes = await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId: cutoffEventRes.body.id, status: 'going' })
        .expect(201);

      // Attempt to update within the 2-hour window — must be blocked with 403
      await request(app.getHttpServer())
        .patch(`/api/votes/${castRes.body.id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ status: 'maybe' })
        .expect(403);
    });
  });

  // ─── POST /api/votes/verify ──────────────────────────────────────────────────

  describe('POST /api/votes/verify', () => {
    const currentIsoWeek = toIsoWeek(new Date());

    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .send({ eventId, isoWeek: currentIsoWeek, attended: true })
        .expect(401);
    });

    it('submits an attended=true verification', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek, attended: true })
        .expect(201);

      expect(res.body.id).toBeDefined();
      expect(res.body.eventId).toBe(eventId);
      expect(res.body.isoWeek).toBe(currentIsoWeek);
      expect(res.body.attended).toBe(true);
    });

    it('submits an attended=false verification', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek, attended: false })
        .expect(201);

      expect(res.body.attended).toBe(false);
    });

    it('is idempotent — a second submission updates the existing record', async () => {
      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek, attended: true })
        .expect(201);

      const res = await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek, attended: false })
        .expect(201);

      // Updated, not duplicated
      expect(res.body.attended).toBe(false);
    });

    it('updates the reliability metric after verification', async () => {
      // Get current user id
      const profileRes = await request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      const userId = profileRes.body.id;

      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek, attended: true })
        .expect(201);

      const ds = app.get<DataSource>(getDataSourceToken());
      const metrics = await ds.query(
        `SELECT * FROM reliability_metrics WHERE user_id = $1`,
        [userId],
      );

      expect(metrics).toHaveLength(1);
      expect(metrics[0].total_going_votes).toBe(1);
      expect(metrics[0].confirmed_attendances).toBe(1);
      expect(Number(metrics[0].reliability)).toBe(1);
    });

    it('reliability decreases when attended=false', async () => {
      const profileRes = await request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
      const userId = profileRes.body.id;

      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek, attended: false })
        .expect(201);

      const ds = app.get<DataSource>(getDataSourceToken());
      const metrics = await ds.query(
        `SELECT * FROM reliability_metrics WHERE user_id = $1`,
        [userId],
      );

      expect(metrics[0].total_going_votes).toBe(1);
      expect(metrics[0].confirmed_attendances).toBe(0);
      expect(Number(metrics[0].reliability)).toBe(0);
    });

    it('returns 400 when eventId is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ isoWeek: currentIsoWeek, attended: true })
        .expect(400);
    });

    it('returns 400 when isoWeek is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, attended: true })
        .expect(400);
    });

    it('returns 400 when attended is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek })
        .expect(400);
    });

    it('returns 400 when eventId is not a valid UUID', async () => {
      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId: 'not-a-uuid', isoWeek: currentIsoWeek, attended: true })
        .expect(400);
    });

    it('returns 400 when attended is not a boolean', async () => {
      await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: currentIsoWeek, attended: 'yes' })
        .expect(400);
    });

    it('SQL injection in isoWeek is stored as a literal string — no 500', async () => {
      const injection = "'; DROP TABLE attendance_verifications; --";
      const res = await request(app.getHttpServer())
        .post('/api/votes/verify')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, isoWeek: injection, attended: true });

      // @IsString() passes, but data is stored as literal — no crash
      expect(res.status).toBeLessThan(500);

      // Table must still be queryable
      await request(app.getHttpServer()).get('/api/events/week')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);
    });
  });

  // ─── GET /api/events/:id/analytics ──────────────────────────────────────────

  describe('GET /api/events/:id/analytics', () => {
    it('returns 401 without token', async () => {
      await request(app.getHttpServer())
        .get(`/api/events/${eventId}/analytics`)
        .expect(401);
    });

    it('returns 401 if user has not voted at all', async () => {
      await request(app.getHttpServer())
        .get(`/api/events/${eventId}/analytics`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(401);
    });

    it('returns 401 if user voted not_going', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'not_going' })
        .expect(201);

      await request(app.getHttpServer())
        .get(`/api/events/${eventId}/analytics`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(401);
    });

    it('returns analytics after casting a going vote', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      const res = await request(app.getHttpServer())
        .get(`/api/events/${eventId}/analytics`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('estimatedAttendance');
      expect(res.body).toHaveProperty('vibe');
      expect(res.body).toHaveProperty('roleBalance');
      expect(res.body).toHaveProperty('levelDistribution');
      expect(res.body).toHaveProperty('recommendation');
      expect(typeof res.body.estimatedAttendance).toBe('number');
    });

    it('returns analytics after casting a maybe vote', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'maybe' })
        .expect(201);

      const res = await request(app.getHttpServer())
        .get(`/api/events/${eventId}/analytics`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body).toHaveProperty('estimatedAttendance');
    });

    it('analytics roleBalance has expected shape', async () => {
      await request(app.getHttpServer())
        .post('/api/votes')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ eventId, status: 'going' })
        .expect(201);

      const res = await request(app.getHttpServer())
        .get(`/api/events/${eventId}/analytics`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(res.body.roleBalance).toHaveProperty('leadersPercent');
      expect(res.body.roleBalance).toHaveProperty('followersPercent');
      expect(res.body.roleBalance).toHaveProperty('balance');
    });
  });
});
