import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCountryCityToUser1743400000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."users"
        ADD COLUMN IF NOT EXISTS "country_id" uuid,
        ADD COLUMN IF NOT EXISTS "city_id" uuid
    `);

    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."users"
        ADD CONSTRAINT "FK_users_country" FOREIGN KEY ("country_id")
          REFERENCES "vibrasbk"."countries"("id") ON DELETE SET NULL
        NOT VALID
    `);

    await queryRunner.query(`
      ALTER TABLE "vibrasbk"."users"
        ADD CONSTRAINT "FK_users_city" FOREIGN KEY ("city_id")
          REFERENCES "vibrasbk"."cities"("id") ON DELETE SET NULL
        NOT VALID
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "vibrasbk"."users" DROP CONSTRAINT IF EXISTS "FK_users_city"`);
    await queryRunner.query(`ALTER TABLE "vibrasbk"."users" DROP CONSTRAINT IF EXISTS "FK_users_country"`);
    await queryRunner.query(`ALTER TABLE "vibrasbk"."users" DROP COLUMN IF EXISTS "city_id"`);
    await queryRunner.query(`ALTER TABLE "vibrasbk"."users" DROP COLUMN IF EXISTS "country_id"`);
  }
}
