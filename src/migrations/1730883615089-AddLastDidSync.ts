import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddLastDidSync1730883615089 implements MigrationInterface {
  name = 'AddLastDidSync1730883615089';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "last_did_sync" ("block" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f66489f90befb2efd0e77685b2b" PRIMARY KEY ("block"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "last_did_sync"`);
  }
}
