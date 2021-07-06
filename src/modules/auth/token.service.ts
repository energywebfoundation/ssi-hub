import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { RefreshToken } from './refreshToken.model';
import { RefreshTokenRepository } from './refreshToken.repository';

export interface TokenPayload {
  did: string;
  verifiedRoles: { name: string; namespace: string }[];
  origin: string,
}

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) { }
  async generateAccessToken(data: TokenPayload) {
    return this.jwtService.signAsync(data);
  }

  async generateRefreshToken({ userDid }: { userDid: string }) {
    const refreshToken = await this.refreshTokenRepository.createRefreshToken({
      userDid,
    });

    return this.jwtService.signAsync(refreshToken, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });
  }

  verifyAccessToken(token: string) {
    return this.jwtService.verifyAsync(token);
  }

  async verifyRefreshToken(token: string) {
    const { tokenId, userDid } =
      (this.jwtService.decode(token) as RefreshToken) || {};

    if (!tokenId) {
      throw new UnauthorizedException();
    }

    try {
      await this.jwtService.verifyAsync<RefreshToken>(token);
    } catch (err) {
      await this.invalidateRefreshToken(tokenId);
      throw new UnauthorizedException(err);
    }

    const refreshToken = await this.refreshTokenRepository.getRefreshTokenById(
      tokenId,
    );

    if (
      !refreshToken ||
      refreshToken.isRevoked ||
      userDid !== refreshToken.userDid
    ) {
      throw new UnauthorizedException();
    }
    return refreshToken;
  }

  async invalidateRefreshToken(id: string) {
    return this.refreshTokenRepository.deleteRefreshTokenById(id);
  }

  async handleOriginCheck(req: Request, res: Response, next: NextFunction, service: JwtService) {
    let token = null;

    if (req.headers['authorization']) {
      token = req.headers['authorization'].replace('Bearer ', '');
    } else {
      token = req.cookies.token
    }

    if (token) {
      const decodedToken = service.decode(token) as TokenPayload;
      if (decodedToken.origin === req.headers['origin'] || req.headers['origin'] === undefined) {
        next()
      } else {
        throw new InternalServerErrorException('Something went wrong')
      }
    } else {
      throw new UnauthorizedException('Unauthorized')
    }
  }
}
