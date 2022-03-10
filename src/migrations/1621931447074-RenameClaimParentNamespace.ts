import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameClaimParentNamespace1621931447074
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "claim" RENAME COLUMN "parentNamespace" TO "namespace"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "claim" RENAME COLUMN "namespace" TO "parentNamespace"`
    );
  }
}
