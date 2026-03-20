import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { ApplicationRole } from '../src/modules/users/entities/user.entity';

// ─── App lifecycle ────────────────────────────────────────────────────────────

export async function createTestApp(): Promise<INestApplication> {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = module.createNestApplication();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  await app.init();
  return app;
}

// ─── Database helpers ─────────────────────────────────────────────────────────

/** Clears all application tables in FK-safe order. */
export async function clearDatabase(app: INestApplication): Promise<void> {
  const ds = app.get<DataSource>(getDataSourceToken());
  await ds.query('DELETE FROM intention_votes');
  await ds.query('DELETE FROM attendance_verifications');
  await ds.query('DELETE FROM reliability_metrics');
  await ds.query('DELETE FROM recurring_events');
  await ds.query('DELETE FROM venues');
  await ds.query('DELETE FROM users');
  await ds.query('DELETE FROM dance_style');
  await ds.query('DELETE FROM academia');
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

const DEFAULT_USER = {
  alias: 'testuser',
  email: 'test@test.com',
  password: 'password123',
  dancingRole: 'leader',
  level: 'comfortable',
  styles: ['salsa_cubana'],
};

const ADMIN_USER = {
  alias: 'adminuser',
  email: 'admin@test.com',
  password: 'password123',
  dancingRole: 'leader',
  level: 'intermediate',
  styles: ['bachata_sensual'],
};

/** Registers a user and returns their JWT token. */
export async function getAuthToken(
  app: INestApplication,
  overrides: Partial<typeof DEFAULT_USER> = {},
): Promise<string> {
  const payload = { ...DEFAULT_USER, ...overrides };
  const res = await request(app.getHttpServer())
    .post('/api/auth/register')
    .send(payload)
    .expect(201);
  return res.body.accessToken;
}

/** Registers an admin user, promotes them in the DB, and returns their JWT token. */
export async function getAdminToken(app: INestApplication): Promise<string> {
  const res = await request(app.getHttpServer())
    .post('/api/auth/register')
    .send(ADMIN_USER)
    .expect(201);

  const ds = app.get<DataSource>(getDataSourceToken());
  await ds.query(
    `UPDATE users SET application_role = $1 WHERE email = $2`,
    [ApplicationRole.ADMIN, ADMIN_USER.email],
  );

  // JWT strategy loads the user from DB on each request, so the original
  // token is sufficient — no re-login needed after the role update.
  return res.body.accessToken;
}
