import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CID } from 'multiformats/cid';
import { CIDPipe } from '../../common/cid.pipe';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { DidStoreService } from './did-store.service';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'store', version: '1' })
export class DidStoreController {
  constructor(private service: DidStoreService) { }

  @Get('/:cid')
  @ApiTags('DidStore')
  @ApiOperation({
    summary: 'Returns content from DidStore',
    description:
      'Returns data identified by the provided content identifier (cid). This can be used, for example, to resolve credentials linked in the service endpoint of a DID document.',
  })
  @ApiParam({ name: 'cid', type: 'string', required: true })
  public async get(@Param('cid', CIDPipe) cid: CID): Promise<string> {
    // todo current s3 as default
    // this info type should get from datasource(db/chain) 
    return this.service.get('S3', cid.toString());
  }

  @Post()
  @ApiTags('DidStore')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
        },
        type: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Saves content in DidStore',
    description: 'Saves content in DidStore and returns its CID',
  })
  public async save(@Body('data') data: string, @Body('type') type: string) {
    return this.service.save(type, data);
  }
}
