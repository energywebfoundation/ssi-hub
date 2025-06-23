import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const REDIS_HOST = configService.get<string>('REDIS_HOST');
        const REDIS_PORT = configService.get<string>('REDIS_PORT');

        const client = createClient({
          url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
          password: configService.get<string>('REDIS_PASSWORD'),
        });

        try {
          await client.connect();
          return client;
        } catch (err) {
          (err) => {
            throw new Error(`cannot connect to the redis server ${err}`);
          };
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
