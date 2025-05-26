import { MigrationInterface, QueryRunner } from 'typeorm';

export class LatestDidSync1730905681141 implements MigrationInterface {
  name = 'LatestDidSync1730905681141';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "latest_did_sync" ("block" integer NOT NULL, "createdDate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9e615062cb9a1c6b45598e74eae" PRIMARY KEY ("block"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "latest_did_sync"`);
  }
}
