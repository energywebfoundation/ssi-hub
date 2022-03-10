import { NotFoundException } from '@nestjs/common';
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGQL } from '../auth/auth.decorator';
import { Role } from '../role/role.entity';
import { Application } from './application.entity';
import { ApplicationService } from './application.service';

@AuthGQL()
@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}

  @Query(() => Application)
  async application(
    @Args('namespace', { type: () => String }) namespace: string
  ) {
    const app = await this.applicationService.getByNamespace(namespace);
    if (!app) {
      throw new NotFoundException();
    }
    return app;
  }

  @Query(() => [Application])
  async applications(@Args('owner', { type: () => String }) owner: string) {
    return this.applicationService.getByOwner(owner);
  }

  @ResolveField(() => [Role])
  async roles(@Parent() { namespace }: Application) {
    return this.applicationService.getRoles(namespace);
  }
}
