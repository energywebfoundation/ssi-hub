import { Injectable } from '@nestjs/common';
import { CookieOptions } from 'express';

@Injectable()
export class CookiesServices {
  getCookiesOption() {
    const cookiesOptions: CookieOptions = {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    };
    return cookiesOptions;
  }
}
