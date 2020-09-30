import { Injectable } from '@nestjs/common';
import { providers } from 'ethers';
import { PublicResolverFactory } from '../ethers/PublicResolverFactory';
import { RoleService } from '../role/role.service';

@Injectable()
export class Web3Service {
  private connection;

  constructor(private roleService: RoleService) {
    this.connect();
  }

  private async connect() {
    const provider = new providers.JsonRpcProvider('https://volta-rpc.energyweb.org');

    const publicResolverFactory = PublicResolverFactory.connect(
      '0x0a97e07c4Df22e2e31872F20C5BE191D5EFc4680'
      , provider
    );

    publicResolverFactory.addListener('TextChanged', async (hash) => {

      const namespace = await publicResolverFactory.name(hash);
      if(!namespace) {
        return;
      }
      const roleName = namespace.split('.')[0];

      const data = await publicResolverFactory.text(hash, "metadata");
      const metadata = JSON.parse(data);

      console.log({
        name: roleName,
        metadata,
      })

      const res = await this.roleService.create({
        namespace: namespace,
        metadata: Object.entries(metadata).map(([key, value]) => ({key, value: value as string})),
        fields: [],
        address: "",
      })

      console.log(res);
    })
  }
}
