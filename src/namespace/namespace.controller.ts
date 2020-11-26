import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { NamespaceService } from './namespace.service';

@Controller('namespace')
export class NamespaceController {
  constructor(private namespaceService: NamespaceService) {}

  @Get('/:namespace/exists')
  @ApiTags('Namespace')
  public async exists(@Param('namespace') namespace: string) {
    return await this.namespaceService.namespaceExists(namespace);
  }

  @Get('/search/:search')
  @ApiTags('Namespace')
  public async search(@Param('search') search: string) {
    if(search.length < 3) {
      throw new HttpException("Search phrase too short (min 3 characters)", HttpStatus.BAD_REQUEST)
    }
    return await this.namespaceService.searchByText(search);
  }

  @Get('/:namespace')
  @ApiTags('Namespace')
  @ApiQuery({name: 'types', type: [String]})
  public async get(
    @Param('namespace') namespace: string,
    @Query('types') types: string[],
  ) {
    return await this.namespaceService.getByNamespace(namespace, true, types);
  }
}
