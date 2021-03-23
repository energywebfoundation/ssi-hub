import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGQL } from '../auth/auth.decorator';
import { DIDDocumentEntity } from './did.entity';
import { DIDService } from './did.service';

@AuthGQL()
@Resolver(() => DIDDocumentEntity)
export class DIDResolver {
  constructor(private readonly didService: DIDService) {}

  @Query(() => DIDDocumentEntity)
  async didDocument(@Args('did', { type: () => String }) did: string) {
    return this.didService.getById(did);
  }
}
