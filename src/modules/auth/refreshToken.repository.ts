import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refreshToken.model';
import { createClient as createRedisClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { classToPlain } from 'class-transformer';
import parseDuration from 'parse-duration';
import { Logger } from '../logger/logger.service';

@Injectable()
export class RefreshTokenRepository {
  private client: RedisClientType;

  constructor(
    private configService: ConfigService,
    private readonly logger: Logger
  ) {
    const REDIS_HOST = this.configService.get<string>('REDIS_HOST');
    const REDIS_PORT = this.configService.get<string>('REDIS_PORT');

    this.client = createRedisClient({
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      password: this.configService.get<string>('REDIS_PASSWORD'),
    });

    this.logger.setContext(RefreshTokenRepository.name);

    this.client.connect().catch((err) => {
      this.logger.error(`cannot connect to the redis server ${err}`);
    });
  }

  public async createRefreshToken({ userDid }: { userDid: string }) {
    const refreshToken = classToPlain(new RefreshToken({ userDid }));
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
