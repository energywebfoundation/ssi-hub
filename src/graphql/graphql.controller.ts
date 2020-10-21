import {
  BadRequestException,
  Controller,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { DgraphService } from '../dgraph/dgraph.service';
import * as rawBody from 'raw-body';

export const PlainBody = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    if (!req.readable) {
      throw new BadRequestException('Invalid body');
    }

    const body = (await rawBody(req)).toString('utf8').trim();
    return body;
  },
);

@Controller('graphql')
export class GraphqlController {
  constructor(private dgraph: DgraphService) {}

  // @Post()
  // @ApiTags('GraphQL')
  // public async query(@PlainBody() query: string) {
  //   const res = await this.dgraph.query(query);
  //   return res.getJson();
  // }
}
