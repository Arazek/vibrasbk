import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameColumnsToEnglish1742399000000 implements MigrationInterface {
  name = 'RenameColumnsToEnglish1742399000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // ── users ─────────────────────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='users' AND column_name='ciudad') THEN
          ALTER TABLE "users" RENAME COLUMN "ciudad" TO "city";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='users' AND column_name='nivel') THEN
          ALTER TABLE "users" RENAME COLUMN "nivel" TO "level";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='users' AND column_name='estilos') THEN
          ALTER TABLE "users" RENAME COLUMN "estilos" TO "styles";
        END IF;
      END $$
    `);
    // Rename the PostgreSQL enum type TypeORM auto-generates for this column
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE n.nspname = 'vibrasbk' AND t.typname = 'users_nivel_enum') THEN
          ALTER TYPE "vibrasbk"."users_nivel_enum" RENAME TO "users_level_enum";
        END IF;
      END $$
    `);

    // ── venues ────────────────────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='venues' AND column_name='nombre') THEN
          ALTER TABLE "venues" RENAME COLUMN "nombre" TO "name";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='venues' AND column_name='ciudad') THEN
          ALTER TABLE "venues" RENAME COLUMN "ciudad" TO "city";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='venues' AND column_name='aforo_maximo') THEN
          ALTER TABLE "venues" RENAME COLUMN "aforo_maximo" TO "max_capacity";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='venues' AND column_name='estilos') THEN
          ALTER TABLE "venues" RENAME COLUMN "estilos" TO "styles";
        END IF;
      END $$
    `);

    // ── academia ──────────────────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='academia' AND column_name='nombre') THEN
          ALTER TABLE "academia" RENAME COLUMN "nombre" TO "name";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='academia' AND column_name='ciudad') THEN
          ALTER TABLE "academia" RENAME COLUMN "ciudad" TO "city";
        END IF;
      END $$
    `);

    // ── dance_style ───────────────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='dance_style' AND column_name='nombre') THEN
          ALTER TABLE "dance_style" RENAME COLUMN "nombre" TO "name";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='dance_style' AND column_name='activo') THEN
          ALTER TABLE "dance_style" RENAME COLUMN "activo" TO "active";
        END IF;
      END $$
    `);

    // ── recurring_events ──────────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='nombre') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "nombre" TO "name";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='foto_url') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "foto_url" TO "photo_url";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='dia_semana') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "dia_semana" TO "day_of_week";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='proxima_fecha') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "proxima_fecha" TO "next_date";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='fecha_inicio') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "fecha_inicio" TO "start_date";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='hora_inicio') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "hora_inicio" TO "start_time";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='hora_pico_estimado') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "hora_pico_estimado" TO "estimated_peak_time";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='estilos') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "estilos" TO "styles";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='activo') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "activo" TO "active";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='taller_incluido') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "taller_incluido" TO "workshop_included";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='precio_entrada') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "precio_entrada" TO "entry_price";
        END IF;
      END $$
    `);
    // Consolidate instructores (social) + profesores (intensive) → instructors
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema='vibrasbk' AND table_name='recurring_events') THEN
          ALTER TABLE "recurring_events" ADD COLUMN IF NOT EXISTS "instructors" text;
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='instructores') THEN
          UPDATE "recurring_events" SET "instructors" = "instructores" WHERE "instructores" IS NOT NULL AND "instructors" IS NULL;
          ALTER TABLE "recurring_events" DROP COLUMN "instructores";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='profesores') THEN
          UPDATE "recurring_events" SET "instructors" = "profesores" WHERE "profesores" IS NOT NULL AND "instructors" IS NULL;
          ALTER TABLE "recurring_events" DROP COLUMN "profesores";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='titulo') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "titulo" TO "title";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='localidad') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "localidad" TO "locality";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='duracion_dias') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "duracion_dias" TO "duration_days";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='precios') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "precios" TO "prices";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='enlace_web') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "enlace_web" TO "website_url";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='fecha_fin') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "fecha_fin" TO "end_date";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='recurring_events' AND column_name='nivel') THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "nivel" TO "level";
        END IF;
      END $$
    `);

    // ── intention_votes ───────────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='intention_votes' AND column_name='semana_iso') THEN
          ALTER TABLE "intention_votes" RENAME COLUMN "semana_iso" TO "iso_week";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='intention_votes' AND column_name='estado') THEN
          ALTER TABLE "intention_votes" RENAME COLUMN "estado" TO "status";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM pg_type t JOIN pg_namespace n ON t.typnamespace = n.oid WHERE n.nspname = 'vibrasbk' AND t.typname = 'intention_votes_estado_enum') THEN
          ALTER TYPE "vibrasbk"."intention_votes_estado_enum" RENAME TO "intention_votes_status_enum";
        END IF;
      END $$
    `);

    // ── attendance_verifications ──────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='attendance_verifications' AND column_name='semana_iso') THEN
          ALTER TABLE "attendance_verifications" RENAME COLUMN "semana_iso" TO "iso_week";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='attendance_verifications' AND column_name='asistio') THEN
          ALTER TABLE "attendance_verifications" RENAME COLUMN "asistio" TO "attended";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='attendance_verifications' AND column_name='timestamp_respuesta') THEN
          ALTER TABLE "attendance_verifications" RENAME COLUMN "timestamp_respuesta" TO "response_timestamp";
        END IF;
      END $$
    `);

    // ── reliability_metrics ───────────────────────────────────────────────────
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='reliability_metrics' AND column_name='votos_voy_total') THEN
          ALTER TABLE "reliability_metrics" RENAME COLUMN "votos_voy_total" TO "total_going_votes";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='reliability_metrics' AND column_name='asistencias_confirmadas') THEN
          ALTER TABLE "reliability_metrics" RENAME COLUMN "asistencias_confirmadas" TO "confirmed_attendances";
        END IF;
      END $$
    `);
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='vibrasbk' AND table_name='reliability_metrics' AND column_name='fiabilidad') THEN
          ALTER TABLE "reliability_metrics" RENAME COLUMN "fiabilidad" TO "reliability";
        END IF;
      END $$
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ── reliability_metrics ───────────────────────────────────────────────────
    await queryRunner.query(`ALTER TABLE "reliability_metrics" RENAME COLUMN "reliability" TO "fiabilidad"`);
    await queryRunner.query(`ALTER TABLE "reliability_metrics" RENAME COLUMN "confirmed_attendances" TO "asistencias_confirmadas"`);
    await queryRunner.query(`ALTER TABLE "reliability_metrics" RENAME COLUMN "total_going_votes" TO "votos_voy_total"`);

    // ── attendance_verifications ──────────────────────────────────────────────
    await queryRunner.query(`ALTER TABLE "attendance_verifications" RENAME COLUMN "response_timestamp" TO "timestamp_respuesta"`);
    await queryRunner.query(`ALTER TABLE "attendance_verifications" RENAME COLUMN "attended" TO "asistio"`);
    await queryRunner.query(`ALTER TABLE "attendance_verifications" RENAME COLUMN "iso_week" TO "semana_iso"`);

    // ── intention_votes ───────────────────────────────────────────────────────
    await queryRunner.query(`ALTER TYPE "vibrasbk"."intention_votes_status_enum" RENAME TO "intention_votes_estado_enum"`);
    await queryRunner.query(`ALTER TABLE "intention_votes" RENAME COLUMN "status" TO "estado"`);
    await queryRunner.query(`ALTER TABLE "intention_votes" RENAME COLUMN "iso_week" TO "semana_iso"`);

    // ── recurring_events ──────────────────────────────────────────────────────
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "level" TO "nivel"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "end_date" TO "fecha_fin"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "website_url" TO "enlace_web"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "prices" TO "precios"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "duration_days" TO "duracion_dias"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "locality" TO "localidad"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "title" TO "titulo"`);
    // Re-split instructors back into instructores + profesores
    await queryRunner.query(`ALTER TABLE "recurring_events" ADD COLUMN IF NOT EXISTS "instructores" text`);
    await queryRunner.query(`ALTER TABLE "recurring_events" ADD COLUMN IF NOT EXISTS "profesores" text`);
    await queryRunner.query(`UPDATE "recurring_events" SET "instructores" = "instructors" WHERE type = 'social'`);
    await queryRunner.query(`UPDATE "recurring_events" SET "profesores" = "instructors" WHERE type = 'intensive'`);
    await queryRunner.query(`ALTER TABLE "recurring_events" DROP COLUMN IF EXISTS "instructors"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "entry_price" TO "precio_entrada"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "workshop_included" TO "taller_incluido"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "active" TO "activo"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "styles" TO "estilos"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "estimated_peak_time" TO "hora_pico_estimado"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "start_time" TO "hora_inicio"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "start_date" TO "fecha_inicio"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "next_date" TO "proxima_fecha"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "day_of_week" TO "dia_semana"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "photo_url" TO "foto_url"`);
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "name" TO "nombre"`);

    // ── dance_style ───────────────────────────────────────────────────────────
    await queryRunner.query(`ALTER TABLE "dance_style" RENAME COLUMN "active" TO "activo"`);
    await queryRunner.query(`ALTER TABLE "dance_style" RENAME COLUMN "name" TO "nombre"`);

    // ── academia ──────────────────────────────────────────────────────────────
    await queryRunner.query(`ALTER TABLE "academia" RENAME COLUMN "city" TO "ciudad"`);
    await queryRunner.query(`ALTER TABLE "academia" RENAME COLUMN "name" TO "nombre"`);

    // ── venues ────────────────────────────────────────────────────────────────
    await queryRunner.query(`ALTER TABLE "venues" RENAME COLUMN "styles" TO "estilos"`);
    await queryRunner.query(`ALTER TABLE "venues" RENAME COLUMN "max_capacity" TO "aforo_maximo"`);
    await queryRunner.query(`ALTER TABLE "venues" RENAME COLUMN "city" TO "ciudad"`);
    await queryRunner.query(`ALTER TABLE "venues" RENAME COLUMN "name" TO "nombre"`);

    // ── users ─────────────────────────────────────────────────────────────────
    await queryRunner.query(`ALTER TYPE "vibrasbk"."users_level_enum" RENAME TO "users_nivel_enum"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "styles" TO "estilos"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "level" TO "nivel"`);
    await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "city" TO "ciudad"`);
  }
}
