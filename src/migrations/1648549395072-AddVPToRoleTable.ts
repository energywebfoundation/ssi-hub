import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVPToRoleTable1648549395072 implements MigrationInterface {
  name = 'AddVPToRoleTable1648549395072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_claim" ADD "vp" jsonb DEFAULT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role_claim" DROP COLUMN "vp"`);
  }
}
