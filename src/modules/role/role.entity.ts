import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Application } from '../application/application.entity';
import { BaseEnsEntity } from '../../common/ENSBaseEntity';
import { Organization } from '../organization/organization.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { RoleDefinitionSchema } from './role.schema';
import { IRoleDefinition } from '@energyweb/iam-contracts';

@ObjectType()
@Entity()
export class Role implements BaseEnsEntity {
  static create(data: Partial<Role>): Role {
    const entity = new Role();
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

  @Field(() => RoleDefinitionSchema)
  @Column({ type: 'jsonb' })
  definition: IRoleDefinition;

  @ManyToOne(() => Organization, (org) => org.roles)
  parentOrg: Organization;

  @ManyToOne(() => Application, (app) => app.roles)
  parentApp: Application;
}
