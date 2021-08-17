import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStakingEntities1629211243930 implements MigrationInterface {
  name = 'CreateStakingEntities1629211243930';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "staking_terms" ("id" SERIAL NOT NULL, "terms" character varying NOT NULL, "version" numeric NOT NULL DEFAULT '1', CONSTRAINT "PK_9e5fdce4e8f5a9460c6edd9fb79" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staking_pool" ("id" SERIAL NOT NULL, "address" character varying NOT NULL, CONSTRAINT "PK_4637d41e49b3467bf50f8d8eaa3" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "staking_pool"`);
    await queryRunner.query(`DROP TABLE "staking_terms"`);
  }
}
