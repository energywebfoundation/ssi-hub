import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { AuthGQL } from '../auth/auth.decorator';
import { DIDDocumentSchema } from './did.schema';
import { DIDService } from './did.service';
import { DID } from './did.types';

@AuthGQL()
@Resolver(() => DIDDocumentSchema)
export class DIDResolver {
  constructor(private readonly didService: DIDService) {}

  @Query(() => DIDDocumentSchema)
  async didDocument(
    @Args('did', { type: () => String }) did: string,
    @Info() info: GraphQLResolveInfo,
  ) {
    const nodes =
      info.fieldNodes[0].selectionSet.selections.map(
        (item: any) => item.name.value,
      ) || [];

    const didObject = new DID(did);
    return this.didService.getById(didObject, nodes.includes('service'));
  }
}
