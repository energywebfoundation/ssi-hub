import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChainIDToDIDs1638185287373 implements MigrationInterface {
  name = 'AddChainIDToDIDs1638185287373';
  CHAIN_NAME = process.env.CHAIN_NAME;

  private checkForChainID(): void {
    if (!this.CHAIN_NAME) {
      throw new Error(
        'CHAIN_NAME environment variable is not set. Please set it to your chain ID'
      );
    }
  }

  private getUpUpdateSQL(table: string, column: string): string {
    return `UPDATE public.${table} SET ${column} = 'did:ethr:${this.CHAIN_NAME}:' || split_part(${column},':', 3) WHERE ${column} IS NOT NULL;`;
  }

  private getDownUpdateSQL(table: string, column: string): string {
    return `UPDATE public.${table} SET ${column} = split_part(${column},':', 1) || ':' || split_part(${column},':', 2) || ':' || split_part(${column},':', 4) WHERE ${column} IS NOT NULL;`;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    this.checkForChainID();

    await queryRunner.query("SET session_replication_role = 'replica';");

    // asset table
    await queryRunner.query(this.getUpUpdateSQL('asset', 'id'));
    await queryRunner.query(this.getUpUpdateSQL('asset', 'owner'));
    await queryRunner.query(this.getUpUpdateSQL('asset', `"offeredTo"`));
    await queryRunner.query(this.getUpUpdateSQL('asset', `"documentId"`));

    // assets_history table
    await queryRunner.query(
      this.getUpUpdateSQL('assets_history', `"emittedBy"`)
    );
    await queryRunner.query(
      this.getUpUpdateSQL('assets_history', `"relatedTo"`)
    );
    await queryRunner.query(this.getUpUpdateSQL('assets_history', `"assetId"`));

    // did_contact table
    await queryRunner.query(this.getUpUpdateSQL('did_contact', 'did'));
    await queryRunner.query(this.getUpUpdateSQL('did_contact', 'created_by'));

    // did_document_entity table
    await queryRunner.query(this.getUpUpdateSQL('did_document_entity', 'id'));

    // role_claim table
    await queryRunner.query(this.getUpUpdateSQL('role_claim', 'requester'));
    await queryRunner.query(this.getUpUpdateSQL('role_claim', 'subject'));
    await queryRunner.query(this.getUpUpdateSQL('role_claim', `"acceptedBy"`));

    await queryRunner.query("SET session_replication_role = 'origin';");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    this.checkForChainID();

    await queryRunner.query("SET session_replication_role = 'replica';");

    // asset table
    await queryRunner.query(this.getDownUpdateSQL('asset', 'id'));
    await queryRunner.query(this.getDownUpdateSQL('asset', 'owner'));
    await queryRunner.query(this.getDownUpdateSQL('asset', `"offeredTo"`));
    await queryRunner.query(this.getDownUpdateSQL('asset', `"documentId"`));

    // assets_history table
    await queryRunner.query(
      this.getDownUpdateSQL('assets_history', `"emittedBy"`)
    );
    await queryRunner.query(
      this.getDownUpdateSQL('assets_history', `"relatedTo"`)
    );
    await queryRunner.query(
      this.getDownUpdateSQL('assets_history', `"assetId"`)
    );

    // did_contact table
    await queryRunner.query(this.getDownUpdateSQL('did_contact', 'did'));
    await queryRunner.query(this.getDownUpdateSQL('did_contact', 'created_by'));

    // did_document_entity table
    await queryRunner.query(this.getDownUpdateSQL('did_document_entity', 'id'));
    await queryRunner.query(
      this.getDownUpdateSQL('did_document_entity', 'created_by')
    );

    // role_claim table
    await queryRunner.query(this.getDownUpdateSQL('role_claim', 'requester'));
    await queryRunner.query(this.getDownUpdateSQL('role_claim', 'subject'));
    await queryRunner.query(
      this.getDownUpdateSQL('role_claim', `"acceptedBy"`)
    );

    await queryRunner.query("SET session_replication_role = 'origin';");
  }
}
