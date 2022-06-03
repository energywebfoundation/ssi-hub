import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NamespaceStatusLists } from './namespace-status-lists.entity';

@Entity()
export class NamespaceStatusList {
  static create(
    data: Omit<NamespaceStatusList, 'id' | 'namespace'> & {
      id?: string;
    }
  ): NamespaceStatusList {
    const entity = new NamespaceStatusList();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  statusListId: string;

  @ManyToOne(
    () => NamespaceStatusLists,
    (namespaceStatusList) => namespaceStatusList.lists
  )
  namespace: NamespaceStatusLists;
}
