import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDidSyncStatus1732050720611 implements MigrationInterface {
  name = 'AddDidSyncStatus1732050720611';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."did_sync_status_entity_status_enum" AS ENUM('0', '1')`
    );
    await queryRunner.query(
      `CREATE TABLE "did_sync_status_entity" ("id" SERIAL NOT NULL, "status" "public"."did_sync_status_entity_status_enum" NOT NULL DEFAULT '0', "created_date" TIMESTAMP NOT NULL DEFAULT now(), "document_id" character varying NOT NULL, CONSTRAINT "REL_100b8d489b25f9c448ec03e482" UNIQUE ("document_id"), CONSTRAINT "PK_e7f58d90249f1f87ddc5132cb11" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "did_sync_status_entity" ADD CONSTRAINT "FK_100b8d489b25f9c448ec03e482d" FOREIGN KEY ("document_id") REFERENCES "did_document_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `INSERT INTO did_sync_status_entity (document_id) SELECT id FROM did_document_entity`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "did_sync_status_entity" DROP CONSTRAINT "FK_100b8d489b25f9c448ec03e482d"`
    );
    await queryRunner.query(`DROP TABLE "did_sync_status_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."did_sync_status_entity_status_enum"`
    );
  }
}
