import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVersionColumnToRoleTable1633418241151
  implements MigrationInterface {
  name = 'AddVersionColumnToRoleTable1633418241151';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" ADD "version" smallint`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "version"`);
  }
}
