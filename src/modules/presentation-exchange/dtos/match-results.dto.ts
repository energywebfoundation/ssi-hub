import { ApiProperty } from '@nestjs/swagger';
import { IVerifiableCredential, SelectResults, Status } from '@sphereon/pex';
import { CheckedDto } from './checked.dto';
import { SubmissionRequirementMatchDto } from './submission-requirement-match.dto';

export class MatchResultsDto implements SelectResults {
  @ApiProperty({ required: false, type: [CheckedDto] })
  errors?: CheckedDto[];

  @ApiProperty({ required: false, type: [SubmissionRequirementMatchDto] })
  matches?: SubmissionRequirementMatchDto[];

  @ApiProperty({ enum: ['info', 'warn', 'error'] })
  areRequiredCredentialsPresent: Status;

  @ApiProperty({ required: false, isArray: true })
  verifiableCredential?: IVerifiableCredential[];

  @ApiProperty({ required: false })
  vcIndexes?: number[];

  @ApiProperty({ required: false, type: [CheckedDto] })
  warnings?: CheckedDto[];
}
