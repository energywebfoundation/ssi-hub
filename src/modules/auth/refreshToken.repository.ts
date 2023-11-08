import { Inject, Injectable } from '@nestjs/common';
import { RefreshToken } from './refreshToken.model';
import { RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { instanceToPlain } from 'class-transformer';
import parseDuration from 'parse-duration';

@Injectable()
export class RefreshTokenRepository {
  constructor(
    private configService: ConfigService,
    @Inject('REDIS_CLIENT') private client: RedisClientType
  ) {}

  public async createRefreshToken({
    userDid,
    origin,
  }: {
    userDid: string;
    origin: string;
  }) {
    const refreshToken = instanceToPlain(new RefreshToken({ userDid, origin }));
    const expire = this.configService.get<string>(
      'JWT_REFRESH_TOKEN_EXPIRES_IN'
    );
    const expireInSec = parseDuration(expire) / 1000;

    await this.client.set(refreshToken.tokenId, JSON.stringify(refreshToken), {
      EX: expireInSec,
    });

    return refreshToken;
  }

  public async getRefreshTokenById(tokenId: string) {
    const refreshTokenString = await this.client.get(tokenId);
    const refreshToken =
      refreshTokenString && (JSON.parse(refreshTokenString) as RefreshToken);
    return refreshToken;
  }

  public deleteRefreshTokenById(tokenId: string) {
    return this.client.del(tokenId);
  }
}
