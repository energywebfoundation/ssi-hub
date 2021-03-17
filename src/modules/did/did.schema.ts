import {
  IServiceEndpoint,
  IDIDDocument,
  IAuthentication,
  ILinkedDataProof,
  IPublicKey,
} from '@ew-did-registry/did-resolver-interface';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { JSONObject } from '../../common/json.scalar';

interface ProfileClaim {
  profile?: any;
}

interface ENSClaim {
  claimType?: string;
  claimTypeVersion?: string;
}

interface IClaim extends IServiceEndpoint, ProfileClaim, ENSClaim {}

@ObjectType()
class AuthenticationSchema implements IAuthentication {
  @Field(() => Int, { nullable: true })
  block?: number;

  @Field()
  publicKey: string;

  @Field()
  type: string;

  @Field(() => Int)
  validity?: any;
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
  block?: number;

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

  @Field(() => Int, { nullable: true })
  validity?: any;

  [key: string]: string | number;
}

@ObjectType()
class ClaimSchema implements IClaim {
  @Field(() => Int, { nullable: true })
  block?: number;

  @Field({ nullable: true })
  claimType?: string;

  @Field({ nullable: true })
  claimTypeVersion?: string;

  @Field()
  description: string;

  @Field()
  hash: string;

  @Field()
  id: string;

  @Field(() => JSONObject, { nullable: true })
  profile?: any;

  @Field()
  serviceEndpoint: string;

  @Field()
  type: string;

  @Field(() => Int)
  validity: any;

  [key: string]: string | number;
}

@ObjectType()
export class DIDDocumentSchema implements IDIDDocument {
  @Field(() => [ClaimSchema], { nullable: true })
  service?: IServiceEndpoint[];

  @Field(() => [AuthenticationSchema])
  authentication: IAuthentication[];

  @Field({ nullable: true })
  created?: string;

  @Field(() => [String], { nullable: true })
  delegates?: string[];

  @Field(() => ID)
  id: string;

  @Field(() => ProofSchema, { nullable: true })
  proof?: ILinkedDataProof;

  @Field(() => [PublicKeySchema])
  publicKey: IPublicKey[];

  @Field({ nullable: true })
  updated?: string;

  '@context': string;
}
