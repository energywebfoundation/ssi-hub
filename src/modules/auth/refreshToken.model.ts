import { v4 as uuid } from 'uuid';

export class RefreshToken {
  tokenId: string = uuid();
  isRevoked = false;
  userDid: string;
  constructor({ userDid }: { userDid: string }) {
    this.userDid = userDid;
  }
}
