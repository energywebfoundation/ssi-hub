import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEnsDefinition, BaseEnsEntity } from '../../common/ENSBaseEntity';
import { BaseEnsDefinitionSchema } from '../../common/ENSBaseSchema';
import { Organization } from '../organization/organization.entity';
import { Role } from '../role/role.entity';

interface ApplicationDefinition extends BaseEnsDefinition {
  appName: string;
}

@ObjectType()
class ApplicationDefinitionSchema extends BaseEnsDefinitionSchema
  implements ApplicationDefinition {
  @Field()
  appName: string;
}

@ObjectType()
@Entity()
export class Application implements BaseEnsEntity {
  static create(data: Partial<Application>): Application {
    const entity = new Application();
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
  owner: string;

  @Field()
  @Index()
  @Column()
  namespace: string;

  @Field(() => ApplicationDefinitionSchema)
  @Column({ type: 'jsonb' })
  definition: ApplicationDefinition;

  @ManyToOne(
    () => Organization,
    org => org.apps,
  )
  parentOrg: Organization;

  @Field(() => [Role])
  @OneToMany(
    () => Role,
    role => role.parentApp,
  )
  roles: Role[];
}
