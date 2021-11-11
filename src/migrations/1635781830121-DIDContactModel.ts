import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIDContactModel1635781830121 implements MigrationInterface {
  name = 'DIDContactModel1635781830121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "did_contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "did" character varying NOT NULL, "label" text NOT NULL, "created_by" character varying, CONSTRAINT "PK_c279e54bb5b7b216a5c1dcfca62" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "did_contact" ADD CONSTRAINT "FK_7a0d177875ab1ff6eda89f30d57" FOREIGN KEY ("created_by") REFERENCES "did_document_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "did_contact" DROP CONSTRAINT "FK_7a0d177875ab1ff6eda89f30d57"`,
    );
    await queryRunner.query(`DROP TABLE "did_contact"`);
  }
}
