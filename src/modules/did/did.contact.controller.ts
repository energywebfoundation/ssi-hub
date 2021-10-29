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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
//import { Auth } from '../auth/auth.decorator';
import { DIDService } from './did.service';
import { DIDContactDTO } from './did.dto';
import { DIDContact } from './did.entity';

//@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'didContact', version: '1' })
export class DIDContactController {
  constructor(
    private readonly didService: DIDService,
    private readonly logger: Logger,
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
  ): Promise<DIDContact> {
    return this.didService.createDIDContact(data);
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
  public async getDIDContacts(): Promise<DIDContact[]> {
    this.logger.info(`Retrieving list of saved did contacts`);
    return this.didService.getDIDContacts();
  }

  @Delete('/:id')
  @ApiTags('DIDContact')
  @ApiOperation({
    summary: 'Delete a DIDContact using id',
    description: 'Deletes a DIDContact using id',
  })
  public async deleteDIDContact(@Param('id') id: string) {
    return this.didService.deleteDIDContact(id);
  }
}
