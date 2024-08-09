import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1723112057042 implements MigrationInterface {
    name = 'InitMigration1723112057042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("role_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "role_name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f4faebcc4e8c99dff4814d680b3" PRIMARY KEY ("role_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressource_type" ("ressource_type_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "type_name" character varying(50) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_99661b6129c822d51c62e595602" PRIMARY KEY ("ressource_type_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressource_status" ("ressource_status_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_b777f68a1009ed4e93b0f0731bd" PRIMARY KEY ("ressource_status_uuid"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("comment_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(255), "is_reported" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "comment_uuid_1" uuid, "user_uuid" uuid, "ressource_uuid" uuid, CONSTRAINT "PK_dfec3c83dedceee6c1a2bbc9155" PRIMARY KEY ("comment_uuid"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("tag_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag_title" character varying(100) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_926b80ec0128aabbcc55e6cda59" PRIMARY KEY ("tag_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressource_status_history" ("ressource_status_history_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "status_changed_at" TIMESTAMP WITH TIME ZONE NOT NULL, "preview_state" character varying(50), "new_state" character varying(50), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "ressource_uuid" uuid, CONSTRAINT "PK_92ab22f87c0c3f869f8ca7e05e2" PRIMARY KEY ("ressource_status_history_uuid"))`);
        await queryRunner.query(`CREATE TABLE "ressource" ("ressource_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(50) NOT NULL, "content" text, "summary" character varying(255), "is_reported" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, "ressource_type_uuid" uuid, "ressource_status_uuid" uuid, "user_uuid_1" uuid, CONSTRAINT "PK_f9c285fe8f6bc99d3f20dc109a7" PRIMARY KEY ("ressource_uuid"))`);
        await queryRunner.query(`CREATE TABLE "sharing_session" ("sharing_session_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "description" text, "event_start_datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "event_end_datetime" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_uuid" uuid, CONSTRAINT "PK_59c3469728150a3f70eec0f64aa" PRIMARY KEY ("sharing_session_uuid"))`);
        await queryRunner.query(`CREATE TABLE "follow" ("user_uuid" uuid NOT NULL, "user_uuid_1" uuid NOT NULL, CONSTRAINT "PK_414abf5d7ce6535d5ffd20705bc" PRIMARY KEY ("user_uuid", "user_uuid_1"))`);
        await queryRunner.query(`CREATE TABLE "users" ("user_uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_uuid" uuid, CONSTRAINT "PK_5832c6d9b84363dc2525015d46c" PRIMARY KEY ("user_uuid"))`);
        await queryRunner.query(`CREATE TABLE "have" ("tag_uuid" uuid NOT NULL, "ressource_uuid" uuid NOT NULL, CONSTRAINT "PK_337a79497400f1e10c884c8c030" PRIMARY KEY ("tag_uuid", "ressource_uuid"))`);
        await queryRunner.query(`CREATE TABLE "refer" ("tag_uuid" uuid NOT NULL, "sharing_session_uuid" uuid NOT NULL, CONSTRAINT "PK_cdd0acc4f9c8dfdf0f4d53ebe84" PRIMARY KEY ("tag_uuid", "sharing_session_uuid"))`);
        await queryRunner.query(`CREATE TABLE "reference" ("ressource_uuid" uuid NOT NULL, "sharing_session_uuid" uuid NOT NULL, CONSTRAINT "PK_6a76a812fa361eb177d0df431bb" PRIMARY KEY ("ressource_uuid", "sharing_session_uuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_82bc901f98aaf78f6c17170802" ON "have" ("tag_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_66237426737cc51295ef139d7d" ON "have" ("ressource_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_2149fe724c53aacaeef8fa1525" ON "reference" ("sharing_session_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_72cf57ffe328b229edc1b1454c" ON "reference" ("ressource_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_a753fde0da76fb224e98bdea75" ON "refer" ("sharing_session_uuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_89bff2af8793f0436ca4277b45" ON "refer" ("tag_uuid") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_428a76690486fc49a306ddcfd6c" FOREIGN KEY ("comment_uuid_1") REFERENCES "comments"("comment_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_1b26a95e1de1e36a26a15fc40f1" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_93e564c51151997fd6dd9525562" FOREIGN KEY ("ressource_uuid") REFERENCES "ressource"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressource_status_history" ADD CONSTRAINT "FK_10fba3c3cc2f137afc7683cfa64" FOREIGN KEY ("ressource_uuid") REFERENCES "ressource"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressource" ADD CONSTRAINT "FK_200d384849a7e5410f87a4c2e25" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressource" ADD CONSTRAINT "FK_5048d5e0849d492efc636c0d658" FOREIGN KEY ("ressource_type_uuid") REFERENCES "ressource_type"("ressource_type_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressource" ADD CONSTRAINT "FK_32a8d05d8fd6932886a53c38b0f" FOREIGN KEY ("ressource_status_uuid") REFERENCES "ressource_status"("ressource_status_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ressource" ADD CONSTRAINT "FK_b495b3334f643a323d627dbffcd" FOREIGN KEY ("user_uuid_1") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sharing_session" ADD CONSTRAINT "FK_2db7dedd5894b7ea7bb78535cee" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_371ce08d91a94873c8f86dea54e" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "follow" ADD CONSTRAINT "FK_e4bab1397cedfdd4514764de65a" FOREIGN KEY ("user_uuid_1") REFERENCES "users"("user_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_b925bcec35ac48b9393685253d6" FOREIGN KEY ("role_uuid") REFERENCES "role"("role_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "have" ADD CONSTRAINT "FK_82bc901f98aaf78f6c17170802b" FOREIGN KEY ("tag_uuid") REFERENCES "tag"("tag_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "have" ADD CONSTRAINT "FK_66237426737cc51295ef139d7d0" FOREIGN KEY ("ressource_uuid") REFERENCES "ressource"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refer" ADD CONSTRAINT "FK_89bff2af8793f0436ca4277b45c" FOREIGN KEY ("tag_uuid") REFERENCES "tag"("tag_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refer" ADD CONSTRAINT "FK_a753fde0da76fb224e98bdea75c" FOREIGN KEY ("sharing_session_uuid") REFERENCES "sharing_session"("sharing_session_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reference" ADD CONSTRAINT "FK_72cf57ffe328b229edc1b1454c5" FOREIGN KEY ("ressource_uuid") REFERENCES "ressource"("ressource_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reference" ADD CONSTRAINT "FK_2149fe724c53aacaeef8fa15253" FOREIGN KEY ("sharing_session_uuid") REFERENCES "sharing_session"("sharing_session_uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "reference" DROP CONSTRAINT "FK_2149fe724c53aacaeef8fa15253"`);
        await queryRunner.query(`ALTER TABLE "reference" DROP CONSTRAINT "FK_72cf57ffe328b229edc1b1454c5"`);
        await queryRunner.query(`ALTER TABLE "refer" DROP CONSTRAINT "FK_a753fde0da76fb224e98bdea75c"`);
        await queryRunner.query(`ALTER TABLE "refer" DROP CONSTRAINT "FK_89bff2af8793f0436ca4277b45c"`);
        await queryRunner.query(`ALTER TABLE "have" DROP CONSTRAINT "FK_66237426737cc51295ef139d7d0"`);
        await queryRunner.query(`ALTER TABLE "have" DROP CONSTRAINT "FK_82bc901f98aaf78f6c17170802b"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_b925bcec35ac48b9393685253d6"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_e4bab1397cedfdd4514764de65a"`);
        await queryRunner.query(`ALTER TABLE "follow" DROP CONSTRAINT "FK_371ce08d91a94873c8f86dea54e"`);
        await queryRunner.query(`ALTER TABLE "sharing_session" DROP CONSTRAINT "FK_2db7dedd5894b7ea7bb78535cee"`);
        await queryRunner.query(`ALTER TABLE "ressource" DROP CONSTRAINT "FK_b495b3334f643a323d627dbffcd"`);
        await queryRunner.query(`ALTER TABLE "ressource" DROP CONSTRAINT "FK_32a8d05d8fd6932886a53c38b0f"`);
        await queryRunner.query(`ALTER TABLE "ressource" DROP CONSTRAINT "FK_5048d5e0849d492efc636c0d658"`);
        await queryRunner.query(`ALTER TABLE "ressource" DROP CONSTRAINT "FK_200d384849a7e5410f87a4c2e25"`);
        await queryRunner.query(`ALTER TABLE "ressource_status_history" DROP CONSTRAINT "FK_10fba3c3cc2f137afc7683cfa64"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_93e564c51151997fd6dd9525562"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_1b26a95e1de1e36a26a15fc40f1"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_428a76690486fc49a306ddcfd6c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89bff2af8793f0436ca4277b45"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a753fde0da76fb224e98bdea75"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72cf57ffe328b229edc1b1454c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2149fe724c53aacaeef8fa1525"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66237426737cc51295ef139d7d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_82bc901f98aaf78f6c17170802"`);
        await queryRunner.query(`DROP TABLE "reference"`);
        await queryRunner.query(`DROP TABLE "refer"`);
        await queryRunner.query(`DROP TABLE "have"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "follow"`);
        await queryRunner.query(`DROP TABLE "sharing_session"`);
        await queryRunner.query(`DROP TABLE "ressource"`);
        await queryRunner.query(`DROP TABLE "ressource_status_history"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "ressource_status"`);
        await queryRunner.query(`DROP TABLE "ressource_type"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
