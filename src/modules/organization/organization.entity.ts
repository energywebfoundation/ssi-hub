import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from '../application/application.entity';
import { BaseEnsDefinition, BaseEnsEntity } from '../../common/ENSBaseEntity';
import { Role } from '../role/role.entity';
import { BaseEnsDefinitionSchema } from '../../common/ENSBaseSchema';
import { Field, ID, ObjectType } from '@nestjs/graphql';

interface OrganizationDefinition extends BaseEnsDefinition {
  orgName: string;
}

@ObjectType()
class OrganizationDefinitionSchema extends BaseEnsDefinitionSchema
  implements OrganizationDefinition {
  @Field()
  orgName: string;
}

@ObjectType()
@Entity()
export class Organization implements BaseEnsEntity {
  static create(data: Partial<Organization>): Organization {
    const entity = new Organization();
    Object.assign(entity, data);
    return entity;
  }
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Index()
  @Column()
  namespace: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  namehash?: string;

  @Field()
  @Index()
  @Column()
  owner: string;

  @Field(() => OrganizationDefinitionSchema)
  @Column({ type: 'jsonb' })
  definition: OrganizationDefinition;

  @Field(() => [Application])
  @OneToMany(
    () => Application,
    app => app.parentOrg,
  )
  apps: Application[];

  @ManyToOne(
    () => Organization,
    org => org.subOrgs,
  )
  parentOrg: Organization;

  @Field(() => [Organization])
  @OneToMany(
    () => Organization,
    org => org.parentOrg,
  )
  subOrgs: Organization[];

  @Field(() => [Role])
  @OneToMany(
    () => Role,
    role => role.parentOrg,
  )
  roles: Role[];
}
