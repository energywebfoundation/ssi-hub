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

  @OneToOne(() => DIDDocumentEntity, (document) => document.id)
  @JoinColumn()
  document: string;

  @Column({ enum: DidSyncStatus, type: 'enum' })
  status: DidSyncStatus;

  @CreateDateColumn()
  createdDate: Date;
}
