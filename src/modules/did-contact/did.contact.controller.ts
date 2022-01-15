import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Body,
  Delete,
  Param,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { DIDContactDTO } from './did.contact.dto';
import { DIDContactService } from './did.contact.service';
import { Auth } from '../auth/auth.decorator';
import { DIDContact } from './did.contact.entity';
import { Request } from 'express';
import { Logger } from '../logger/logger.service';
import { RequestUserDTO } from '../auth/auth.dto';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'didContact', version: '1' })
export class DIDContactController {
  constructor(
    private readonly didContactService: DIDContactService,
    private readonly logger: Logger
  ) {
    this.logger.setContext(DIDContactController.name);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiTags('DIDContact')
  @ApiBody({
    type: DIDContactDTO,
    description: 'DIDContact data object, containing label and DID',
  })
  @ApiOperation({
    summary: 'Creates a DID Contact document',
    description: 'creates DID Contact document',
  })
  public async createDIDContact(
    @Body() data: DIDContactDTO,
    @Req() req: Request
  ): Promise<DIDContact> {
    const { did } = req.user as RequestUserDTO;
    return this.didContactService.createDIDContact(data, did);
  }

  @Get()
  @ApiTags('DIDContact')
  @ApiOperation({
    summary: 'returns list of saved DID contacts',
    description: 'returns list of saved DID contacts',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DIDContact,
  })
  public async getDIDContacts(@Req() req: Request): Promise<DIDContact[]> {
    const { did } = req.user as RequestUserDTO;
    this.logger.info(`Retrieving list of saved did contacts`);
    return this.didContactService.getDIDContacts(did);
  }

  @Delete('/:id')
  @ApiTags('DIDContact')
  @ApiOperation({
    summary: 'Delete a DIDContact using id',
    description: 'Deletes a DIDContact using id',
  })
  public async deleteDIDContact(@Param('id') id: string, @Req() req: Request) {
    const { did } = req.user as RequestUserDTO;
    return this.didContactService.deleteDIDContact(id, did);
  }
}
