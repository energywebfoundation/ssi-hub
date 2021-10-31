import {
  IServiceEndpoint,
  IDIDDocument,
  IAuthentication,
  ILinkedDataProof,
  IPublicKey,
} from '@ew-did-registry/did-resolver-interface';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { JSONObject } from '../../common/json.scalar';

interface ProfileClaim {
  profile?: any;
}

interface ENSClaim {
  claimType?: string;
  claimTypeVersion?: string;
}

export interface IClaim extends IServiceEndpoint, ProfileClaim, ENSClaim {}

@ObjectType()
class AuthenticationSchema implements IAuthentication {
  @Field(() => Int, { nullable: true })
  block?: number;

  @Field()
  publicKey: string;

  @Field()
  type: string;

  @Field(() => JSONObject)
  validity: any;

  [key: string]: string | number;
}

@ObjectType()
class ProofSchema implements ILinkedDataProof {
  @Field()
  created: string;

  @Field()
  creator: string;

  @Field()
  signatureValue: string;

  @Field()
  type: string;
}

@ObjectType()
class PublicKeySchema implements IPublicKey {
  @Field(() => Int, { nullable: true })
  block: number;

  @Field()
  controller: string;

  @Field({ nullable: true })
  ethereumAddress?: string;

  @Field()
  id: string;

  @Field({ nullable: true })
  publicKeyBase58?: string;

  @Field({ nullable: true })
  publicKeyBase64?: string;

  @Field({ nullable: true })
  publicKeyHex?: string;

  @Field({ nullable: true })
  publicKeyJwk?: string;

  @Field({ nullable: true })
  publicKeyMultibase?: string;

  @Field({ nullable: true })
  publicKeyPem: string;

  @Field({ nullable: true })
  type: string;

  @Field(() => JSONObject, { nullable: true })
  validity: any;

  [key: string]: string | number;
}

@ObjectType()
class ClaimSchema implements IClaim {
  @Field(() => Int, { nullable: true })
  block: number;

  @Field({ nullable: true })
  claimType?: string;

  @Field({ nullable: true })
  claimTypeVersion?: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  hash: string;

  @Field({ nullable: true })
  id: string;

  @Field(() => JSONObject, { nullable: true })
  profile?: any;

  @Field()
  serviceEndpoint: string;

  @Field({ nullable: true })
  type: string;

  @Field(() => JSONObject, { nullable: true })
  validity: any;

  [key: string]: string | number;
}

@Entity()
@ObjectType()
export class DIDDocumentEntity implements IDIDDocument {
  static create(data: Partial<DIDDocumentEntity>) {
    const entity = new DIDDocumentEntity();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  @Field(() => ID)
  id: string;

  @Column({ type: 'jsonb' })
  @Field(() => [ClaimSchema], { nullable: true })
  service: IClaim[];

  @Column({ type: 'jsonb' })
  @Field(() => [AuthenticationSchema])
  authentication: (IAuthentication | string)[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  created?: string;

  @Column('text', { array: true, nullable: true })
  @Field(() => [String], { nullable: true })
  delegates?: string[];

  @Column({ type: 'jsonb', nullable: true })
  @Field(() => ProofSchema, { nullable: true })
  proof?: ILinkedDataProof;

  @Column({ type: 'jsonb' })
  @Field(() => [PublicKeySchema])
  publicKey: IPublicKey[];

  @Column({ nullable: true })
  @Field({ nullable: true })
  updated?: string;

  @Column()
  '@context': string;

  @Column()
  logs: string;
}
