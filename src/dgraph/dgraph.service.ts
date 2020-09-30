import { Injectable } from '@nestjs/common';
import { DgraphClient, DgraphClientStub, Mutation, Operation } from 'dgraph-js';
import * as grpc from 'grpc';

@Injectable()
export class DgraphService {
  get instance(): DgraphClient {
    return this._instance;
  }

  private _instance: DgraphClient;
  private _stub: DgraphClientStub;

  constructor() {
    this.createInstance();
    this.migrate();
  }
  
  public async migrate(){
    const schema = `
      type: string @index(exact) .
      namespace: string @index(exact) .
    `;
    const op = new Operation();
    op.setSchema(schema);
    await this._instance.alter(op);
    console.log('migration complete')
  }

  public async mutate(data: unknown) {
    const txn = await this.instance.newTxn();
    const mu = new Mutation()
    mu.setSetJson(data);
    mu.setCommitNow(true);
    return txn.mutate(mu);
  }

  public async query(query: string, params?: Record<string, any>) {
    if(params) {
      return this.instance.newTxn({readOnly: true}).queryWithVars(query, params)
    }
    return this.instance.newTxn({readOnly: true}).query(query)
  }

  private async createInstance() {
    if(this._instance) {
      return;
    }

    let clientStub: DgraphClientStub;

    let retries = 5;
    while(retries) {
      try {
        clientStub = new DgraphClientStub(
          "localhost:9080",
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
  }

  public close() {
    // close existing connection;
    this._stub?.close();

    this._stub = null;
    this._instance = null;
  }
}
