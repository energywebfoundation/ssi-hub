const { createConnection } = require('typeorm');
const util = require('util');
const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
const { RoleClaim } = require('./entities/roleClaim.entity.js');
(async function () {
  const connection = await createConnection({
    // had to copy from orgmconfig because typeorm doesn't detect postgres drive
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: ['./**/*.entity.js'],
  });

  const userDID = 'did:ethr:volta:0x7A06aCD185116f48Df7Fdd699c7b09ccDb18CA44';
  const roleClaimRepository = connection.getRepository('RoleClaim');

  // check if the user has any role claims
  const claimsBeforeDeletion = await roleClaimRepository.find({
    where: {
      requester: userDID,
    },
  });
  console.log(
    util.inspect(claimsBeforeDeletion, false, null, true /* enable colors */)
  );

  const claim = await roleClaimRepository
    .createQueryBuilder('roleClaim')
    .delete()
    .from(RoleClaim)
    .where('requester = :requester', {
      requester: userDID,
    })
    .execute();

  // returns [ ] as all the credentials are deleted
  const claims = await roleClaimRepository.find({
    where: {
      requester: userDID,
    },
  });
  console.log(util.inspect(claims, false, null, true /* enable colors */));
  await connection.close();
})();
