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
import { IPFSService } from './ipfs.service';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'ipfs', version: '1' })
export class IPFSController {
  constructor(private ipfsService: IPFSService) {}

  @Get('/:cid')
  @ApiTags('IPFS')
  @ApiOperation({
    summary: 'Returns content from IPFS Store',
    description:
      'Returns data identified by the provided content identifier (cid). This can be used, for example, to resolve credentials linked in the service endpoint of a DID document.',
  })
  @ApiParam({ name: 'cid', type: 'string', required: true })
  public async get(@Param('cid', CIDPipe) cid: CID): Promise<string> {
    return this.ipfsService.get(cid.toString());
  }

  @Post()
  @ApiTags('IPFS')
  @ApiBody({
    type: 'string',
    description: 'Stringified content',
  })
  @ApiOperation({
    summary: 'Saves content in IPFS',
    description: 'Saves content in IPFS and returns its CID',
  })
  public async save(@Body() credential: string) {
    return this.ipfsService.save(credential);
  }
}
