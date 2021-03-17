import { NotFoundException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGQL } from '../auth/auth.decorator';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@AuthGQL()
@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => Role)
  async role(@Args('namespace', { type: () => String }) namespace: string) {
    const role = await this.roleService.getByNamespace(namespace);
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }

  @Query(() => [Role])
  async roles(@Args('owner', { type: () => String }) owner: string) {
    return this.roleService.getByOwner(owner);
  }
}
