import { config } from 'dotenv';
import path from 'path';
config();
import { DataSource, DataSourceOptions } from 'typeorm';

truncateDatabase().then(() => console.log(`database truncated`));

async function truncateDatabase() {
  const entities = path.join(__dirname, '../../', 'dist/**/*entity.js');
  const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [entities],
  };
  const dataSource = new DataSource(config);
  await dataSource.initialize();

  const tableNames = dataSource.entityMetadatas.map(
    (entity) => `"${entity.tableName}"`
  );

  await dataSource.query(
    `TRUNCATE ${tableNames.join(',')} RESTART IDENTITY CASCADE`
  );

  await dataSource.destroy();
}
