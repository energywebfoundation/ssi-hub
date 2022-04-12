import { ApiProperty } from '@nestjs/swagger';
import { SubmissionRequirementMatch } from '@sphereon/pex';

export class SubmissionRequirementMatchDto
  implements SubmissionRequirementMatch
{
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ enum: ['all', 'pick'] })
  rule: 'all' | 'pick';

  @ApiProperty()
  min?: number;

  @ApiProperty({ required: false })
  count?: number;

  @ApiProperty({ required: false })
  max?: number;

  @ApiProperty()
  vc_path: string[];

  @ApiProperty({ required: false })
  from?: string[];

  @ApiProperty({ required: false, type: [SubmissionRequirementMatchDto] })
  from_nested?: SubmissionRequirementMatchDto[];
}
