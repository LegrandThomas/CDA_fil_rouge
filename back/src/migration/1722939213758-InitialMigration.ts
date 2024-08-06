import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1722939213758 implements MigrationInterface {
    name = 'InitialMigration1722939213758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("role_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_34a45be94cddd31649e7aa387c5" PRIMARY KEY ("role_uuid"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(255), "is_reported" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "comment_uuid_1" uuid, "user_uuid" uuid, "ressource_uuid" uuid, CONSTRAINT "PK_dfec3c83dedceee6c1a2bbc9155" PRIMARY KEY ("comment_uuid"))`);
        await queryRunner.query(`CREATE TABLE "sharing_sessions" ("sharing_session_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "event_start_datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "event_end_datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, CONSTRAINT "PK_fce850d634d57cff7e76da385e2" PRIMARY KEY ("sharing_session_uuid"))`);
        await queryRunner.query(`CREATE TABLE "follow" ("user_uuid" uuid NOT NULL, "user_uuid_1" uuid NOT NULL, CONSTRAINT "PK_414abf5d7ce6535d5ffd20705bc" PRIMARY KEY ("user_uuid", "user_uuid_1"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_uuid" uuid, CONSTRAINT "PK_5832c6d9b84363dc2525015d46c" PRIMARY KEY ("user_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressources_types" ("ressource_type_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type_name" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a3b8ccec940bfd577c420ea22f1" PRIMARY KEY ("ressource_type_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressources_status" ("ressource_status_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_11973d20d9eed93ef9f916c3403" PRIMARY KEY ("ressource_status_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressources_status_history" ("ressource_status_history_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "status_changed_at" TIMESTAMP WITH TIME ZONE NOT NULL, "preview_state" character varying(50), "new_state" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ressource_uuid" uuid, CONSTRAINT "PK_d3e819508ba169ae8095dda07a0" PRIMARY KEY ("ressource_status_history_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressources" ("ressource_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "content" text, "summary" character varying(255), "is_reported" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, "ressource_type_uuid" uuid, "ressource_status_uuid" uuid, "user_uuid_1" uuid, CONSTRAINT "PK_3e5205083ea85ef6fbdafe5185f" PRIMARY KEY ("ressource_uuid"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("tag_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag_title" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b387cfb734e97985dce23cc2918" PRIMARY KEY ("tag_uuid"))`);
        await queryRunner.query(`CREATE TABLE "reference" ("ressource_uuid" uuid NOT NULL, "sharing_session_uuid" uuid NOT NULL, CONSTRAINT "PK_6a76a812fa361eb177d0df431bb" PRIMARY KEY ("ressource_uuid", "sharing_session_uuid"))`);
        await queryRunner.query(`CREATE TABLE "refer" ("tag_uuid" uuid NOT NULL, "sharing_session_uuid" uuid NOT NULL, CONSTRAINT "PK_cdd0acc4f9c8dfdf0f4d53ebe84" PRIMARY KEY ("tag_uuid", "sharing_session_uuid"))`);
        await queryRunner.query(`CREATE TABLE "have" ("tag_uuid" uuid NOT NULL, "ressource_uuid" uuid NOT NULL, CONSTRAINT "PK_337a79497400f1e10c884c8c030" PRIMARY KEY ("tag_uuid", "ressource_uuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2149fe724c53aacaeef8fa1525" ON "reference" ("sharing_session_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_72cf57ffe328b229edc1b1454c" ON "reference" ("ressource_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_a753fde0da76fb224e98bdea75" ON "refer" ("sharing_session_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_89bff2af8793f0436ca4277b45" ON "refer" ("tag_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_82bc901f98aaf78f6c17170802" ON "have" ("tag_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_66237426737cc51295ef139d7d" ON "have" ("ressource_uuid") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_428a76690486fc49a306ddcfd6c" FOREIGN KEY ("comment_uuid_1") REFERENCES "comments"("comment_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1b26a95e1de1e36a26a15fc40f1" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_93e564c51151997fd6dd9525562" FOREIGN KEY ("ressource_uuid") REFERENCES "ressources"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sharing_sessions" ADD CONSTRAINT "FK_7a02525517463084224d74f0e60" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_371ce08d91a94873c8f86dea54e" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e4bab1397cedfdd4514764de65a" FOREIGN KEY ("user_uuid_1") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b925bcec35ac48b9393685253d6" FOREIGN KEY ("role_uuid") REFERENCES "roles"("role_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressources_status_history" ADD CONSTRAINT "FK_06e28c228aadfc6518e7570093e" FOREIGN KEY ("ressource_uuid") REFERENCES "ressources"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressources" ADD CONSTRAINT "FK_adafc01d22b1be42207b0f10bc1" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressources" ADD CONSTRAINT "FK_0b3ef38c0613ce149bbc1763c35" FOREIGN KEY ("ressource_type_uuid") REFERENCES "ressources_types"("ressource_type_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressources" ADD CONSTRAINT "FK_f80436acee08726f3674c15cf70" FOREIGN KEY ("ressource_status_uuid") REFERENCES "ressources_status"("ressource_status_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressources" ADD CONSTRAINT "FK_e88fcbc5c0ccd2e49eb992f2004" FOREIGN KEY ("user_uuid_1") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reference" ADD CONSTRAINT "FK_72cf57ffe328b229edc1b1454c5" FOREIGN KEY ("ressource_uuid") REFERENCES "ressources"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reference" ADD CONSTRAINT "FK_2149fe724c53aacaeef8fa15253" FOREIGN KEY ("sharing_session_uuid") REFERENCES "sharing_sessions"("sharing_session_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refer" ADD CONSTRAINT "FK_89bff2af8793f0436ca4277b45c" FOREIGN KEY ("tag_uuid") REFERENCES "tags"("tag_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refer" ADD CONSTRAINT "FK_a753fde0da76fb224e98bdea75c" FOREIGN KEY ("sharing_session_uuid") REFERENCES "sharing_sessions"("sharing_session_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "have" ADD CONSTRAINT "FK_82bc901f98aaf78f6c17170802b" FOREIGN KEY ("tag_uuid") REFERENCES "tags"("tag_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "have" ADD CONSTRAINT "FK_66237426737cc51295ef139d7d0" FOREIGN KEY ("ressource_uuid") REFERENCES "ressources"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "have" DROP CONSTRAINT "FK_66237426737cc51295ef139d7d0"`);
        await queryRunner.query(`ALTER TABLE "have" DROP CONSTRAINT "FK_82bc901f98aaf78f6c17170802b"`);
        await queryRunner.query(`ALTER TABLE "refer" DROP CONSTRAINT "FK_a753fde0da76fb224e98bdea75c"`);
        await queryRunner.query(`ALTER TABLE "refer" DROP CONSTRAINT "FK_89bff2af8793f0436ca4277b45c"`);
        await queryRunner.query(`ALTER TABLE "reference" DROP CONSTRAINT "FK_2149fe724c53aacaeef8fa15253"`);
        await queryRunner.query(`ALTER TABLE "reference" DROP CONSTRAINT "FK_72cf57ffe328b229edc1b1454c5"`);
        await queryRunner.query(`ALTER TABLE "ressources" DROP CONSTRAINT "FK_e88fcbc5c0ccd2e49eb992f2004"`);
        await queryRunner.query(`ALTER TABLE "ressources" DROP CONSTRAINT "FK_f80436acee08726f3674c15cf70"`);
        await queryRunner.query(`ALTER TABLE "ressources" DROP CONSTRAINT "FK_0b3ef38c0613ce149bbc1763c35"`);
        await queryRunner.query(`ALTER TABLE "ressources" DROP CONSTRAINT "FK_adafc01d22b1be42207b0f10bc1"`);
        await queryRunner.query(`ALTER TABLE "ressources_status_history" DROP CONSTRAINT "FK_06e28c228aadfc6518e7570093e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b925bcec35ac48b9393685253d6"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e4bab1397cedfdd4514764de65a"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_371ce08d91a94873c8f86dea54e"`);
        await queryRunner.query(`ALTER TABLE "sharing_sessions" DROP CONSTRAINT "FK_7a02525517463084224d74f0e60"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_93e564c51151997fd6dd9525562"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1b26a95e1de1e36a26a15fc40f1"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_428a76690486fc49a306ddcfd6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66237426737cc51295ef139d7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82bc901f98aaf78f6c17170802"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89bff2af8793f0436ca4277b45"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a753fde0da76fb224e98bdea75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72cf57ffe328b229edc1b1454c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2149fe724c53aacaeef8fa1525"`);
        await queryRunner.query(`DROP TABLE "have"`);
        await queryRunner.query(`DROP TABLE "refer"`);
        await queryRunner.query(`DROP TABLE "reference"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "ressources"`);
        await queryRunner.query(`DROP TABLE "ressources_status_history"`);
        await queryRunner.query(`DROP TABLE "ressources_status"`);
        await queryRunner.query(`DROP TABLE "ressources_types"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "follow"`);
        await queryRunner.query(`DROP TABLE "sharing_sessions"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
