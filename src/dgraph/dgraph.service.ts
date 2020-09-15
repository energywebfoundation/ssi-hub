import { Injectable } from '@nestjs/common';
import { DgraphClient, DgraphClientStub, Mutation } from 'dgraph-js';
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

  private createInstance() {
    if(this._instance) {
      return;
    }

    const clientStub = new DgraphClientStub(
      "localhost:9080",
      grpc.credentials.createInsecure(),
    );


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
