import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';
import useragent from 'useragent';

@Injectable()
export class CookiesServices {
  getCookiesOptionBasedOnUserAgent(userAgent: string) {
    const cookiesOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };
    const { family, major } = useragent.parse(userAgent) || {};
    if (family === 'Chrome' && +major >= 51 && +major <= 66) {
      delete cookiesOptions.sameSite;
      delete cookiesOptions.secure;
    }
    return cookiesOptions;
  }
}
