import { Controller, Param, Post } from '@nestjs/common';
import { DgraphService } from '../dgraph/dgraph.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('graphql')
export class GraphqlController {
  constructor(private dgraph: DgraphService) {
  }

  @Post()
  @ApiTags('GraphQL')
  public query(
    @Param('query') query: string,
    @Param('params') params: Record<string, string>
  ) {
    return this.dgraph.query(query, params);
  }
}
