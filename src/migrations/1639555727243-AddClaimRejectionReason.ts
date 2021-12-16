import {MigrationInterface, QueryRunner} from "typeorm";

export class AddClaimRejectionReason1639555727243 implements MigrationInterface {
    name = 'AddClaimRejectionReason1639555727243'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_claim" ADD "rejectionReason" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_claim" DROP COLUMN "rejectionReason"`);
    }

}
