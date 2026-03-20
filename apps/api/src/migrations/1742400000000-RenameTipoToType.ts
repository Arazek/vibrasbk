import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameTipoToType1742400000000 implements MigrationInterface {
  name = 'RenameTipoToType1742400000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    // Rename the STI discriminator column from the original Spanish name
    await queryRunner.query(`
      DO $$ BEGIN
        IF EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_schema = current_schema()
          AND table_name = 'recurring_events'
          AND column_name = 'tipo'
        ) THEN
          ALTER TABLE "recurring_events" RENAME COLUMN "tipo" TO "type";
        END IF;
      END $$
    `);

    // Normalize any legacy discriminator values left from before the backfill
    await queryRunner.query(`UPDATE "recurring_events" SET "type" = 'social'    WHERE "type" IS NULL`);
    await queryRunner.query(`UPDATE "recurring_events" SET "type" = 'intensive' WHERE "type" = 'taller'`);
    await queryRunner.query(`UPDATE "recurring_events" SET "type" = 'intensive' WHERE "type" = 'intensivo'`);
    await queryRunner.query(`UPDATE "recurring_events" SET "type" = 'congress'  WHERE "type" = 'congreso'`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recurring_events" RENAME COLUMN "type" TO "tipo"`);
  }
}
