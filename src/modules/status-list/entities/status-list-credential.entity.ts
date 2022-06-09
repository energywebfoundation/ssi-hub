import { Column, Entity, PrimaryColumn } from 'typeorm';
import { StatusListVerifiableCredentialDto } from '../dtos/status-list-verifiable-credential.dto';

@Entity()
export class StatusListCredential {
  static create(data: StatusListCredential): StatusListCredential {
    const entity = new StatusListCredential();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  statusListId: string;

  @Column({ type: 'jsonb', nullable: true })
  vc?: StatusListVerifiableCredentialDto;
}
