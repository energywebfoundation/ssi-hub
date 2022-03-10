import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1634564984971 implements MigrationInterface {
  name = 'PostRefactoring1634564984971';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE claim RENAME TO role_claim`);
    await queryRunner.query(
      `CREATE TABLE "claim" ("id" SERIAL NOT NULL, "issuedToken" character varying NOT NULL, "issuedAt" character varying NOT NULL, "subject" character varying NOT NULL, CONSTRAINT "PK_ff711bca6346ca95f2bfd002477" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "claim"`);
    await queryRunner.query(`ALTER TABLE role_claim RENAME TO claim`);
  }
}
