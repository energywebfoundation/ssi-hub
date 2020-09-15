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

  @Get('/:id')
  @ApiTags('Roles')
  public async getById(@Param('id') id: string) {
    return await this.roleService.getById(id);
  }

  @Post()
  @ApiTags('Roles')
  public async create(@Body() body: RoleDTO) {
    return await this.roleService.create(body);
  }
}
