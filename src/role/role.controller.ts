import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {
  }

  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.roleService.getById(id);
  }

  @Post()
  public async create(@Body() body: unknown) {
    console.log(body);
    return await this.roleService.create();
  }
}
