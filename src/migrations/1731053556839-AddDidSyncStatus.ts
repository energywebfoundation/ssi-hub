import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDidSyncStatus1731053556839 implements MigrationInterface {
  name = 'AddDidSyncStatus1731053556839';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."did_sync_status_entity_status_enum" AS ENUM('0', '1')`
    );
    await queryRunner.query(
      `CREATE TABLE "did_sync_status_entity" ("id" SERIAL NOT NULL, "status" "public"."did_sync_status_entity_status_enum" NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), "documentId" character varying, CONSTRAINT "REL_521e25918cef18d75a35184fe9" UNIQUE ("documentId"), CONSTRAINT "PK_e7f58d90249f1f87ddc5132cb11" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "did_sync_status_entity" ADD CONSTRAINT "FK_521e25918cef18d75a35184fe90" FOREIGN KEY ("documentId") REFERENCES "did_document_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "did_sync_status_entity" DROP CONSTRAINT "FK_521e25918cef18d75a35184fe90"`
    );
    await queryRunner.query(`DROP TABLE "did_sync_status_entity"`);
    await queryRunner.query(
      `DROP TYPE "public"."did_sync_status_entity_status_enum"`
    );
  }
}
