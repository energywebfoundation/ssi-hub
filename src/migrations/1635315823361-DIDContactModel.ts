import { MigrationInterface, QueryRunner } from 'typeorm';

export class DIDContactModel1635315823361 implements MigrationInterface {
  name = 'DIDContactModel1635315823361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "did_contact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "did" character varying NOT NULL, "label" text NOT NULL, CONSTRAINT "PK_c279e54bb5b7b216a5c1dcfca62" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "did_contact"`);
  }
}
