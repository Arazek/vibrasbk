import { MigrationInterface, QueryRunner } from 'typeorm';

/**
 * Covers two schema gaps not addressed by earlier migrations:
 *
 * 1. users.rol (single column, enum: leader|follower|switch|admin) →
 *      dancing_role (enum: leader|follower|switch)
 *    + application_role (enum: user|admin|superadmin)
 *    Data is preserved: rol='admin' → application_role='admin', dancing_role='leader'.
 *    All other values copy straight across.
 *
 * 2. users.academia_id → users.academy_id
 *
 * All steps use IF EXISTS guards so the migration is idempotent — safe to
 * run against a DB that was already updated via synchronize:true.
 */
export class SplitUserRoleColumns1742604000000 implements MigrationInterface {
  name = 'SplitUserRoleColumns1742604000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ── 1. Create new enum types ──────────────────────────────────────────────

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type t
          JOIN pg_namespace n ON t.typnamespace = n.oid
          WHERE n.nspname = current_schema() AND t.typname = 'users_dancing_role_enum'
        ) THEN
          CREATE TYPE "users_dancing_role_enum" AS ENUM('leader', 'follower', 'switch');
        END IF;
      END $$
    `);

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_type t
          JOIN pg_namespace n ON t.typnamespace = n.oid
          WHERE n.nspname = current_schema() AND t.typname = 'users_application_role_enum'
        ) THEN
          CREATE TYPE "users_application_role_enum" AS ENUM('user', 'admin', 'superadmin');
        END IF;
      END $$
    `);

    // ── 2. Add dancing_role, migrate data from rol ────────────────────────────

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = current_schema()
          AND table_name = 'users' AND column_name = 'dancing_role'
        ) THEN
          ALTER TABLE "users"
            ADD COLUMN "dancing_role" "users_dancing_role_enum" NOT NULL DEFAULT 'leader';

          -- Copy valid DancingRole values from the old rol column
          IF EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = current_schema()
            AND table_name = 'users' AND column_name = 'rol'
          ) THEN
            UPDATE "users"
            SET "dancing_role" = "rol"::text::"users_dancing_role_enum"
            WHERE "rol"::text IN ('leader', 'follower', 'switch');
            -- rows where rol='admin' keep the default 'leader'
          END IF;
        END IF;
      END $$
    `);

    // ── 3. Add application_role, migrate data from rol ───────────────────────

    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = current_schema()
          AND table_name = 'users' AND column_name = 'application_role'
        ) THEN
          ALTER TABLE "users"
            ADD COLUMN "application_role" "users_application_role_enum" NOT NULL DEFAULT 'user';

          -- Promote former rol='admin' users
          IF EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = current_schema()
            AND table_name = 'users' AND column_name = 'rol'
          ) THEN
            UPDATE "users"
            SET "application_role" = 'admin'
            WHERE "rol"::text = 'admin';
          END IF;
        END IF;
      END $$
    `);

    // ── 4. Drop the old rol column ────────────────────────────────────────────

    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = current_schema()
          AND table_name = 'users' AND column_name = 'rol'
        ) THEN
          ALTER TABLE "users" DROP COLUMN "rol";
        END IF;
      END $$
    `);

    // ── 5. Drop the old enum type (may be in public or current schema) ────────

    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM pg_type WHERE typname = 'users_rol_enum'
        ) THEN
          DROP TYPE "users_rol_enum";
        END IF;
      END $$
    `);

    // ── 6. Rename academia_id → academy_id ───────────────────────────────────

    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = current_schema()
          AND table_name = 'users' AND column_name = 'academia_id'
        ) THEN
          ALTER TABLE "users" RENAME COLUMN "academia_id" TO "academy_id";
        END IF;
      END $$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ── Restore academia_id ───────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = current_schema()
          AND table_name = 'users' AND column_name = 'academy_id'
        ) THEN
          ALTER TABLE "users" RENAME COLUMN "academy_id" TO "academia_id";
        END IF;
      END $$
    `);

    // ── Recreate the old rol enum ─────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_rol_enum') THEN
          CREATE TYPE "users_rol_enum" AS ENUM('leader', 'follower', 'switch', 'admin');
        END IF;
      END $$
    `);

    // ── Restore rol column from the two split columns ─────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = current_schema()
          AND table_name = 'users' AND column_name = 'rol'
        ) THEN
          ALTER TABLE "users" ADD COLUMN "rol" "users_rol_enum" NOT NULL DEFAULT 'leader';

          IF EXISTS (
            SELECT 1 FROM information_schema.columns
            WHERE table_schema = current_schema()
            AND table_name = 'users' AND column_name = 'application_role'
          ) THEN
            -- Admins first, then copy dancing role for regular users
            UPDATE "users" SET "rol" = 'admin' WHERE "application_role"::text = 'admin';
            UPDATE "users"
            SET "rol" = "dancing_role"::text::"users_rol_enum"
            WHERE "application_role"::text = 'user';
          END IF;
        END IF;
      END $$
    `);

    // ── Drop the split columns and their enum types ───────────────────────────
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "dancing_role"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN IF EXISTS "application_role"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "users_dancing_role_enum"`);
    await queryRunner.query(`DROP TYPE IF EXISTS "users_application_role_enum"`);
  }
}
