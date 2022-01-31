import { Field, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';
import { IRoleClaim, RegistrationTypes } from '../claim.types';

@ObjectType()
@Entity({ name: 'role_claim' })
export class RoleClaim implements IRoleClaim {
  static create(data: Partial<RoleClaim>): RoleClaim {
    const entity = new RoleClaim();
    const jwt = new JWT(new Keys());
    if (!data.subject && data.token) {
      data.subject = (jwt.decode(data.token) as { sub: string }).sub;
    }
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
  @Column({ nullable: true })
  token?: string;

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

  @Field({ nullable: true })
  @Column({ nullable: true })
  rejectionReason?: string;

  @Field()
  @Column()
  namespace: string;
}

export class DIDsQuery {
  @IsArray()
  @Transform(({ value }) => value.split(','))
  subjects: string[];
}
