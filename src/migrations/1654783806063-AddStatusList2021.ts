import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusList20211654783806063 implements MigrationInterface {
  name = 'AddStatusList20211654783806063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status_list_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "statusListIndex" character varying NOT NULL, "statusListCredential" character varying NOT NULL, "type" character varying NOT NULL, "statusPurpose" character varying NOT NULL, CONSTRAINT "PK_355969ca7921c8c8a570b8db146" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "credential_with_status" ("id" character varying NOT NULL, "namespace" character varying NOT NULL, "entryId" uuid, CONSTRAINT "REL_b0e9c73fbca4e64eaf80d784ed" UNIQUE ("entryId"), CONSTRAINT "PK_ff3ffd6e276e046ff69b115ebd2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "namespace_status_list" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "statusListId" character varying NOT NULL, "namespaceId" character varying(256), CONSTRAINT "UQ_82cd6015dbb7e4009264e67018a" UNIQUE ("statusListId"), CONSTRAINT "PK_b903456612c91f12806eb309716" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "namespace_status_lists" ("id" character varying(256) NOT NULL, "namespace" character varying NOT NULL, CONSTRAINT "UQ_edc0f54eb20d1bdd07279111f79" UNIQUE ("namespace"), CONSTRAINT "PK_365efb4b3e86c04ae3acdd1f40e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "status_list_credential" ("statusListId" character varying NOT NULL, "vc" jsonb, CONSTRAINT "PK_8c36eef5d9ce94fa3938e8ffc7d" PRIMARY KEY ("statusListId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "credential_with_status" ADD CONSTRAINT "FK_b0e9c73fbca4e64eaf80d784ed4" FOREIGN KEY ("entryId") REFERENCES "status_list_entry"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "namespace_status_list" ADD CONSTRAINT "FK_fb33b6a21d163d500606590f2d2" FOREIGN KEY ("namespaceId") REFERENCES "namespace_status_lists"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "namespace_status_list" DROP CONSTRAINT "FK_fb33b6a21d163d500606590f2d2"`
    );
    await queryRunner.query(
      `ALTER TABLE "credential_with_status" DROP CONSTRAINT "FK_b0e9c73fbca4e64eaf80d784ed4"`
    );
    await queryRunner.query(`DROP TABLE "status_list_credential"`);
    await queryRunner.query(`DROP TABLE "namespace_status_lists"`);
    await queryRunner.query(`DROP TABLE "namespace_status_list"`);
    await queryRunner.query(`DROP TABLE "credential_with_status"`);
    await queryRunner.query(`DROP TABLE "status_list_entry"`);
  }
}
