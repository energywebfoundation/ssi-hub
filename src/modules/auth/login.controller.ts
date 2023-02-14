import {
  Controller,
  Get,
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
import { LoginGuard } from './login.guard';
import { TokenService } from './token.service';
import { CookiesServices } from './cookies.service';
import { RoleService } from '../role/role.service';

@ApiTags('Auth')
@Controller({ version: '1' })
export class LoginController {
  private cookiesServices = new CookiesServices();
  constructor(
    private tokenService: TokenService,
    private configService: ConfigService,
    private roleService: RoleService
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

    const cookiesOptions = this.cookiesServices.getCookiesOption();

    const [token, refreshToken] = await Promise.all([
      this.tokenService.generateAccessToken({ did, verifiedRoles, origin }),
      this.tokenService.generateRefreshToken({
        userDid: did,
      }),
    ]);

    res.cookie(
      this.configService.get<string>('JWT_ACCESS_TOKEN_NAME'),
      token,
      cookiesOptions
    );

    res.cookie(
      this.configService.get<string>('JWT_REFRESH_TOKEN_NAME'),
      refreshToken,
      cookiesOptions
    );

    res.send({ token, refreshToken });
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
      throw new UnauthorizedException();
    }

    const { userDid, tokenId } =
      (await this.tokenService.verifyRefreshToken(refreshTokenString)) || {};

    const verifiedRoles = await this.roleService.verifyUserRoles(userDid);

    if (!tokenId || !userDid) {
      throw new UnauthorizedException();
    }

    const cookiesOptions = this.cookiesServices.getCookiesOption();

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

    res.cookie(
      this.configService.get<string>('JWT_ACCESS_TOKEN_NAME'),
      token,
      cookiesOptions
    );

    res.cookie(
      this.configService.get<string>('JWT_REFRESH_TOKEN_NAME'),
      refreshToken,
      {
        ...cookiesOptions,
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
