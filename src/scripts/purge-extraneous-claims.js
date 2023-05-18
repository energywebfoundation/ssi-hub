/**
 * Script to purge claims, which was requested on other ssi-hub instance
 */

const {
  RoleClaim,
} = require('../../dist/modules/claim/entities/roleClaim.entity');
const { dataSource } = require('../db/cli');

(async function () {
  await dataSource.initialize();
  const claimsRepository = dataSource.getRepository(RoleClaim);

  const STATUS_LIST_DOMAIN = process.env.STATUS_LIST_DOMAIN;
  process.stdout.write(
    `> removing claims with status domain not ${STATUS_LIST_DOMAIN}`
  );

  const claims = await claimsRepository.find();
  for (const claim of claims) {
    if (
      claim.vp.verifiableCredential.some(
        (vc) => vc.credentialStatus.statusListCredential !== STATUS_LIST_DOMAIN
      )
    ) {
      process.stdout.write(`> removing ${JSON.stringify(claim)}`);
      await claimsRepository.remove(claim);
    }
  }

  await dataSource.destroy();
})();
