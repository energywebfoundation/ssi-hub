import {
  Body,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import ms from 'ms';
import { RedisClientType } from 'redis';
import { SiweMessage, generateNonce } from 'siwe';
import parseDuration from 'parse-duration';
import { LoginGuard } from './login.guard';
import { TokenService } from './token.service';
import { RoleService } from '../role/role.service';
import { SiweReqPayloadDTO } from './siwe.dto';

@ApiTags('Auth')
@Controller({ version: '1' })
export class LoginController {
  // Using "private readonly" class members so that automated scan can be certain that cookie options are set appropriately
  private readonly cookieIsHttpOnly = true;
  private readonly cookieIsSecure = true;
  private readonly cookieSameSite = 'none';

  constructor(
    private tokenService: TokenService,
    private configService: ConfigService,
    private roleService: RoleService,
    @Inject('REDIS_CLIENT') private redis: RedisClientType
  ) {}

  @UseGuards(LoginGuard)
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        identityToken: {
          type: 'string',
        },
      },
    },
  })
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response) {
    const origin = req.headers['origin'];
    const { did, verifiedRoles } =
      (req.user as {
        did: string;
        verifiedRoles: { name: string; namespace: string }[];
      }) || {};

    if (!did) {
      throw new UnauthorizedException();
    }

    const [token, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken({ did, verifiedRoles, origin }),
      this.tokenService.generateRefreshToken({
        userDid: did,
      }),
    ]);

    res.cookie(this.configService.get<string>('JWT_ACCESS_TOKEN_NAME'), token, {
      httpOnly: this.cookieIsHttpOnly,
      sameSite: this.cookieSameSite,
      secure: this.cookieIsSecure,
    });

    res.cookie(
      this.configService.get<string>('JWT_REFRESH_TOKEN_NAME'),
      refreshToken,
      {
        httpOnly: this.cookieIsHttpOnly,
        sameSite: this.cookieSameSite,
        secure: this.cookieIsSecure,
      }
    );

    res.send({ token, refreshToken });
  }

  @Post('login/siwe/initiate')
  async initiateSiweLogin(@Res() res: Response) {
    const nonce = generateNonce();
    const expire = this.configService.get<string>('SIWE_NONCE_EXPIRES_IN');
    const expireInSec = parseDuration(expire) / 1000;
    await this.redis.set(nonce, 'true', { EX: expireInSec });
    res.send({ nonce });
  }

  @UseGuards(LoginGuard)
  @ApiBody({ type: SiweReqPayloadDTO })
  @Post('login/siwe/verify')
  async loginSiwe(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    { message }: SiweReqPayloadDTO
  ) {
    const { nonce } = new SiweMessage(message);

    if (!(await this.redis.exists(nonce))) {
      throw new UnauthorizedException(
        'Authentication with SIWE was not initiated'
      );
    }

    let isAuthenticating: string;
    try {
      isAuthenticating = await this.redis.getSet(nonce, 'false');
    } catch (e) {
      throw new InternalServerErrorException(
        'SIWE authentication nonce is not string'
      );
    }

    // If authentication was initiated and not yet completed
    if (isAuthenticating === 'true') {
      return this.login(req, res);
    } else if (isAuthenticating === 'false') {
      throw new UnauthorizedException(
        'Authentication with SIWE completed already'
      );
    } else {
      throw new InternalServerErrorException(
        'SIWE authentication nonce is not boolean string'
      );
    }
  }

  @ApiQuery({ name: 'refresh_token', required: false })
  @Get('refresh_token')
  async refreshToken(
    @Req() req: Request,
    @Res() res: Response,
    @Query('refresh_token') refresh_token?: string
  ) {
    const origin = req.headers['origin'];
    const refreshTokenString =
      req.cookies[this.configService.get<string>('JWT_REFRESH_TOKEN_NAME')] ||
      refresh_token;

    if (!refreshTokenString) {
      throw new UnauthorizedException('Refresh token was not set');
    }

    this.tokenService.matchOriginAgainstRequest(refreshTokenString, req);

    const { userDid, tokenId } =
      (await this.tokenService.verifyRefreshToken(refreshTokenString)) || {};

    const verifiedRoles = await this.roleService.verifyUserRoles(userDid);

    if (!tokenId || !userDid) {
      throw new UnauthorizedException();
    }

    const [token, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken({
        did: userDid,
        verifiedRoles,
        origin,
      }),
      this.tokenService.generateRefreshToken({
        userDid,
      }),
      this.tokenService.invalidateRefreshToken(tokenId),
    ]);

    res.cookie(this.configService.get<string>('JWT_ACCESS_TOKEN_NAME'), token, {
      httpOnly: this.cookieIsHttpOnly,
      sameSite: this.cookieSameSite,
      secure: this.cookieIsSecure,
    });

    res.cookie(
      this.configService.get<string>('JWT_REFRESH_TOKEN_NAME'),
      refreshToken,
      {
        httpOnly: this.cookieIsHttpOnly,
        sameSite: this.cookieSameSite,
        secure: this.cookieIsSecure,
        expires: new Date(
          Date.now() +
            ms(this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'))
        ),
      }
    );

    return res.send({ token, refreshToken });
  }

  @Get('auth/status')
  @ApiBearerAuth()
  async status(@Req() req: Request) {
    const accessTokenString =
      req.headers['authorization']?.replace('Bearer ', '') ||
      req.cookies[this.configService.get<string>('JWT_ACCESS_TOKEN_NAME')];

    if (!accessTokenString) {
      return {
        user: null,
      };
    }

    try {
      const tokenData = await this.tokenService.verifyAccessToken(
        accessTokenString
      );

      return {
        user: tokenData?.did || null,
      };
    } catch {
      return {
        user: null,
      };
    }
  }
}
