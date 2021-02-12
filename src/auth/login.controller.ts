import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { CookieOptions, Request, Response } from 'express';
import { ApiBody } from '@nestjs/swagger';
import useragent from 'useragent';

@Controller()
export class LoginController {
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
    const cookiesOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };
    const { family, major } = useragent.parse(req.headers['user-agent']) || {};
    if (family === 'Chrome' && +major >= 51 && +major <= 66) {
      delete cookiesOptions.sameSite;
      delete cookiesOptions.secure;
    }
    res.cookie('token', req.user, cookiesOptions);
    return res.send({ token: req.user });
  }
}
