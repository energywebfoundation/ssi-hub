import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClaimRegistrationTypes1622548828009 implements MigrationInterface {
    name = 'AddClaimRegistrationTypes1622548828009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "claim_registrationtypes_enum" AS ENUM('RegistrationTypes::OffChain', 'RegistrationTypes::OnChain')`);
        await queryRunner.query(`ALTER TABLE "claim" ADD "registrationTypes" "claim_registrationtypes_enum" array NOT NULL DEFAULT '{RegistrationTypes::OffChain}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "claim" DROP COLUMN "registrationTypes"`);
        await queryRunner.query(`DROP TYPE "claim_registrationtypes_enum"`);
    }

}
