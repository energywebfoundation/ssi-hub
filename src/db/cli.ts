import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { getDBConfig } from './config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

export const dataSource = new DataSource({
  ...getDBConfig({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    get: (key: string, def?: string) => process.env[key] || def,
  }),
  type: 'postgres',
} as PostgresConnectionOptions);
