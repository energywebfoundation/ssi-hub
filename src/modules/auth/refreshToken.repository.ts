import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refreshToken.model';
import redis, { RedisClient } from 'redis';
import { ConfigService } from '@nestjs/config';
import { promisify } from 'util';
import { classToPlain } from 'class-transformer';

@Injectable()
export class RefreshTokenRepository {
  private client: RedisClient;
  private saveAsync: (key: string, value: string) => Promise<string>;
  private readAsync: (key: string) => Promise<string | undefined>;
  private deleteAsync: (key: string) => Promise<void>;

  constructor(private configService: ConfigService) {
    this.client = redis.createClient({
      port: +this.configService.get<string>('REDIS_PORT'),
      host: this.configService.get<string>('REDIS_HOST'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
    });
    this.saveAsync = promisify(this.client.set).bind(this.client);
    this.readAsync = promisify(this.client.get).bind(this.client);
    this.deleteAsync = promisify(this.client.del).bind(this.client);
  }

  public async createRefreshToken({ userDid }: { userDid: string }) {
    const refreshToken = classToPlain(new RefreshToken({ userDid }));
    await this.saveAsync(refreshToken.tokenId, JSON.stringify(refreshToken));
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
