import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClaimSubjectAgreement1622630172870 implements MigrationInterface {
    name = 'AddClaimSubjectAgreement1622630172870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" ADD "subjectAgreement" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "subjectAgreement"`);
    }

}
