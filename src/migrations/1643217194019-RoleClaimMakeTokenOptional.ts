import { MigrationInterface, QueryRunner } from 'typeorm';

export class RoleClaimMakeTokenOptional1643217194019
  implements MigrationInterface
{
  name = 'RoleClaimMakeTokenOptional1643217194019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE role_claim ALTER COLUMN token DROP NOT NULL;`
    );
  }

  public async down(): Promise<void> {
    return;
  }
}
