import { providers } from 'ethers';
import { Provider } from 'ethers/providers';
import { ethrReg, Resolver } from '@ew-did-registry/did-ethr-resolver';
import {
  RegistrySettings,
  IResolver,
} from '@ew-did-registry/did-resolver-interface';
import { Methods } from '@ew-did-registry/did';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

const { abi: abi1056 } = ethrReg;

@Injectable()
export class ResolverFactory {
  private registrySettings: RegistrySettings;
  private provider: Provider;

  constructor(private readonly config: ConfigService) {
    // TODO: Rename 'ENS_URL' to 'PROVIDER_URL' to be more general
    const PROVIDER_URL = this.config.get<string>('ENS_URL');
    this.provider = new providers.JsonRpcProvider(PROVIDER_URL);

    const DID_REGISTRY_ADDRESS = this.config.get<string>(
      'DID_REGISTRY_ADDRESS',
    );
    this.registrySettings = {
      abi: abi1056,
      address: DID_REGISTRY_ADDRESS,
      method: Methods.Erc1056,
    };
  }

  create(): Resolver {
    return new Resolver(this.provider as Provider, this.registrySettings);
  }
}
