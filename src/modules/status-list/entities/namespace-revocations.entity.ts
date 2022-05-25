import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { utils } from 'ethers';
import { StatusListCredential } from './status-list-credential.entity';
import { URL } from 'url';
import { STATUS_LIST_MODULE_PATH } from '../status-list.const';
import { StatusList2021EntryDto } from '../dtos/credential-status.dto';

@Entity()
export class NamespaceRevocations {
  static create(
    data: Pick<NamespaceRevocations, 'namespace'> & {
      id?: string;
    }
  ): NamespaceRevocations {
    const entity = new NamespaceRevocations();
    Object.assign(entity, data);

    if (!data.id) {
      entity.id = utils.namehash(data.namespace);
    }

    return entity;
  }

  // Namehash length https://docs.ens.domains/contract-api-reference/name-processing
  @PrimaryColumn({ length: 256 })
  id: string;

  @Column({ unique: true })
  namespace: string;

  @OneToMany(
    () => StatusListCredential,
    (statusListCredential) => statusListCredential.namespace,
    { cascade: true }
  )
  statusListCredentials: StatusListCredential[];

  public createEntry(
    statusListDomain: string,
    credentialId: string
  ): StatusList2021EntryDto {
    const statusListCredential = new URL(
      `${STATUS_LIST_MODULE_PATH}/${credentialId}`,
      statusListDomain
    ).href;

    this.statusListCredentials.push(
      StatusListCredential.create({ id: statusListCredential, namespace: this })
    );

    return {
      type: 'StatusList2021Entry',
      statusPurpose: 'revocation',
      statusListIndex: '0',
      statusListCredential,
    };
  }
}
