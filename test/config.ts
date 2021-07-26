import * as dotenv from 'dotenv';
dotenv.config();

export default {
  host: process.env.DB_HOST,
  type: 'postgres',
  port: Number.parseInt(process.env.DB_PORT, 2),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'dev-test',
  migrationsRun: true,
  migrationsTableName: 'migrations_iam_cache_server',
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  autoLoadEntities: true,
};
