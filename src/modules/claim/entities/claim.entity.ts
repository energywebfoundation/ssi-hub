import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IClaim } from '../claim.types';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';

@ObjectType()
@Entity()
export class Claim implements IClaim {
  static create(data: Partial<IClaim>): IClaim {
    const entity = new Claim();
    const jwt = new JWT(new Keys());
    const tokenData = jwt.decode(data.issuedToken) as Record<string, string>;
    data.issuedAt = tokenData.iat || Date.now().toString();
    data.subject = tokenData.sub;
    Object.assign(entity, data);
    return entity;
  }

  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  issuedToken: string;

  @Field()
  @Column()
  issuedAt: string;

  @Field()
  @Column()
  subject: string;
}
