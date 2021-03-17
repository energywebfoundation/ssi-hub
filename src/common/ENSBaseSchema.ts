import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEnsDefinition } from './ENSBaseEntity';
import { JSONObject } from './json.scalar';

@ObjectType()
export class BaseEnsDefinitionSchema implements BaseEnsDefinition {
  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  websiteUrl?: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field(() => JSONObject, { nullable: true })
  others?: Record<string, unknown>;
}
