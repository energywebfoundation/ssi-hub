import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClaimOnChainProof1622631478371 implements MigrationInterface {
  name = 'AddClaimOnChainProof1622631478371'

  public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "claim" ADD "onChainProof" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "onChainProof"`);
  }

}
