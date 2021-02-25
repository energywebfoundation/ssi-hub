import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDTO } from './RoleDTO';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get()
  @ApiTags('Roles')
  @ApiOperation({
    summary: 'Returns Array or Roles',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RoleDTO],
  })
  public async getAll() {
    return await this.roleService.getAll();
  }

  @Get('/:namespace')
  @ApiTags('Roles')
  @ApiOperation({
    summary: 'Returns Role with given namespace',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RoleDTO,
    description: 'Role with matching Id',
  })
  public async getById(@Param('namespace') namespace: string) {
    return await this.roleService.getByNamespace(namespace);
  }

  @Get('/:namespace/exists')
  @ApiTags('Roles')
  @ApiOperation({
    summary: 'Returns if Role exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  public async exists(@Param('namespace') namespace: string) {
    return await this.roleService.exists(namespace);
  }
}
