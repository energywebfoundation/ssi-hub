import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { StatusListVerifiableCredentialDto } from '../dtos/status-list-verifiable-credential.dto';
import { NamespaceRevocations } from './namespace-revocations.entity';

@Entity()
export class StatusListCredential {
  static create(data: StatusListCredential): StatusListCredential {
    const entity = new StatusListCredential();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  id: string;

  @Column({ type: 'jsonb', nullable: true })
  vc?: StatusListVerifiableCredentialDto;

  @ManyToOne(() => NamespaceRevocations)
  namespace: NamespaceRevocations;
}
