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
    summary: 'Returns credential from IPFS Store',
    description: 'Returns credential represented by service in DID document.',
  })
  @ApiParam({ name: 'cid', type: 'string', required: true })
  public async get(@Param('cid', CIDPipe) cid: CID): Promise<string> {
    return this.ipfsService.get(cid.toString());
  }

  @Post()
  @ApiTags('IPFS')
  @ApiBody({
    type: 'string',
    description: 'Stringified credential',
  })
  @ApiOperation({
    summary: 'Saves credential in IPFS',
    description: 'Saves credential on IPFS and returns its CID',
  })
  public async save(@Body() credential: Record<string, unknown>) {
    return this.ipfsService.save(JSON.stringify(credential));
  }
}
