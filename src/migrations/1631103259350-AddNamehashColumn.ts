import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNamehashColumn1631103259350 implements MigrationInterface {
  name = 'AddNamehashColumn1631103259350';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD "namehash" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "organization" ADD "namehash" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "application" ADD "namehash" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "application" DROP COLUMN "namehash"`);
    await queryRunner.query(
      `ALTER TABLE "organization" DROP COLUMN "namehash"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "namehash"`);
  }
}
