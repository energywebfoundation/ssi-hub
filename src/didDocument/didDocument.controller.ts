import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DidDocumentService } from './didDocument.service';

@Controller('did-document')
export class DidDocumentController {
  constructor(
    private readonly didDocumentService: DidDocumentService,
  ) {}

  @Get('/:id')
  @ApiTags('DID Document')
  public async getById(@Param('did') id: string) {
    // return await this.didDocumentService.getById(id);
  }
}
