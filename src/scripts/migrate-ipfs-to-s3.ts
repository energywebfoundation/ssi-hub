import { DataSource } from 'typeorm';
import { DIDDocumentEntity } from '../modules/did/did.entity';
import AWS from 'aws-sdk';
import { config } from 'dotenv';
import { sign } from 'jsonwebtoken';

config();

if (
  !process.env.IPFS_BUCKET_AWS_ACCESS_KEY_ID ||
  !process.env.IPFS_BUCKET_AWS_SECRET_ACCESS_KEY ||
  !process.env.IPFS_BUCKET_AWS_REGION
) {
  throw new Error('AWS credentials are not set');
}

// Configure AWS credentials
AWS.config.update({
  accessKeyId: process.env.IPFS_BUCKET_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.IPFS_BUCKET_AWS_SECRET_ACCESS_KEY,
  region: process.env.IPFS_BUCKET_AWS_REGION,
});

const s3 = new AWS.S3();

async function migrateIpfsToS3() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  dataSource.setOptions({ entities: [DIDDocumentEntity] });

  await dataSource.initialize();

  const didDocumentRepository = dataSource.getRepository(DIDDocumentEntity);

  const didDocuments = await didDocumentRepository.find();

  for (const { service } of didDocuments) {
    for (const { serviceEndpoint, ...claim } of service) {
      if (serviceEndpoint) {
        const params = {
          Bucket: process.env.IPFS_BUCKET_AWS_S3_BUCKET,
          Key: serviceEndpoint,
          Body: sign(claim, 'secret'),
          ContentType: 'text/plain',
        };

        try {
          await s3.putObject(params).promise();
          console.log(`Successfully uploaded ${serviceEndpoint} to S3`);
        } catch (err) {
          console.error(`Error uploading ${serviceEndpoint} to S3:`, err);
        }
      }
    }
  }
}

migrateIpfsToS3()
  .then(() => {
    console.log('Migration complete');
  })
  .catch((error) => {
    console.error('Migration failed', error);
  });
