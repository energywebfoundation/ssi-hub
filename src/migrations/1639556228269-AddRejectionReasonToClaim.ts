import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRejectionReasonToClaim1639556228268
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_claim" ADD "rejectionReason" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role_claim" DROP COLUMN "rejectionReason"`,
    );
  }
}
