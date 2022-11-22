import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CIDPipe } from '../../common/cid.pipe';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { IPFSService } from './ipfs.service';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'ipfs', version: '1' })
export class IPFSController {
  constructor(private IPFSService: IPFSService) {}

  @Get('/:cid')
  @ApiTags('IPFS')
  @ApiOperation({
    summary: 'Returns credential from DID Store',
    description: 'Returns credential represented by service in DID document.',
  })
  @ApiParam({ name: 'cid', type: 'string', required: true })
  public async get(@Param('cid', CIDPipe) cid: string): Promise<string> {
    try {
      return this.IPFSService.get(cid);
    } catch (e) {
      if (e?.response?.status === 504) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Credential was not found in DID Store',
          },
          HttpStatus.NOT_FOUND
        );
      }
    }
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
  public async postIssuerClaim(@Body() credential: string) {
    return this.IPFSService.save(credential);
  }
}
