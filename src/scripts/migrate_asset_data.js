/**
 * Script to clear AssetsHistory and Asset Database
 */

/* eslint-disable @typescript-eslint/no-var-requires */
const { createConnection } = require('typeorm');

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

(async function () {
  const connection = await createConnection({
    // had to copy from orgmconfig because typeorm doesn't detect postgres drive
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    // use the entity build directory specific to deployment and script location
    entities: ['../modules/**/*.entity.js'],
  });

  const assetsHistoryRepository = connection.getRepository('AssetsHistory');
  // validate DB records
  // const assetsHistoryData = await assetsHistoryRepository.find();
  // console.log(assetsHistoryData);

  await assetsHistoryRepository.delete({});
  console.log('Cleared data in AssetHistory DB');

  const assetRepository = connection.getRepository('Asset');
  // validate DB records
  // const assetData = await assetRepository.find();
  // console.log(assetData);

  await assetRepository.delete({});
  console.log('Cleared data in Asset DB');

  await connection.close();
})();
