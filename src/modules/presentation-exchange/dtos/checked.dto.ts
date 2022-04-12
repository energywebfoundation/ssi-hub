import { ApiProperty } from '@nestjs/swagger';
import { Checked, Status } from '@sphereon/pex';

export class CheckedDto implements Checked {
  @ApiProperty()
  tag: string;

  @ApiProperty({ enum: ['info', 'warn', 'error'] })
  status: Status;

  @ApiProperty({ required: false })
  message?: string;
}
