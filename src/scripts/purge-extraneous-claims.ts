/**
 * Script to purge claims, which were requested on other ssi-hub instance
 */

import { inspect } from 'util';
import { RoleClaim } from '../modules/claim/entities/roleClaim.entity';
import { DataSource } from 'typeorm';

const STAGING_NAMESPACE_PATTERN = '.apps.staging.gp4btc.';
const PROD_NAMESPACE_PATTERN = '.apps.gp4btc.';
const DEV_NAMESPACE_PATTERN = '.apps.dev.gp4btc.';

(async function () {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  dataSource.setOptions({ entities: [RoleClaim] });
  await dataSource.initialize();

  const claimsRepository = dataSource.getRepository(RoleClaim);

  let count = 0;
  const claims = await claimsRepository.find();
  for (const claim of claims) {
    const isNamespaceCorrespondToEnv =
      claim.namespace.match(DEV_NAMESPACE_PATTERN) ||
      claim.namespace.match(STAGING_NAMESPACE_PATTERN) ||
      claim.namespace.match(PROD_NAMESPACE_PATTERN);
    if (!isNamespaceCorrespondToEnv) {
      process.stdout.write(
        `> removing ${inspect(
          {
            id: claim.id,
            namespace: claim.namespace,
            subject: claim.subject,
            status:
              claim.vp && claim.vp.verifiableCredential[0].credentialStatus,
          },
          { depth: 2, colors: true }
        )}\n`
      );
      await claimsRepository.remove(claim);
      count += 1;
    }
  }

  await dataSource.destroy();
  process.stdout.write(`removed ${count} claims\n`);
})();
