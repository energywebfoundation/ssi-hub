import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStakingPoolParams1636555419756 implements MigrationInterface {
  name = 'AddStakingPoolParams1636555419756';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "org" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "minStakingPeriod" text NOT NULL DEFAULT '{"type":"BigNumber","hex":"0x00"}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "withdrawDelay" text NOT NULL DEFAULT '{"type":"BigNumber","hex":"0x00"}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "patronRewardPortion" text NOT NULL DEFAULT '{"type":"BigNumber","hex":"0x00"}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "patronRoles" character varying array DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
  }
}
