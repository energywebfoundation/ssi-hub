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
import { S3Service } from './s3.service';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 's3', version: '1' })
export class S3Controller {
  constructor(private s3Service: S3Service) { }

  @Get('/:cid')
  @ApiTags('S3')
  @ApiOperation({
    summary: 'Returns content from S3 Store',
    description:
      'Returns data identified by the provided content identifier (cid). This can be used, for example, to resolve credentials linked in the service endpoint of a DID document.',
  })
  @ApiParam({ name: 'cid', type: 'string', required: true })
  public async get(@Param('cid', CIDPipe) cid: CID): Promise<string> {
    return this.s3Service.get(cid.toString());
  }

  @Post()
  @ApiTags('S3')
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({
    summary: 'Saves content in S3',
    description: 'Saves content in S3 and returns its CID',
  })
  public async save(@Body('data') data: string) {
    return this.s3Service.save(data);
  }
}
