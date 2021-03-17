import { Field, ObjectType } from '@nestjs/graphql';
import { JSONObject } from '../../common/json.scalar';
import {
  EnrolmentPrecondition,
  Fields,
  Issuer,
  RoleDefinition,
} from './role.types';

@ObjectType()
export class RoleDefinitionSchema implements RoleDefinition {
  @Field()
  roleType: string;

  @Field()
  roleName: string;

  @Field(() => [FieldsSchema], { nullable: true })
  fields?: Fields[];

  @Field(() => JSONObject, { nullable: true })
  metadata?: Record<string, unknown>;

  @Field(() => IssuerSchema)
  issuer: Issuer;

  @Field()
  version: string;

  @Field(() => [EnrolmentPreconditionSchema], { nullable: true })
  enrolmentPreconditions?: EnrolmentPrecondition[];
}

@ObjectType()
export class FieldsSchema implements Fields {
  @Field()
  fieldType: string;

  @Field()
  label: string;

  @Field({ nullable: true })
  required?: boolean;

  @Field({ nullable: true })
  minLength?: number;

  @Field({ nullable: true })
  maxLength?: number;

  @Field({ nullable: true })
  pattern?: string;

  @Field({ nullable: true })
  minValue?: number;

  @Field({ nullable: true })
  maxValue?: number;

  @Field({ nullable: true })
  minDate?: Date;

  @Field({ nullable: true })
  maxDate?: Date;
}

@ObjectType()
export class IssuerSchema implements Issuer {
  @Field()
  issuerType: string;

  @Field(() => [String])
  did: string[];

  @Field({ nullable: true })
  roleName?: string;
}

@ObjectType()
export class EnrolmentPreconditionSchema implements EnrolmentPrecondition {
  @Field()
  type: string;

  @Field(() => [String])
  conditions: string[];
}
