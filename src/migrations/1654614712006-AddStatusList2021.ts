import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStatusList20211654614712006 implements MigrationInterface {
  name = 'AddStatusList20211654614712006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "status_list_entry" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "statusListIndex" character varying NOT NULL, "statusListCredential" character varying NOT NULL, CONSTRAINT "PK_355969ca7921c8c8a570b8db146" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "credential_with_status" ("id" character varying NOT NULL, "namespace" character varying NOT NULL, "entryId" uuid, CONSTRAINT "REL_b0e9c73fbca4e64eaf80d784ed" UNIQUE ("entryId"), CONSTRAINT "PK_ff3ffd6e276e046ff69b115ebd2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "status_list_credential" ("id" character varying NOT NULL, "vc" jsonb, "namespaceId" character varying(256), CONSTRAINT "PK_39d40d4d9dfacfc4f86dda4975a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "namespace_revocations" ("id" character varying(256) NOT NULL, "namespace" character varying NOT NULL, CONSTRAINT "UQ_82a4557d6ad89b3ee1c2c02f971" UNIQUE ("namespace"), CONSTRAINT "PK_a572ca366fac6e413bfe69f3767" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "namespace_revocations"`);
    await queryRunner.query(`DROP TABLE "status_list_credential"`);
    await queryRunner.query(`DROP TABLE "credential_with_status"`);
    await queryRunner.query(`DROP TABLE "status_list_entry"`);
  }
}
