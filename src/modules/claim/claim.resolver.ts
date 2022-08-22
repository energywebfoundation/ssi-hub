import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { UserGQL } from '../../common/user.decorator';
import { AuthGQL } from '../auth/auth.decorator';
import { RoleClaim } from './entities/roleClaim.entity';
import { ClaimService } from './services';

@AuthGQL()
@Resolver(() => RoleClaim)
export class ClaimResolver {
  constructor(private readonly claimService: ClaimService) {}

  @Query(() => RoleClaim)
  async claim(@Args('id', { type: () => String }) id: string) {
    return this.claimService.getById(id);
  }

  @Query(() => [RoleClaim])
  async claimsByParentNamespace(
    @Args('namespace', { type: () => String }) namespace: string
  ) {
    return this.claimService.getByParentNamespace(namespace);
  }

  @Query(() => [RoleClaim])
  async claimsByUser(
    @Args('user', { type: () => String }) did?: string,
    @Args('accepted', { type: () => Boolean, nullable: true })
    accepted?: boolean,
    @Args('parentNamespace', { type: () => String, nullable: true })
    parentNamespace?: string,
    @UserGQL()
    user?: string
  ) {
    return this.claimService.getByUserDid({
      did,
      currentUser: user,
      filters: { isApproved: accepted, namespace: parentNamespace },
    });
  }

  @Query(() => [RoleClaim])
  async claimsByIssuer(
    @Args('issuer', { type: () => String }) issuer?: string,
    @Args('accepted', { type: () => Boolean, nullable: true })
    accepted?: boolean,
    @Args('parentNamespace', { type: () => String, nullable: true })
    parentNamespace?: string,
    @UserGQL()
    user?: string
  ) {
    return this.claimService.getByIssuer({
      issuer,
      currentUser: user,
      filters: { isApproved: accepted, namespace: parentNamespace },
    });
  }

  @Query(() => [RoleClaim])
  async claimsByRequester(
    @Args('requester', { type: () => String })
    requester?: string,
    @Args('accepted', { type: () => Boolean, nullable: true })
    accepted?: boolean,
    @Args('parentNamespace', { type: () => String, nullable: true })
    parentNamespace?: string,
    @UserGQL()
    user?: string
  ) {
    return this.claimService.getByRequester({
      requester,
      currentUser: user,
      filters: { isApproved: accepted, namespace: parentNamespace },
    });
  }

  @Mutation(() => Boolean)
  async deleteClaim(
    @Args('id', { type: () => String }) id: string,
    @UserGQL() user?: string
  ) {
    await this.claimService.removeById(id, user);
    return true;
  }
}
