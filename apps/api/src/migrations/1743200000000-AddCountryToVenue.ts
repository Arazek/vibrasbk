import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCountryToVenue1743200000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."venues"
        ADD COLUMN IF NOT EXISTS "country" TEXT DEFAULT 'Colombia';
    `);
    
    // Update existing rows to have 'Colombia' as default
    await queryRunner.query(`
      UPDATE "vibrasbk"."venues"
      SET "country" = 'Colombia'
      WHERE "country" IS NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."venues"
        DROP COLUMN IF EXISTS "country";
    `);
  }
}
