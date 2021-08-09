import { MigrationInterface, QueryRunner } from 'typeorm';

export class dropClaimIssuerColumn1628527857091 implements MigrationInterface {
  name = 'dropClaimIssuerColumn1628527857091';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "claimIssuer"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "claim" ADD "claimIssuer" text array NOT NULL`,
    );
  }
}
