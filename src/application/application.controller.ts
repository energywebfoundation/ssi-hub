import {
  Controller,
  Get,
  HttpStatus,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleDTO } from '../role/RoleDTO';
import { ApplicationDTO } from './ApplicationDTO';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller('app')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Get()
  @ApiTags('Application')
  @ApiOperation({
    summary: 'Returns Array or Apps',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ApplicationDTO],
  })
  public async getAll() {
    return await this.applicationService.getAll();
  }

  @Get('/:namespace')
  @ApiTags('Application')
  @ApiOperation({
    summary: 'Returns App with given namespace',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ApplicationDTO,
  })
  public async getById(@Param('namespace') namespace: string) {
    return await this.applicationService.getByNamespace(namespace);
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
    type: [RoleDTO],
    description: 'Roles connected with App namespace',
  })
  public async getRolesByAppId(@Param('namespace') namespace: string) {
    return await this.applicationService.getRoles(namespace);
  }
}
