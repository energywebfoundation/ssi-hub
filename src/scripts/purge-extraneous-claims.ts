/**
 * Script to purge claims, which were requested on other ssi-hub instance
 */

import { inspect } from 'util';
import { RoleClaim } from '../modules/claim/entities/roleClaim.entity';
import { DataSource } from 'typeorm';

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

  const STATUS_LIST_DOMAIN = process.env.STATUS_LIST_DOMAIN;
  process.stdout.write(
    `> removing claims with status domain different from ${STATUS_LIST_DOMAIN}\n`
  );

  let count = 0;
  const claims = await claimsRepository.find();
  for (const claim of claims) {
    if (
      !claim?.vp?.verifiableCredential.some(
        (vc) =>
          vc.credentialStatus &&
          vc.credentialStatus.statusListCredential.startsWith(
            STATUS_LIST_DOMAIN
          )
      )
    ) {
      process.stdout.write(
        `> removing ${inspect(
          {
            id: claim.id,
            namespace: claim.namespace,
            subject: claim.subject,
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
