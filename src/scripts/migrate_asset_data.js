/* eslint-disable @typescript-eslint/no-var-requires */
const { createConnection } = require('typeorm');
const {
  Asset,
  AssetsHistory,
} = require('../../dist/modules/assets/assets.entity.js');

(async function () {
  const connection = await createConnection({
    // had to copy from orgmconfig because typeorm doesn't detect postgres driver
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'dev-test',
    entities: ['dist/**/*.entity.js'],
  });

  const assetsHistoryRepository = connection.getRepository(AssetsHistory);
  await assetsHistoryRepository.delete({});
  console.log('Cleared data in AssetHistory DB');

  const assetRepository = connection.getRepository(Asset);
  await assetRepository.delete({});
  console.log('Cleared data in Asset DB');

  await connection.close();
})();
