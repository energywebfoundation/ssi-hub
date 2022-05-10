import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveMessageTable1651168843471 implements MigrationInterface {
  name = 'RemoveMessageTable1651168843471';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "collections_write_message"`);
  }

  public async down(): Promise<void> {
    return;
  }
}
