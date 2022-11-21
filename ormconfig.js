const { DataSource } = require('typeorm');

const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

const dataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  migrations: ['dist/migrations/**/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations_iam_cache_server',
  logging: ['error', 'migration', 'warn', 'info'],
  autoLoadEntities: true,
  extra: {
    max: 10,
    connectionTimeoutMillis: 3000,
  },
  entities: ['dist/**/*.entity.js'],
});

module.exports.dataSource = dataSource;
