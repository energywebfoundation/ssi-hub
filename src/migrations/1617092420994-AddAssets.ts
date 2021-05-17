import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAssets1617092420994 implements MigrationInterface {
    name = 'AddAssets1617092420994'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "did_document_entity" ("id" character varying NOT NULL, "service" jsonb NOT NULL, "authentication" jsonb NOT NULL, "created" character varying, "delegates" text array, "proof" jsonb, "publicKey" jsonb NOT NULL, "updated" character varying, "@context" character varying NOT NULL, "logs" character varying NOT NULL, CONSTRAINT "PK_d96048f4c93be203eeff05ef404" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "asset" ("id" text NOT NULL, "owner" character varying NOT NULL, "offeredTo" character varying, "createdAt" character varying NOT NULL, "updatedAt" character varying NOT NULL, "documentId" character varying, CONSTRAINT "REL_c82497e54ba94a090f9c5f4bff" UNIQUE ("documentId"), CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "assets_history_type_enum" AS ENUM('ASSET_CREATED', 'ASSET_OFFERED', 'ASSET_OFFER_CANCELED', 'OFFERED_FROM', 'ASSET_OFFER_REJECTED')`);
        await queryRunner.query(`CREATE TABLE "assets_history" ("id" SERIAL NOT NULL, "emittedBy" character varying NOT NULL, "relatedTo" character varying, "type" "assets_history_type_enum" NOT NULL, "at" integer NOT NULL, "timestamp" character varying NOT NULL, "assetId" text, CONSTRAINT "PK_1f7595e9ab365dc62f48a6f6a05" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "asset" ADD CONSTRAINT "FK_c82497e54ba94a090f9c5f4bffb" FOREIGN KEY ("documentId") REFERENCES "did_document_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets_history" ADD CONSTRAINT "FK_020ff844a6bc1784e22f4e895f5" FOREIGN KEY ("assetId") REFERENCES "asset"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assets_history" DROP CONSTRAINT "FK_020ff844a6bc1784e22f4e895f5"`);
        await queryRunner.query(`ALTER TABLE "asset" DROP CONSTRAINT "FK_c82497e54ba94a090f9c5f4bffb"`);
        await queryRunner.query(`DROP TABLE "assets_history"`);
        await queryRunner.query(`DROP TYPE "assets_history_type_enum"`);
        await queryRunner.query(`DROP TABLE "asset"`);
        await queryRunner.query(`DROP TABLE "did_document_entity"`);
    }

}
