import * as dotenv from 'dotenv';
dotenv.config();

const isCI = process.env.CI;

export default {
  host: isCI ? '127.0.0.1' : process.env.DB_HOST,
  type: 'postgres',
  port: isCI ? 5432 : process.env.DB_PORT,
  username: isCI ? 'postgres' : process.env.DB_USERNAME,
  password: isCI ? 'password' : process.env.DB_PASSWORD,
  database: 'dev-test',
  migrationsRun: true,
  migrationsTableName: 'migrations_iam_cache_server',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
};
