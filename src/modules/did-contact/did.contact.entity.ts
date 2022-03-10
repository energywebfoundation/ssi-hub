import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DIDDocumentEntity } from '../did/did.entity';

@Entity({ name: 'did_contact' })
export class DIDContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ type: 'varchar' })
  did: string;

  @Column({ type: 'text' })
  label: string;

  @ManyToOne(() => DIDDocumentEntity, (didDoc) => didDoc.id)
  @JoinColumn({ name: 'created_by' })
  createdBy: DIDDocumentEntity;

  constructor(didContactDoc: Partial<DIDContact>) {
    Object.assign(this, didContactDoc);
  }
}
