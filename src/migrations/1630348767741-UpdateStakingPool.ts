import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStakingPool1630348767741 implements MigrationInterface {
  name = 'UpdateStakingPool1630348767741';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "staking_pool" ADD "termsId" integer`);
    await queryRunner.query(
      `ALTER TABLE "staking_pool" ADD CONSTRAINT "FK_012fb750ccfda0564366842f72a" FOREIGN KEY ("termsId") REFERENCES "staking_terms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "staking_pool" DROP CONSTRAINT "FK_012fb750ccfda0564366842f72a"`
    );
    await queryRunner.query(`ALTER TABLE "staking_pool" DROP COLUMN "termsId"`);
  }
}
