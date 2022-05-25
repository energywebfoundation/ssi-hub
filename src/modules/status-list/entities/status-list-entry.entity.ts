import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class StatusListEntry {
  static create(data: Omit<StatusListEntry, 'id'>): StatusListEntry {
    const entity = new StatusListEntry();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  statusListIndex: string;

  @Column()
  statusListCredential: string;
}
