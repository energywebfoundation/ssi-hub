import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClaimExpirationTimestamp1656934127231
  implements MigrationInterface
{
  name = 'AddClaimExpirationTimestamp1656934127231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_claim" ADD "expirationTimestamp" bigint`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_claim" DROP COLUMN "expirationTimestamp"`
    );
  }
}
