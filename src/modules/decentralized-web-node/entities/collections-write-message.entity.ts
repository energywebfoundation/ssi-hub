import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MessageDto } from '../dtos/message.dto';

@Entity()
export class CollectionsWriteMessage {
  static create(
    data: Omit<CollectionsWriteMessage, 'id'>
  ): CollectionsWriteMessage {
    const entity = new CollectionsWriteMessage();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  objectId: string;

  @Column()
  target: string;

  @Column({ nullable: true })
  data?: string;

  @Column('jsonb')
  message: MessageDto;

  @Column()
  method: string;

  @Column({ nullable: true })
  schema?: string;

  @Column({ nullable: true })
  dataFormat?: string;

  @Column({ type: 'timestamptz' })
  dateCreated: string;

  @Column({ nullable: true, type: 'timestamptz' })
  datePublished?: string;

  @Column({ nullable: true })
  cid?: string;
}
