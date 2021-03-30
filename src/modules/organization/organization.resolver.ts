import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Application } from '../application/application.entity';
import { AuthGQL } from '../auth/auth.decorator';
import { Role } from '../role/role.entity';
import { Organization } from './organization.entity';
import { OrganizationService } from './organization.service';

@AuthGQL()
@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(private readonly orgService: OrganizationService) {}

  @Query(() => Organization)
  async organization(
    @Args('namespace', { type: () => String }) namespace: string,
  ) {
    const org = await this.orgService.getByNamespace(namespace);
    if (!org) {
      throw new NotFoundException();
    }
    return org;
  }

  @Query(() => [Organization])
  async organizations(@Args('owner', { type: () => String }) owner: string) {
    return this.orgService.getByOwner(owner);
  }

  @ResolveField(() => [Application])
  async apps(@Parent() { namespace }: Organization) {
    return this.orgService.getApps(namespace);
  }

  @ResolveField(() => [Organization])
  async subOrgs(@Parent() { namespace }: Organization) {
    return this.orgService.getSubOrgs(namespace);
  }

  @ResolveField(() => [Role])
  async roles(@Parent() { namespace }: Organization) {
    return this.orgService.getRoles(namespace);
  }
}
