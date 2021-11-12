import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStakingParams1636725750389 implements MigrationInterface {
  name = 'AddStakingParams1636725750389';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`TRUNCATE staking_pool`);
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP CONSTRAINT "PK_4637d41e49b3467bf50f8d8eaa3"`,
    );
    await queryRunner.query(`ALTER TABLE "staking_pool" DROP COLUMN "id"`);
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
    await queryRunner.query(`ALTER TABLE "staking_pool" ADD "orgId" integer`);
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD CONSTRAINT "UQ_13216987f2268a5982d9b095230" UNIQUE ("orgId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD CONSTRAINT "PK_45b66bfdb189f7c878ab4a38aab" PRIMARY KEY ("address")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD CONSTRAINT "FK_13216987f2268a5982d9b095230" FOREIGN KEY ("orgId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP CONSTRAINT "FK_13216987f2268a5982d9b095230"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP CONSTRAINT "PK_45b66bfdb189f7c878ab4a38aab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP CONSTRAINT "UQ_13216987f2268a5982d9b095230"`,
    );
    await queryRunner.query(`ALTER TABLE "staking_pool" DROP COLUMN "orgId"`);
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
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD "id" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD CONSTRAINT "PK_4637d41e49b3467bf50f8d8eaa3" PRIMARY KEY ("id")`,
    );
  }
}
