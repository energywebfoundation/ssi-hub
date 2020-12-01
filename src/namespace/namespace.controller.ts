import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NamespaceService } from './namespace.service';
import { OrganizationDTO } from '../organization/OrganizationDTO';

@Controller('namespace')
export class NamespaceController {
  constructor(private namespaceService: NamespaceService) {}

  @Get('/:namespace/exists')
  @ApiTags('Namespace')
  @ApiOperation({
    summary: "Returns boolean, if given namespace exists",
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
    summary: "Search Org/App/Role by namespace",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrganizationDTO],
  })
  public async search(@Param('search') search: string) {
    if(search.length < 3) {
      throw new HttpException("Search phrase too short (min 3 characters)", HttpStatus.BAD_REQUEST)
    }
    return await this.namespaceService.searchByText(search);
  }

  @Get('/:namespace')
  @ApiTags('Namespace')
  @ApiQuery({
    name: 'types',
    type: [String],
    enum: ["App", "Org", "Role"],
    isArray: true,
    required: false,
  })
  @ApiOperation({
    summary: "Find Org/App with matching namespace",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [OrganizationDTO],
    description: "Organization with matching namespace"
  })
  public async get(
    @Param('namespace') namespace: string,
    @Query('types') types: string[],
  ) {
    return await this.namespaceService.getByNamespace(namespace, true, types);
  }
}
