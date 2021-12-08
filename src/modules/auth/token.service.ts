import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { RefreshToken } from './refreshToken.model';
import { RefreshTokenRepository } from './refreshToken.repository';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  did: string;
  verifiedRoles: { name: string; namespace: string }[];
  origin: string;
}

@Injectable()
export class TokenService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private refreshTokenRepository: RefreshTokenRepository,
  ) {}
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

  /**
   * Our approach to prevent or at least maximum decrease chances for any CSRF attacks:
   *
   * Provide a Protection using Origin in headers and combining double check with JWT:
   * * Origin is a request header supported in most modern browsers, indicating from where the request originated, **which cannot be modified** <https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin>
   * * We will store the request Origin header in JWT token after login
   * * And with every request our middleware will check if Origin in request headers is matching with origin stored in JTW token(**hacker cannot modify JWT as we are signing it with our secret in backend**)
   * * For node requests we will check if origin in request headers is undefined.
   * * IF ORIGIN IS SAME OR UNDEFINED: everything is fine
   * * IF NO: throw an exception as the origin could be from a hacker's website.
   * * More info(check approach 2, **origin headers**): <https://security.stackexchange.com/questions/203890/how-to-implement-csrf-protection-with-a-cross-origin-request-cors/203910#203910>
   *
   * A pattern such as the double cookie submit pattern cannot be used because the cache-server does not share an origin with it's clients.
   */
  async handleOriginCheck(req: Request, res: Response, next: NextFunction) {
    const authEnabled = this.configService.get<string>('ENABLE_AUTH');
    if (authEnabled === 'false') {
      return next();
    }
    let token = null;
    if (req.headers['authorization']) {
      token = req.headers['authorization'].replace('Bearer ', '');
    } else {
      token = req.cookies?.token;
    }

    if (token) {
      const decodedToken = jwt.decode(token) as TokenPayload;
      const isBrowserRequestFromAuthenticatedOrigin =
        decodedToken?.origin === req.headers['origin'];
      const isServerRequestOrGETFromSameDomain =
        req.headers['origin'] === undefined;
      if (
        isBrowserRequestFromAuthenticatedOrigin ||
        isServerRequestOrGETFromSameDomain
      ) {
        next();
      } else {
        throw new UnauthorizedException('Origins not matched');
      }
    } else {
      throw new UnauthorizedException('Unauthorized');
    }
  }
}
