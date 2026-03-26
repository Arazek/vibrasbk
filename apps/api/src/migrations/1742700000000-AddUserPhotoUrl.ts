import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserPhotoUrl1742700000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE vibrasbk.users
      ADD COLUMN IF NOT EXISTS photo_url TEXT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE vibrasbk.users
      DROP COLUMN IF EXISTS photo_url
    `);
  }
}
