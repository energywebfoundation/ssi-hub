/**
 * Script to purge claims, which were requested on other ssi-hub instance
 */

import { inspect } from 'util';
import { dataSource } from '../db/cli';
import { RoleClaim } from '../modules/claim/entities/roleClaim.entity';

(async function () {
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
