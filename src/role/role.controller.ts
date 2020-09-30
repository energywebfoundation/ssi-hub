import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './RoleDTO';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @Get()
  @ApiTags('Roles')
  public async getAll() {
    return await this.roleService.getAll();
  }

  @Get('/:namespace')
  @ApiTags('Roles')
  public async getById(@Param('namespace') id: string) {
    return await this.roleService.getByNamespace(id);
  }

  @Get('/exists/:namespace')
  @ApiTags('Roles')
  public async checkNamespace(@Param('namespace') namespace: string) {
    const namespaces = await this.roleService.namespaceExists(namespace);
    return namespaces.Data.length > 0;
  }

  @Post()
  @ApiTags('Roles')
  public async create(@Body() body: RoleDTO) {
    return await this.roleService.create(body);
  }
}
