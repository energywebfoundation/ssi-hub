import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DgraphService } from './dgraph/dgraph.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly dgraph: DgraphService
  ) {

  }

  @Get()
  async getHello(): Promise<any> {
    return "Hello"
  }
}
