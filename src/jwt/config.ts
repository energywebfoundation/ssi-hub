import fs from 'fs';
import { promisify } from 'util';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

const readFile = promisify(fs.readFile);

export const getJWTConfig = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => {
  const [publicKey, privateKey] = await Promise.all([
    readFile(configService.get<string>('JWT_PUBLIC_KEY')),
    readFile(configService.get<string>('JWT_PRIVATE_KEY')),
  ]);

  return {
    privateKey,
    publicKey,
    signOptions: {
      algorithm: 'RS256',
      expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    },
    verifyOptions: {
      algorithms: ['RS256'],
    },
  };
};
