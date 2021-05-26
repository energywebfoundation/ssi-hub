import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn, AfterLoad } from 'typeorm';
import { IClaim } from './claim.types';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';

@ObjectType()
@Entity()
export class Claim implements IClaim {
  static create(data: Partial<Claim>): Claim {
    const entity = new Claim();
    Object.assign(entity, data);
    return entity;
  }
  
  @AfterLoad()
  init() {
    const jwt = new JWT(new Keys());
    this.subject = jwt.decode(this.token).sub as string;
  }

  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  requester: string;
  
  @Column()
  subject: string;

  @Field(() => [String])
  @Column('text', { array: true })
  claimIssuer: string[];

  @Field()
  @Column()
  claimType: string;

  @Field()
  @Column()
  claimTypeVersion: string;

  @Field()
  @Column()
  token: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  issuedToken?: string | null;

  @Field()
  @Column({ type: 'bool', default: false })
  isAccepted: boolean;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  acceptedBy?: string | null;

  @Field({ nullable: true })
  @Column({ nullable: true, type: 'bool', default: false })
  isRejected?: boolean | null;

  @Field()
  @Column()
  parentNamespace: string;
}
