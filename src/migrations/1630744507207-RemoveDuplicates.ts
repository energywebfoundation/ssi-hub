import { MigrationInterface, QueryRunner } from 'typeorm';

const deleteDuplicateOrgs = async (queryRunner: QueryRunner) => {
  await queryRunner.query(
    `DELETE FROM organization org
            WHERE  EXISTS (
            SELECT FROM organization
            WHERE  namespace = org.namespace
            AND    id < org.id
        );`,
  );
};

const deleteDuplicateApps = async (queryRunner: QueryRunner) => {
  await queryRunner.query(
    `DELETE FROM application app
            WHERE  EXISTS (
            SELECT FROM application
            WHERE  namespace = app.namespace
            AND    id < app.id
        );`,
  );
};

const deleteDuplicateRoles = async (queryRunner: QueryRunner) => {
  await queryRunner.query(
    `DELETE FROM role r
            WHERE  EXISTS (
            SELECT FROM role
            WHERE  namespace = r.namespace
            AND    id < r.id
        );`,
  );
};

export class RemoveDuplicates1630744507207 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await deleteDuplicateOrgs(queryRunner);
    await deleteDuplicateApps(queryRunner);
    await deleteDuplicateRoles(queryRunner);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
