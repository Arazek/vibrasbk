import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCountriesAndCities1743300000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "vibrasbk"."countries" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying NOT NULL,
        "code" character varying(2) NOT NULL,
        "capital" character varying NOT NULL,
        "lat" numeric(8,4),
        "lng" numeric(8,4),
        CONSTRAINT "PK_countries" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_countries_code" UNIQUE ("code")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS "vibrasbk"."cities" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "name" character varying NOT NULL,
        "country_id" uuid NOT NULL,
        CONSTRAINT "PK_cities" PRIMARY KEY ("id"),
        CONSTRAINT "FK_cities_country" FOREIGN KEY ("country_id")
          REFERENCES "vibrasbk"."countries"("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "vibrasbk"."cities"`);
    await queryRunner.query(`DROP TABLE IF EXISTS "vibrasbk"."countries"`);
  }
}
