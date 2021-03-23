import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DIDDocumentEntity } from '../did/did.entity';
import { AssetHistoryEvent, AssetHistoryEventType } from './assets.event';

@ObjectType()
@Entity()
export class Asset {
  static create(data: Partial<Asset>) {
    const entity = new Asset();
    Object.assign(entity, data);
    return entity;
  }
  @PrimaryColumn({ type: 'text' })
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  owner: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  offeredTo?: string;

  @Column()
  @Field()
  createdAt: string;

  @Column()
  @Field()
  updatedAt: string;

  @OneToOne(
    () => DIDDocumentEntity,
    did => did.id,
    { eager: true },
  )
  @JoinColumn()
  @Field(() => DIDDocumentEntity)
  document: DIDDocumentEntity;

  @OneToMany(
    () => AssetsHistory,
    history => history.asset,
  )
  history: AssetsHistory[];
}

@ObjectType()
@Entity()
export class AssetsHistory implements AssetHistoryEvent {
  static create(
    data: Omit<AssetsHistory, 'id'> & ({ asset: Asset } | { assetId: string }),
  ) {
    const entity = new AssetsHistory();
    Object.assign(entity, data);
    return entity;
  }
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  emittedBy: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  relatedTo?: string;

  @Column({ type: 'enum', enum: AssetHistoryEventType })
  @Field()
  type: AssetHistoryEventType;

  @Column()
  @Field()
  at: number;

  @Column()
  @Field()
  timestamp: string;

  @ManyToOne(
    () => Asset,
    asset => asset.history,
  )
  @JoinColumn({ name: 'assetId' })
  asset?: Asset;

  // Added to be able to query base on the related assetId
  @Column({ nullable: true })
  assetId?: string;
}
