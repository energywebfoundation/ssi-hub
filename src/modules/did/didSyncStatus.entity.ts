import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DIDDocumentEntity } from './did.entity';
import { DidSyncStatus } from './did.types';

@Entity()
export class DidSyncStatusEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => DIDDocumentEntity, (document) => document.id, {
    nullable: false,
  })
  @JoinColumn({ name: 'document_id' })
  document: DIDDocumentEntity;

  @Column({ enum: DidSyncStatus, type: 'enum', default: DidSyncStatus.Synced })
  status: DidSyncStatus;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
