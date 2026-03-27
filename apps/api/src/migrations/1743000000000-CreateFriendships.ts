import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFriendships1743000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'friendship_status_enum') THEN
          CREATE TYPE vibrasbk.friendship_status_enum AS ENUM ('pending', 'accepted', 'rejected');
        END IF;
      END $$;
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS vibrasbk.friendship (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        requester_id UUID NOT NULL REFERENCES vibrasbk.users(id) ON DELETE CASCADE,
        addressee_id UUID NOT NULL REFERENCES vibrasbk.users(id) ON DELETE CASCADE,
        status vibrasbk.friendship_status_enum NOT NULL DEFAULT 'pending',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        CONSTRAINT uq_friendship_pair UNIQUE (requester_id, addressee_id),
        CONSTRAINT chk_no_self_friend CHECK (requester_id <> addressee_id)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS vibrasbk.friendship`);
    await queryRunner.query(`DROP TYPE IF EXISTS vibrasbk.friendship_status_enum`);
  }
}
