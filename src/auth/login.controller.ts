import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { Request } from 'express';
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
  async login(@Req() req: Request) {
    return { token: req.user as string };
  }
}
