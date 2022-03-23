import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMessageTable1649246690092 implements MigrationInterface {
  name = 'AddMessageTable1649246690092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "collections_write_message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "objectId" character varying NOT NULL, "target" character varying NOT NULL, "data" character varying, "message" jsonb NOT NULL, "method" character varying NOT NULL, "schema" character varying, "dataFormat" character varying, "dateCreated" TIMESTAMP WITH TIME ZONE NOT NULL, "datePublished" TIMESTAMP WITH TIME ZONE, "cid" character varying, CONSTRAINT "PK_fb5bbcf4b997ca1d29d5bae3ca2" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "collections_write_message"`);
  }
}
