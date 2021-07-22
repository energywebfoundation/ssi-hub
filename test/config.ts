import * as dotenv from 'dotenv';
dotenv.config();

export default {
  host: process.env.DB_HOST,
  type: 'postgres',
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:
    process.env.DB_NAME + (process.env.NODE_ENV === 'test' ? '-test' : ''),
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  migrationsRun: true,
  migrationsTableName: 'migrations_iam_cache_server',
  logging: false,
  autoLoadEntities: true,
  synchronize: false,
};
