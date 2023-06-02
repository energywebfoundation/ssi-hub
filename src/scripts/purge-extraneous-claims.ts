/**
 * Script to purge claims, which were requested on other ssi-hub instance
 */

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

  const claims = await claimsRepository.find();
  for (const claim of claims) {
    if (
      claim.vp.verifiableCredential.some(
        (vc) =>
          !vc.credentialStatus.statusListCredential.startsWith(
            STATUS_LIST_DOMAIN
          )
      )
    ) {
      process.stdout.write(`> removing ${JSON.stringify(claim)}\n`);
      await claimsRepository.remove(claim);
    }
  }

  await dataSource.destroy();
})();
