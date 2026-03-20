import { INestApplication } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { ApplicationRole } from '../src/modules/users/entities/user.entity';
import { createTestApp, clearDatabase } from './helpers';

describe('Auth endpoints', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await clearDatabase(app);
  });

  const validUser = {
    alias: 'salsaking',
    email: 'salsa@test.com',
    password: 'password123',
    dancingRole: 'leader',
    level: 'comfortable',
    styles: ['salsa_cubana'],
  };

  describe('POST /api/auth/register — onboarding flow', () => {
    describe('happy path', () => {
      it('returns a JWT token and full user object on success', async () => {
        const res = await request(app.getHttpServer())
          .post('/api/auth/register')
          .send(validUser)
          .expect(201);

        expect(res.body.accessToken).toBeDefined();
        expect(typeof res.body.accessToken).toBe('string');

        const { user } = res.body;
        expect(user.id).toBeDefined();
        expect(user.alias).toBe(validUser.alias);
        expect(user.email).toBeUndefined(); // email must not be exposed
        expect(user.applicationRole).toBe('user');
        expect(user.dancingRole).toBe('leader');
        expect(user.level).toBe('comfortable');
        expect(user.styles).toEqual(['salsa_cubana']);
        expect(user.city).toBe('Cartagena'); // default city
        expect(user.createdAt).toBeDefined();
        expect(user.updatedAt).toBeDefined();
      });

      it('returned token grants access to protected endpoints', async () => {
        const res = await request(app.getHttpServer())
          .post('/api/auth/register')
          .send(validUser)
          .expect(201);

        await request(app.getHttpServer())
          .get('/api/users/profile')
          .set('Authorization', `Bearer ${res.body.accessToken}`)
          .expect(200);
      });

      it('registers with multiple styles', async () => {
        const res = await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, styles: ['salsa_cubana', 'bachata_sensual', 'salsa_linea'] })
          .expect(201);

        expect(res.body.user.styles).toHaveLength(3);
        expect(res.body.user.styles).toContain('bachata_sensual');
      });

      it.each([
        ['leader'],
        ['follower'],
        ['switch'],
      ])('accepts dancing role: %s', async (dancingRole) => {
        const res = await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, alias: `user_${dancingRole}`, email: `${dancingRole}@test.com`, dancingRole })
          .expect(201);

        expect(res.body.user.dancingRole).toBe(dancingRole);
      });

      it.each([
        ['beginner'],
        ['initiation'],
        ['comfortable'],
        ['intermediate'],
        ['advanced'],
      ])('accepts level: %s', async (level) => {
        const res = await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, alias: `user_${level}`, email: `${level}@test.com`, level })
          .expect(201);

        expect(res.body.user.level).toBe(level);
      });

      it('registers with an academyId and returns it in the response', async () => {
        // Create an academia first
        const adminUser = {
          alias: 'adminreg',
          email: 'adminreg@test.com',
          password: 'password123',
          dancingRole: 'leader',
          level: 'advanced',
          styles: ['bachata_sensual'],
        };
        const adminRes = await request(app.getHttpServer())
          .post('/api/auth/register')
          .send(adminUser)
          .expect(201);

        const ds = app.get<DataSource>(getDataSourceToken());
        await ds.query(`UPDATE users SET application_role = $1 WHERE email = $2`, [
          ApplicationRole.ADMIN,
          adminUser.email,
        ]);
        const adminToken = adminRes.body.accessToken;

        const academiaRes = await request(app.getHttpServer())
          .post('/api/academias')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({ name: 'Escuela Salsa', city: 'Cartagena' })
          .expect(201);

        const academiaId = academiaRes.body.id;

        const res = await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, academyId: academiaId })
          .expect(201);

        expect(res.body.user.academyId).toBe(academiaId);
      });

      it('password with exactly 6 characters is accepted', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, password: 'abc123' })
          .expect(201);
      });
    });

    describe('input validation', () => {
      it('returns 400 when all fields are missing', async () => {
        await request(app.getHttpServer()).post('/api/auth/register').send({}).expect(400);
      });

      it('returns 400 when alias is missing', async () => {
        const { alias: _omit, ...noAlias } = validUser;
        await request(app.getHttpServer()).post('/api/auth/register').send(noAlias).expect(400);
      });

      it('returns 400 when email is missing', async () => {
        const { email: _omit, ...noEmail } = validUser;
        await request(app.getHttpServer()).post('/api/auth/register').send(noEmail).expect(400);
      });

      it('returns 400 for invalid email format', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, email: 'not-an-email' })
          .expect(400);
      });

      it('returns 400 when password is shorter than 6 characters', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, password: 'short' })
          .expect(400);
      });

      it('returns 400 when dancingRole is missing', async () => {
        const { dancingRole: _omit, ...noDancingRole } = validUser;
        await request(app.getHttpServer()).post('/api/auth/register').send(noDancingRole).expect(400);
      });

      it('returns 400 for invalid dancingRole', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, dancingRole: 'maestro' })
          .expect(400);
      });

      it('returns 400 when level is missing', async () => {
        const { level: _omit, ...noLevel } = validUser;
        await request(app.getHttpServer()).post('/api/auth/register').send(noLevel).expect(400);
      });

      it('returns 400 for invalid level', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, level: 'expert' })
          .expect(400);
      });

      it('returns 400 when styles is missing', async () => {
        const { styles: _omit, ...noStyles } = validUser;
        await request(app.getHttpServer()).post('/api/auth/register').send(noStyles).expect(400);
      });

      it('returns 400 when styles is an empty array', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, styles: [] })
          .expect(400);
      });

      it('returns 400 when styles is not an array', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, styles: 'salsa_cubana' })
          .expect(400);
      });
    });

    describe('uniqueness constraints', () => {
      beforeEach(async () => {
        await request(app.getHttpServer()).post('/api/auth/register').send(validUser).expect(201);
      });

      it('returns 409 when alias is already taken', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, email: 'different@test.com' })
          .expect(409);
      });

      it('returns 409 when email is already registered', async () => {
        await request(app.getHttpServer())
          .post('/api/auth/register')
          .send({ ...validUser, alias: 'differentalias' })
          .expect(409);
      });
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app.getHttpServer()).post('/api/auth/register').send(validUser).expect(201);
    });

    it('returns a token and user object with valid credentials', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: validUser.email, password: validUser.password })
        .expect(201);

      expect(res.body.accessToken).toBeDefined();
      expect(res.body.user.alias).toBe(validUser.alias);
      expect(res.body.user.applicationRole).toBe('user');
    });

    it('returned login token grants access to protected endpoints', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: validUser.email, password: validUser.password })
        .expect(201);

      await request(app.getHttpServer())
        .get('/api/users/profile')
        .set('Authorization', `Bearer ${res.body.accessToken}`)
        .expect(200);
    });

    it('returns 401 for wrong password', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: validUser.email, password: 'wrongpassword' })
        .expect(401);
    });

    it('returns 401 for unknown email', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({ email: 'nobody@test.com', password: 'password123' })
        .expect(401);
    });

    it('returns 400 when body is empty (LoginDto now validates before reaching the service)', async () => {
      await request(app.getHttpServer())
        .post('/api/auth/login')
        .send({})
        .expect(400);
    });
  });
});
