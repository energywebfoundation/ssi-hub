import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1615882913794 implements MigrationInterface {
    name = 'Initial1615882913794'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "namespace" character varying NOT NULL, "owner" character varying NOT NULL, "definition" jsonb NOT NULL, "parentOrgId" integer, "parentAppId" integer, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cd9390aad21b36921c8e6cbea2" ON "role" ("namespace") `);
        await queryRunner.query(`CREATE INDEX "IDX_9402b4b41fdda2ca3099172b4e" ON "role" ("owner") `);
        await queryRunner.query(`CREATE TABLE "organization" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "namespace" character varying NOT NULL, "owner" character varying NOT NULL, "definition" jsonb NOT NULL, "parentOrgId" integer, CONSTRAINT "PK_472c1f99a32def1b0abb219cd67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_75c126259032e19861d6eeab63" ON "organization" ("namespace") `);
        await queryRunner.query(`CREATE INDEX "IDX_3c6d1f0eac0c7d5a4bab3ed75b" ON "organization" ("owner") `);
        await queryRunner.query(`CREATE TABLE "application" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, "namespace" character varying NOT NULL, "definition" jsonb NOT NULL, "parentOrgId" integer, CONSTRAINT "PK_569e0c3e863ebdf5f2408ee1670" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9dbd33e623bd1455fd12abc644" ON "application" ("owner") `);
        await queryRunner.query(`CREATE INDEX "IDX_a8b4bfaac00819b7d87ed0fca4" ON "application" ("namespace") `);
        await queryRunner.query(`CREATE TABLE "claim" ("id" character varying NOT NULL, "requester" character varying NOT NULL, "claimIssuer" text array NOT NULL, "claimType" character varying NOT NULL, "claimTypeVersion" character varying NOT NULL, "token" character varying NOT NULL, "issuedToken" character varying, "isAccepted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "acceptedBy" character varying, "isRejected" boolean DEFAULT false, "parentNamespace" character varying NOT NULL, CONSTRAINT "PK_466b305cc2e591047fa1ce58f81" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "did_entity" ("id" character varying NOT NULL, "logs" character varying NOT NULL, "claims" jsonb NOT NULL, CONSTRAINT "PK_740e3fe1e95d0c814ad9de3e009" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_90e027ac9f7910bda7a80773149" FOREIGN KEY ("parentOrgId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "role" ADD CONSTRAINT "FK_fd9393c77f683ea78e7e04fd86e" FOREIGN KEY ("parentAppId") REFERENCES "application"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organization" ADD CONSTRAINT "FK_f06eded1ef32e1f467de229e302" FOREIGN KEY ("parentOrgId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "application" ADD CONSTRAINT "FK_44cf546f2f694f694752be49870" FOREIGN KEY ("parentOrgId") REFERENCES "organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "application" DROP CONSTRAINT "FK_44cf546f2f694f694752be49870"`);
        await queryRunner.query(`ALTER TABLE "organization" DROP CONSTRAINT "FK_f06eded1ef32e1f467de229e302"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_fd9393c77f683ea78e7e04fd86e"`);
        await queryRunner.query(`ALTER TABLE "role" DROP CONSTRAINT "FK_90e027ac9f7910bda7a80773149"`);
        await queryRunner.query(`DROP TABLE "did_entity"`);
        await queryRunner.query(`DROP TABLE "claim"`);
        await queryRunner.query(`DROP INDEX "IDX_a8b4bfaac00819b7d87ed0fca4"`);
        await queryRunner.query(`DROP INDEX "IDX_9dbd33e623bd1455fd12abc644"`);
        await queryRunner.query(`DROP TABLE "application"`);
        await queryRunner.query(`DROP INDEX "IDX_3c6d1f0eac0c7d5a4bab3ed75b"`);
        await queryRunner.query(`DROP INDEX "IDX_75c126259032e19861d6eeab63"`);
        await queryRunner.query(`DROP TABLE "organization"`);
        await queryRunner.query(`DROP INDEX "IDX_9402b4b41fdda2ca3099172b4e"`);
        await queryRunner.query(`DROP INDEX "IDX_cd9390aad21b36921c8e6cbea2"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
