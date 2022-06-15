import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { utils } from 'ethers';
import { URL } from 'url';
import { STATUS_LIST_MODULE_PATH } from '../status-list.const';
import { StatusList2021EntryDto } from '../dtos/credential-status.dto';
import { NamespaceStatusList } from './namespace-status-list.entity';

@Entity()
export class NamespaceStatusLists {
  static create(
    data: Pick<NamespaceStatusLists, 'namespace'> & {
      id?: string;
    }
  ): NamespaceStatusLists {
    const entity = new NamespaceStatusLists();
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
    () => NamespaceStatusList,
    (namespaceStatusList) => namespaceStatusList.namespace,
    { cascade: true }
  )
  lists: NamespaceStatusList[];

  public createEntry(
    statusListDomain: string,
    credentialId: string
  ): StatusList2021EntryDto {
    const statusListCredential = new URL(
      `${STATUS_LIST_MODULE_PATH}/${credentialId}`,
      statusListDomain.endsWith('/') ? statusListDomain : `${statusListDomain}/`
    ).href;

    this.lists.push(
      NamespaceStatusList.create({ statusListId: statusListCredential })
    );

    return {
      id: statusListCredential,
      type: 'StatusList2021Entry',
      statusPurpose: 'revocation',
      statusListIndex: '0', // because we are using one-to-one mapping
      statusListCredential,
    };
  }

  public hasList(statusListId: string): boolean {
    return !!this.lists.find((item) => item.statusListId === statusListId);
  }
}
