import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fs from 'fs';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => {
          if (req && req.cookies) {
            return req.cookies[
              configService.get<string>('JWT_ACCESS_TOKEN_NAME')
            ] as string;
          }
          return undefined;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(
        configService.get<string>('JWT_PUBLIC_KEY_PATH')
      ),
      algorithms: ['RS256'],
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(payload: any) {
    return payload;
  }
}
