import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddClaimSubject1622032655124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'claim',
      new TableColumn({ name: 'subject', type: 'varchar', default: "''" })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('claim', 'subject');
  }
}
