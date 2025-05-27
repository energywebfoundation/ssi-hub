import path from 'path';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

export const getDBConfig = (configService: ConfigService) => {
  const typeormLogging = configService.get<string>('TYPEORM_LOGGING');
  const logging =
    typeof typeormLogging === 'boolean'
      ? typeormLogging
      : (typeormLogging.split(',') as LoggerOptions);
  const logger = configService.get<string>('TYPEORM_LOGGER', 'file') as
    | 'file'
    | 'debug'
    | 'advanced-console'
    | 'simple-console';

  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<string>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    migrations: [path.join(__dirname + '/..') + '/migrations/**/*{.ts,.js}'],
    migrationsRun: true,
    migrationsTableName: 'migrations_iam_cache_server',
    logging,
    logger,
    autoLoadEntities: true,
    // Options from pool config https://node-postgres.com/api/pool
    extra: {
      max: configService.get<number>('DB_MAXIMUM_CONNECTION_POOL', 10),
      connectionTimeoutMillis: configService.get<number>(
        'DB_CONNECTION_TIMEOUT',
        3000
      ),
      idleTimeoutMillis: configService.get<number>(
        'DB_CONNECTION_TIMEOUT_IDLE',
        10000
      ),
    },
  };

  return config;
};
