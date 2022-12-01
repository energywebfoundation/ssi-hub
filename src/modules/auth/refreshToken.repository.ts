import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refreshToken.model';
import { createClient as redisCreateClient, RedisClientType } from 'redis';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';
import { classToPlain } from 'class-transformer';
import parseDuration from 'parse-duration';
import { Logger } from '../logger/logger.service';

@Injectable()
export class RefreshTokenRepository {
  private client: RedisClientType;
  private saveAsync: (
    key: string,
    value: string,
    mode: string,
    duration: number
  ) => Promise<string>;
  private readAsync: (key: string) => Promise<string | undefined>;
  private deleteAsync: (key: string) => Promise<void>;

  constructor(
    private configService: ConfigService,
    private readonly logger: Logger
  ) {
    const REDIS_HOST = this.configService.get<string>('REDIS_HOST');
    const REDIS_PORT = this.configService.get<string>('REDIS_PORT');

    this.client = redisCreateClient({
      legacyMode: true,
      url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
      password: this.configService.get<string>('REDIS_PASSWORD'),
    });

    this.logger.setContext(RefreshTokenRepository.name);

    this.saveAsync = promisify(this.client.set).bind(this.client);
    this.readAsync = promisify(this.client.get).bind(this.client);
    this.deleteAsync = promisify(this.client.del).bind(this.client);

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
    await this.saveAsync(
      refreshToken.tokenId,
      JSON.stringify(refreshToken),
      'EX',
      expireInSec
    );
    return refreshToken;
  }

  public async getRefreshTokenById(tokenId: string) {
    const refreshTokenString = await this.readAsync(tokenId);
    const refreshToken =
      refreshTokenString && (JSON.parse(refreshTokenString) as RefreshToken);
    return refreshToken;
  }

  public deleteRefreshTokenById(tokenId: string) {
    return this.deleteAsync(tokenId);
  }
}
