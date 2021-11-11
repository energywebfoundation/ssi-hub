import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStakingPoolParameters1636645393251
  implements MigrationInterface {
  name = 'AddStakingPoolParameters1636645393251';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE staking_pool`);
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP CONSTRAINT "PK_4637d41e49b3467bf50f8d8eaa3"`,
    );
    await queryRunner.query(`ALTER TABLE "staking_pool" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "org" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "minStakingPeriod" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "withdrawDelay" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "patronRewardPortion" text NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "patronRoles" character varying array NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD CONSTRAINT "PK_45b66bfdb189f7c878ab4a38aab" PRIMARY KEY ("address")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP CONSTRAINT "PK_45b66bfdb189f7c878ab4a38aab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP COLUMN "patronRoles"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP COLUMN "patronRewardPortion"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP COLUMN "withdrawDelay"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP COLUMN "minStakingPeriod"`,
    );
    await queryRunner.query(`ALTER TABLE "staking_pool" DROP COLUMN "org"`);
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD CONSTRAINT "PK_4637d41e49b3467bf50f8d8eaa3" PRIMARY KEY ("id")`,
    );
  }
}
