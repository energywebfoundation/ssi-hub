import { Controller, Get, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @ApiTags('Roles')
  public async getAll() {
    return await this.roleService.getAll();
  }

  @Get('/:namespace')
  @ApiTags('Roles')
  public async getById(@Param('namespace') namespace: string) {
    return await this.roleService.getByNamespace(namespace);
  }

  @Get('/:namespace/exists')
  @ApiTags('Roles')
  public async exists(@Param('namespace') namespace: string) {
    return await this.roleService.exists(namespace);
  }
}
