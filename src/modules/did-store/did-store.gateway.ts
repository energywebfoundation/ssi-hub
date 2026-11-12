import { Inject, Injectable } from "@nestjs/common";
import { IDidStore } from '@ew-did-registry/did-store-interface';

@Injectable()
export class DidStoreGatewayFactory {
  constructor(
    @Inject('DidStoreGateway')
    private gatewayMap: Record<string, IDidStore>
  ) { }

  getGateway(key: string): IDidStore {
    return this.gatewayMap[key];
  }
}
