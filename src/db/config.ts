import fs from 'fs';
import path from 'path';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getDBConfig = (configService: ConfigService) => {
  const isProduction = configService.get<string>('NODE_ENV') === 'production';

  const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: +configService.get<string>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    migrations: [path.join(__dirname + '/..') + '/migrations/**/*{.ts,.js}'],
    cli: { migrationsDir: 'src/migrations' },
    migrationsRun: true,
    migrationsTableName: 'migrations_iam_cache_server',
    logging: false,
    autoLoadEntities: true,
    extra: {
      max: configService.get<number>('DB_MAXIMUM_CONNECTION_POOL', 10),
      connectionTimeoutMillis: configService.get<number>(
        'DB_CONNECTION_TIMEOUT',
        1000,
      ),
    },
  };

  // Generating ormconfig.json for running typeOrm CLI in dev env
  !isProduction &&
    fs.writeFileSync(
      'ormconfig.json',
      JSON.stringify({ ...config, entities: ['dist/**/*.entity.js'] }, null, 2),
    );

  return config;
};
