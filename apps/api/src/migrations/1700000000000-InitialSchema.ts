import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1700000000000 implements MigrationInterface {
    name = 'InitialSchema1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_rol_enum" AS ENUM('leader', 'follower', 'switch', 'admin')`);
        await queryRunner.query(`CREATE TYPE "public"."users_nivel_enum" AS ENUM('beginner', 'initiation', 'comfortable', 'intermediate', 'advanced')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "alias" character varying NOT NULL, "email" character varying NOT NULL, "passwordHash" character varying NOT NULL, "ciudad" character varying NOT NULL DEFAULT 'Cartagena', "rol" "public"."users_rol_enum" NOT NULL, "nivel" "public"."users_nivel_enum" NOT NULL, "estilos" text NOT NULL, "academia_id" character varying, "fcm_token" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_f002c336d3299ee4eba00196902" UNIQUE ("alias"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "venues" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "ciudad" character varying NOT NULL DEFAULT 'Cartagena', "lat" numeric, "lng" numeric, "aforo_maximo" integer, "estilos" text NOT NULL, CONSTRAINT "PK_cb0f885278d12384eb7a81818be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "academia" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying NOT NULL, "ciudad" character varying, CONSTRAINT "PK_29060ee883c42795980812d1560" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "dance_style" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" character varying NOT NULL, "nombre" character varying NOT NULL, "activo" boolean NOT NULL DEFAULT true, CONSTRAINT "UQ_022c32560e9aa4126d86d35615f" UNIQUE ("slug"), CONSTRAINT "PK_5e30fe14d50a7ad89e16c474c9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recurring_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "venue_id" uuid NOT NULL, "nombre" character varying, "foto_url" character varying, "dia_semana" smallint, "proxima_fecha" date, "fecha_inicio" character varying, "hora_inicio" TIME, "hora_pico_estimado" TIME, "estilos" text NOT NULL, "activo" boolean NOT NULL DEFAULT true, "taller_incluido" boolean, "precio_entrada" numeric, "instructores" text, "price" numeric, "instructor" character varying, "titulo" character varying, "localidad" character varying, "duracion_dias" integer, "precios" text, "enlace_web" character varying, "fecha_fin" character varying, "nivel" character varying, "tipo" character varying NOT NULL, CONSTRAINT "PK_111b9377caa5a9be24aafe6b014" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ab59a5db2df11dcca7f7f96440" ON "recurring_events" ("tipo") `);
        await queryRunner.query(`CREATE TYPE "public"."intention_votes_estado_enum" AS ENUM('going', 'maybe', 'not_going')`);
        await queryRunner.query(`CREATE TABLE "intention_votes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "event_id" character varying NOT NULL, "semana_iso" character varying NOT NULL, "estado" "public"."intention_votes_estado_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_9b3e39cf6f493530d49d7a0f5c8" UNIQUE ("user_id", "event_id", "semana_iso"), CONSTRAINT "PK_b33dd23699164b6400b9e09710d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attendance_verifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "event_id" character varying NOT NULL, "semana_iso" character varying NOT NULL, "asistio" boolean, "timestamp_respuesta" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_c945e73d5f977ab1efa86cd3071" UNIQUE ("user_id", "event_id", "semana_iso"), CONSTRAINT "PK_9bfe3ee9d6242eea1ad8b93147e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reliability_metrics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "votos_voy_total" integer NOT NULL DEFAULT '0', "asistencias_confirmadas" integer NOT NULL DEFAULT '0', "fiabilidad" numeric(4,3) NOT NULL DEFAULT '1', CONSTRAINT "UQ_d4ae00dbeb3baa82d710a9ab000" UNIQUE ("user_id"), CONSTRAINT "PK_cc89edc8c393599816d67e8d982" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "calendar_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "location" character varying, "createdBy" character varying NOT NULL, "attendeeIds" uuid array NOT NULL DEFAULT '{}', "color" character varying, "isAllDay" boolean NOT NULL DEFAULT false, "isRecurring" boolean NOT NULL DEFAULT false, "recurrenceRule" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_faf5391d232322a87cdd1c6f30c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "conversations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "participantIds" uuid array NOT NULL, "name" character varying, "lastMessageAt" TIMESTAMP, "lastMessage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ee34f4f7ced4ec8681f26bf04ef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "conversationId" character varying NOT NULL, "senderId" character varying NOT NULL, "content" text NOT NULL, "mediaUrl" character varying, "mediaType" character varying, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2db9cf2b3ca111742793f6c37c" ON "messages" ("senderId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e5663ce0c730b2de83445e2fd1" ON "messages" ("conversationId") `);
        await queryRunner.query(`ALTER TABLE "recurring_events" ADD CONSTRAINT "FK_2d7e85fe8d1b2d05f3cb5e1ac32" FOREIGN KEY ("venue_id") REFERENCES "venues"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recurring_events" DROP CONSTRAINT "FK_2d7e85fe8d1b2d05f3cb5e1ac32"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e5663ce0c730b2de83445e2fd1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2db9cf2b3ca111742793f6c37c"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
        await queryRunner.query(`DROP TABLE "calendar_events"`);
        await queryRunner.query(`DROP TABLE "reliability_metrics"`);
        await queryRunner.query(`DROP TABLE "attendance_verifications"`);
        await queryRunner.query(`DROP TABLE "intention_votes"`);
        await queryRunner.query(`DROP TYPE "public"."intention_votes_estado_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ab59a5db2df11dcca7f7f96440"`);
        await queryRunner.query(`DROP TABLE "recurring_events"`);
        await queryRunner.query(`DROP TABLE "dance_style"`);
        await queryRunner.query(`DROP TABLE "academia"`);
        await queryRunner.query(`DROP TABLE "venues"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_nivel_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_rol_enum"`);
    }

}
