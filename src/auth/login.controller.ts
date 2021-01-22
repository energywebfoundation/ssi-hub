import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { Request } from 'express';

@Controller()
export class LoginController {
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return { token: req.user as string };
  }
}
