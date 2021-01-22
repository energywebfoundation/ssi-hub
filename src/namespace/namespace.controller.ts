import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiQuery,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NamespaceService } from './namespace.service';
import { OrganizationDTO } from '../organization/OrganizationDTO';
import { NamespaceEntities } from './namespace.types';
import { SearchDTO } from './namespace.dto';
import { validate } from 'class-validator';
import { JwtAuthGuard } from '../auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('namespace')
export class NamespaceController {
  constructor(private namespaceService: NamespaceService) {}

  @Get('/:namespace/exists')
  @ApiTags('Namespace')
  @ApiOperation({
    summary: 'Returns boolean, if given namespace exists',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Boolean,
  })
  public async exists(@Param('namespace') namespace: string) {
    return await this.namespaceService.namespaceExists(namespace);
  }

  @Get('/search/:search')
  @ApiTags('Namespace')
  @ApiOperation({
    summary: 'Search Org/App/Role by namespace',
  })
  @ApiQuery({
    name: 'types',
    required: false,
    enum: NamespaceEntities,
    isArray: true,
    type: [String],
  })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
  })
  public async search(
    @Param('search') search: string,
    @Query('types') types?: NamespaceEntities[],
  ) {
    if (search.length < 3) {
      throw new HttpException(
        'Search phrase too short (min 3 characters)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const searchByData = new SearchDTO({ search, types });
    const validationErrors = await validate(searchByData);
    if (validationErrors.length > 0) {
      return validationErrors;
    }
    return await this.namespaceService.searchByText(
      searchByData.search,
      searchByData.types,
    );
  }

  @Get('/:namespace')
  @ApiTags('Namespace')
  @ApiQuery({
    name: 'types',
    type: [String],
    enum: NamespaceEntities,
    isArray: true,
    required: false,
  })
  @ApiOperation({
    summary: 'Find Org/App with matching namespace',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrganizationDTO],
    description: 'Organization with matching namespace',
  })
  public async get(
    @Param('namespace') namespace: string,
    @Query('types') types: string[],
  ) {
    return await this.namespaceService.getByNamespace(namespace, true, types);
  }
}
