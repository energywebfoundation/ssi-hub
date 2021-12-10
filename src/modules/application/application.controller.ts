import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Role } from '../role/role.entity';
import { Application } from './application.entity';
import { BooleanPipe } from '../../common/boolean.pipe';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'app', version: '1' })
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get('/:namespace')
  @ApiTags('Application')
  @ApiOperation({
    summary: 'Returns App with given namespace',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Application,
  })
  public async getById(@Param('namespace') namespace: string) {
    return await this.applicationService.getByNamespace(namespace);
  }

  @Get('/owner/:owner')
  @ApiTags('Application')
  @ApiOperation({
    summary:
      'Returns applications owned by given identity optionally including roles',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Application,
    description: 'Applications owned by given identity',
  })
  public async getByOwner(
    @Param('owner') owner: string,
    @Query('withRelations', BooleanPipe) withRelations: boolean,
  ) {
    return this.applicationService.getByOwner(owner, { withRelations });
  }

  @Get('/:namespace/exists')
  @ApiTags('Application')
  @ApiOperation({
    summary: 'Returns if App exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
    description: 'Application with matching Id',
  })
  public async exists(@Param('namespace') namespace: string) {
    return await this.applicationService.exists(namespace);
  }

  @Get('/:namespace/roles')
  @ApiTags('Application')
  @ApiOperation({
    summary: 'Returns Array of Roles of an App',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [Role],
    description: 'Roles connected with App namespace',
  })
  public async getRolesByAppId(@Param('namespace') namespace: string) {
    return await this.applicationService.getRoles(namespace);
  }
}
