import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DIDEntity {
  static create(data: Partial<DIDEntity>) {
    const entity = new DIDEntity();
    Object.assign(entity, data);
    return entity;
  }
  @PrimaryColumn()
  id: string;

  @Column()
  logs: string;

  @Column({ type: 'jsonb' })
  claims: { serviceEndpoint: string; jwt: string }[];
}
