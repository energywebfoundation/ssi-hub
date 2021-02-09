import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { Request, Response } from 'express';
import { ApiBody } from '@nestjs/swagger';

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
    res.cookie('token', req.user, {
      httpOnly: true,
    });
    return res.send({ token: req.user });
  }
}
