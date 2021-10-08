import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { IClaim, RegistrationTypes } from './claim.types';
import { IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';

@ObjectType()
@Entity()
export class Claim implements IClaim {
  static create(data: Partial<Claim>): Claim {
    const entity = new Claim();
    const jwt = new JWT(new Keys());
    data.subject = jwt.decode(data.token).sub as string;
    Object.assign(entity, data);
    return entity;
  }

  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  requester: string;

  @Column()
  subject: string;

  @Field()
  @Column()
  claimType: string;

  @Column({
    type: 'enum',
    array: true,
    enum: RegistrationTypes,
    default: [RegistrationTypes.OffChain],
  })
  registrationTypes: RegistrationTypes[];

  @Field()
  @Column()
  claimTypeVersion: string;

  @Field()
  @Column()
  token: string;

  @Column({ nullable: true })
  subjectAgreement?: string;

  @Column({ nullable: true })
  onChainProof?: string;

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
  namespace: string;
}

export class DIDsQuery {
  @IsArray()
  @Transform((value: string) => value.split(','))
  subjects: string[];
}
