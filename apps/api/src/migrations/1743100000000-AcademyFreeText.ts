import { MigrationInterface, QueryRunner } from 'typeorm';

export class AcademyFreeText1743100000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."users"
        ADD COLUMN IF NOT EXISTS "academy_name" TEXT;
    `);
    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."users"
        DROP COLUMN IF EXISTS "academy_id";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."users"
        ADD COLUMN IF NOT EXISTS "academy_id" UUID;
    `);
    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."users"
        DROP COLUMN IF EXISTS "academy_name";
    `);
  }
}
