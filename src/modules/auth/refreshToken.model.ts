import { v4 as uuid } from 'uuid';

export class RefreshToken {
  tokenId: string = uuid();
  isRevoked = false;
  userDid: string;
  origin: string;
  constructor({ userDid, origin }: { userDid: string; origin: string }) {
    this.userDid = userDid;
    this.origin = origin;
  }
}
