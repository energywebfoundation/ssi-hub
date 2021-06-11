import { MigrationInterface, QueryRunner } from "typeorm";

export class AddClaimExpiry1623406272463 implements MigrationInterface {
  name = 'AddClaimExpiry1623406272463'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "claim" ADD "expiry" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "expiry"`);
  }

}
