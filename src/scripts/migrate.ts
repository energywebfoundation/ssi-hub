import { ConstantBackoff, handleAll, retry } from 'cockatiel';
import { DgraphClient, DgraphClientStub } from 'dgraph-js';
import { createConnection } from 'typeorm';
import { RoleClaim } from '../modules/claim/entities/roleClaim.entity';
import chunk from 'lodash.chunk';

export class DgraphService {
  private _instance: DgraphClient;
  private _stub: DgraphClientStub;

  private async query(query: string) {
    return this._instance.newTxn({ readOnly: true }).query(query);
  }

  public async createInstance() {
    const policy = retry(handleAll, {
      maxAttempts: 3,
      backoff: new ConstantBackoff(1000),
    });

    return await policy.execute(async () => {
      this._stub = new DgraphClientStub(process.env['DGRAPH_GRPC_HOST']);

      this._instance = new DgraphClient(this._stub);
      return this._instance;
    });
  }

  async getClaimFromDgraph() {
    const claims = await this.query(`
    {
      claims(func: type(Claim)) {
        id
        requester
        claimType
        token
        issuedToken
        parentNamespace
        isAccepted
        acceptedBy
      }
    }
    `);
    return claims.getJson();
  }

  /**
   * Closes/Ends connection to Dgraph
   */
  public close() {
    // close existing connection;
    this._stub?.close();

    this._stub = null;
    this._instance = null;
  }
}

const migrate = async () => {
  console.log('#### CREATE DGRAPH CLIENT ####');
  const dgraph = new DgraphService();
  await dgraph.createInstance();
  console.log('#### DGRAPH CLIENT INITIALIZED ####');

  const { claims } = (await dgraph.getClaimFromDgraph()) as {
    claims: RoleClaim[];
  };

  const connection = await createConnection({
    type: 'postgres',
    host: process.env['DB_HOST'],
    port: +process.env['DB_PORT'],
    username: process.env['DB_USERNAME'],
    password: process.env['DB_PASSWORD'],
    database: process.env['DB_NAME'],
    entities: [RoleClaim],
  });

  console.log(`#### CONNECTED TO POSTGRES ####`);

  const claimsRepo = connection.getRepository(RoleClaim);
  const claimsEntities = claims.reduce((acc, { ...rest }) => {
    acc.push(
      RoleClaim.create({
        claimTypeVersion: '1',
        ...rest,
      })
    );
    return acc;
  }, [] as RoleClaim[]);

  console.log(`#### THERE ARE ${claimsEntities.length} CLAIMS TO MIGRATE ####`);

  const chunks = chunk(claimsEntities, 10);
  for (const chunk of chunks) {
    await claimsRepo.save(chunk);
    console.log(`#### SAVED ${chunk.length} CLAIMS ####`);
  }
  dgraph.close();
  console.log(`#### MIGRATION FINISHED ####`);
};

migrate().then(() => process.exit(0));
