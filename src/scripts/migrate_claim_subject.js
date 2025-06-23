/* eslint-disable @typescript-eslint/no-var-requires */
const { createConnection } = require('typeorm');
const { JWT } = require('@ew-did-registry/jwt');
const { Keys } = require('@ew-did-registry/keys');
const {
  RoleClaim,
} = require('../../dist/modules/claim/entities/roleClaim.entity.js');

require('dotenv').config();

const { DB_HOST, DB_PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

(async function () {
  const connection = await createConnection({
    // had to copy from orgmconfig because typeorm doesn't detect postgres driver
    type: 'postgres',
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    entities: ['dist/**/*.entity.js'],
  });
  const claimsRepository = connection.getRepository(RoleClaim);
  let claims = await claimsRepository.find();

  const jwt = new JWT(new Keys());
  for await (const claim of claims) {
    const payload = jwt.decode(claim.token);
    let subject = payload.sub;
    if (!subject || subject.length === 0 || !subject.startsWith('did')) {
      subject = payload.iss;
    }
    await claimsRepository.update(claim.id, { ...claim, subject });
  }

  await connection.close();
})();
