import { Injectable } from '@nestjs/common';
import { DgraphClient, DgraphClientStub, Mutation, Operation } from 'dgraph-js';
import * as grpc from 'grpc';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DgraphService {
  private async getInstance(): Promise<DgraphClient> {
    if(this._instance) {
      return this._instance;
    }
    return this.createInstance();
  }

  private _instance: DgraphClient;
  private _stub: DgraphClientStub;

  constructor(private configService: ConfigService) {
    this.createInstance();
    this.migrate();
  }
  
  public async migrate(){
    const schema = `
      type: string @index(exact) .
      namespace: string @index(exact) .
      name: string @index(exact) .
    `;
    const op = new Operation();
    op.setSchema(schema);
    await this._instance.alter(op);
    console.log('migration complete')
  }

  public async mutate(data: unknown) {
    const instance = await this.getInstance();
    const txn = await instance.newTxn();
    const mu = new Mutation()
    mu.setSetJson(data);
    mu.setCommitNow(true);
    return txn.mutate(mu);
  }

  public async query(query: string, params?: Record<string, any>) {
    const instance = await this.getInstance();
    if(params) {
      return instance.newTxn({readOnly: true}).queryWithVars(query, params)
    }
    return instance.newTxn({readOnly: true}).query(query)
  }

  private async createInstance() {
    if(this._instance) {
      return this._instance;
    }

    let clientStub: DgraphClientStub;

    const DB_HOST = this.configService.get<string>('DB_HOST');

    let retries = 5;
    while(retries) {
      try {
        clientStub = new DgraphClientStub(
          DB_HOST,
          grpc.credentials.createInsecure(),
        );
        console.log('connection successfuly')
        break;
      } catch (err) {
        console.log(err);
        retries--;
        await new Promise(res => setTimeout(res, 5000))
      }
    }

    this._stub = clientStub;

    this._instance = new DgraphClient(clientStub);

    return this._instance;
  }

  public close() {
    // close existing connection;
    this._stub?.close();

    this._stub = null;
    this._instance = null;
  }
}
