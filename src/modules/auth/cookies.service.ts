import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';

@Injectable()
export class CookiesServices {
  getCookiesOptionBasedOnUserAgent(userAgent: string) {
    const cookiesOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };
    return cookiesOptions;
  }
}
