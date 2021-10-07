import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDTO } from './role.dto';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { BooleanPipe } from '../../common/boolean.pipe';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Get('/:namespace')
  @ApiTags('Roles')
  @ApiOperation({
    summary: 'Returns Role with given namespace',
  })
  @ApiQuery({
    name: 'withHistory',
    required: false,
    type: Boolean,
    description: 'Indicates if we want to retrieve the whole history of role',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RoleDTO,
    description: 'Role with matching Id',
  })
  public async getById(
    @Param('namespace') namespace: string,
    @Query('withHistory', BooleanPipe)
    withHistory: boolean,
  ) {
    console.log(typeof withHistory);
    return await this.roleService.getByNamespace(namespace);
  }

  @Get('/')
  @ApiTags('Roles')
  @ApiOperation({
    summary: 'Returns Roles with given namespaces',
  })
  @ApiQuery({
    name: 'namespaces',
    required: true,
    type: String,
    description: 'List of namespaces. Format: namespace1,namespace2,namespace3',
  })
  @ApiQuery({
    name: 'withHistory',
    required: false,
    type: Boolean,
    description: 'Indicates if we want to retrieve the whole history of role',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RoleDTO],
    description: 'Roles with matching Ids',
  })
  public async getByIds(
    @Query(
      'namespaces',
      new ParseArrayPipe({ items: String, separator: ',', optional: false }),
    )
    namespaces: string[],
    @Query('withHistory', BooleanPipe)
    withHistory: boolean,
  ) {
    console.log(withHistory);
    return this.roleService.getByNamespaces(namespaces);
  }

  @Get('/owner/:owner')
  @ApiTags('Roles')
  @ApiOperation({
    summary: 'Returns if Role exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  public async getByOwner(@Param('owner') owner: string) {
    return await this.roleService.getByOwner(owner);
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
