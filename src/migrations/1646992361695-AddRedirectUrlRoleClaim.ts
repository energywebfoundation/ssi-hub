import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRedirectUrlRoleClaim1646992361695
  implements MigrationInterface
{
  name = 'AddRedirectUrlRoleClaim1646992361695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_claim" ADD "redirectUri" character varying`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_claim" DROP COLUMN "redirectUri"`
    );
  }
}
