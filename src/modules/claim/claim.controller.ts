import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseInterceptors,
  HttpException,
  HttpStatus,
  ValidationPipe,
  UsePipes,
  ForbiddenException,
} from '@nestjs/common';
import { ClaimService } from './claim.service';
import { DIDService } from '../did/did.service';
import {
  ApiBody,
  ApiExcludeEndpoint,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JWT } from '@ew-did-registry/jwt';
import { Keys } from '@ew-did-registry/keys';
import { ProofVerifier } from '@ew-did-registry/claims';
import {
  ClaimEventType,
  IClaimIssuance,
  IClaimRejection,
  IClaimRequest,
  NATS_EXCHANGE_TOPIC,
} from './claim.types';
import { validateOrReject } from 'class-validator';
import {
  ClaimIssueDTO,
  ClaimRejectionDTO,
  ClaimRequestDTO,
  IssuedClaimDTO,
} from './claim.dto';
import { Auth } from '../auth/auth.decorator';
import { SentryErrorInterceptor } from '../interceptors/sentry-error-interceptor';
import { Logger } from '../logger/logger.service';
import { User } from '../../common/user.decorator';
import { BooleanPipe } from '../../common/boolean.pipe';
import { AssetsService } from '../assets/assets.service';
import { DIDsQuery } from './entities/roleClaim.entity';
import { RoleDTO } from '../role/role.dto';
import { NatsService } from '../nats/nats.service';

@Auth()
@UseInterceptors(SentryErrorInterceptor)
@Controller({ path: 'claim', version: '1' })
export class ClaimController {
  constructor(
    private readonly claimService: ClaimService,
    private readonly didService: DIDService,
    private readonly assetsService: AssetsService,
    private readonly logger: Logger,
    private readonly nats: NatsService,
  ) {
    this.logger.setContext(ClaimController.name);
  }

  @Post('/issue/:did')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  @ApiBody({
    type: ClaimIssueDTO,
    description: 'Claim data object, containing id and issuedToken',
  })
  @ApiOperation({
    summary: 'updates claim request',
    description: 'updates claim request upon acceptance with DID of an Issuer',
  })
  public async postIssuerClaim(
    @Param('did') did: string,
    @Body() data: IClaimIssuance,
  ) {
    const didDoc = await this.didService.getById(did);
    const proofVerifier = new ProofVerifier(didDoc);

    if (
      data.issuedToken &&
      !(await proofVerifier.verifyAssertionProof(data.issuedToken))
    ) {
      throw new ForbiddenException('User signature not valid');
    }

    const claimData: IClaimIssuance = {
      ...data,
      acceptedBy: did,
    };

    await ClaimIssueDTO.create(claimData);

    const result = await this.claimService.handleClaimIssuanceRequest(
      claimData,
    );
    if (!result.isSuccessful) {
      throw new HttpException(result.details, HttpStatus.BAD_REQUEST);
    }

    const dids = [claimData.requester];

    if (claimData.issuedToken) {
      const { sub } = new JWT(new Keys()).decode(claimData.issuedToken) as {
        sub: string;
      };
      dids.push(sub);
    }

    await this.nats.publishForDids(
      ClaimEventType.ISSUE_CREDENTIAL,
      NATS_EXCHANGE_TOPIC,
      dids,
      { claimId: claimData.id },
    );

    this.logger.debug(`credentials issued by ${did}`);
  }

  @Post('/request/:did')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  @ApiBody({
    type: ClaimRequestDTO,
    description: 'Claim data object, containing id and issuedToken',
  })
  @ApiOperation({
    summary: 'registers new claim request',
    description:
      'registers new claim request, returns ID of newly added claim request',
  })
  @ApiResponse({
    status: 200,
    type: String,
    description: 'ID of newly added claim',
  })
  public async postRequesterClaim(
    @Param('did') did: string,
    @Body() data: IClaimRequest,
  ) {
    const jwt = new JWT(new Keys());
    const { requester, token } = data;
    const { sub } = jwt.decode(token) as { sub: string };
    const ownedAssets = await this.assetsService.getByOwner(requester);
    if (requester !== sub && !ownedAssets.some(a => a.document.id === sub)) {
      throw new HttpException(
        'Claim requester not authorized to request for subject',
        HttpStatus.FORBIDDEN,
      );
    }

    const claimData: IClaimRequest = {
      id: ClaimService.idOfClaim(data),
      ...data,
    };

    const claimDTO = ClaimRequestDTO.create(claimData);

    await validateOrReject(claimDTO);

    const result = await this.claimService.handleClaimEnrolmentRequest(
      claimData,
    );
    if (!result.isSuccessful) {
      throw new HttpException(result.details, HttpStatus.BAD_REQUEST);
    }

    await this.nats.publishForDids(
      ClaimEventType.REQUEST_CREDENTIALS,
      NATS_EXCHANGE_TOPIC,
      [claimData.claimIssuer],
      { claimId: claimData.id },
    );

    this.logger.debug(`credentials requested from ${did}`);

    return claimData.id;
  }

  @Post('/reject/:did')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'rejects claim request',
  })
  @ApiBody({
    type: ClaimRejectionDTO,
    description: 'Claim data object',
  })
  @ApiResponse({
    status: 200,
  })
  public async postClaimRejection(
    @Param('did') did: string,
    @Body() data: IClaimRejection,
  ) {
    const claimData: IClaimRejection = {
      ...data,
    };

    const claimDTO = ClaimRejectionDTO.create(claimData);

    await validateOrReject(claimDTO);

    const result = await this.claimService.handleClaimRejectionRequest(
      claimData,
    );
    if (!result.isSuccessful) {
      throw new HttpException(result.details, HttpStatus.BAD_REQUEST);
    }

    await this.nats.publishForDids(
      ClaimEventType.REJECT_CREDENTIAL,
      NATS_EXCHANGE_TOPIC,
      [claimData.claimIssuer],
      { claimId: claimData.id },
    );

    this.logger.debug(`credentials rejected for ${did}`);
  }

  @Delete('/:id')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  public async removeById(@Param('id') id: string, @User() user?: string) {
    return await this.claimService.removeById(id, user);
  }

  @Get('/parent/:namespace')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims for roles related to given namespace',
    description:
      '### Usage: \n ' +
      'providing namespace `myApp.apps.myOrg.iam.ewc` <br> ' +
      'should return claims for namespaces like ' +
      '`admin.roles.myApp.apps.myOrg.iam.ewc`',
  })
  public async getByParentNamespace(@Param('id') id: string) {
    return await this.claimService.getByParentNamespace(id);
  }

  @Get('/user/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims Related to given DID',
  })
  public async getByUserDid(@Param('did') did: string, @User() user?: string) {
    return await this.claimService.getByUserDid({ did, currentUser: user });
  }

  @Get('/issuer/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims of Issuer with given DID',
  })
  @ApiQuery({
    name: 'accepted',
    required: false,
    description:
      '**true** - show only accepted <br> **false** - show only pending',
  })
  @ApiQuery({
    name: 'namespace',
    required: false,
    description: 'filter only claims of given namespace',
  })
  public async getByIssuerDid(
    @Param('did') issuer: string,
    @Query('isAccepted', BooleanPipe) isAccepted?: boolean,
    @Query('namespace') namespace?: string,
    @User() user?: string,
  ) {
    return await this.claimService.getByIssuer({
      issuer,
      filters: {
        isAccepted,
        namespace,
      },
      currentUser: user,
    });
  }

  @Get('/issuer/roles/allowed/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary:
      'Returns the Roles that an issuer DID can issuer, given the permissions in the role definitions',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RoleDTO],
    description: 'Roles that the issuer can issue',
  })
  public async getByAllowedRolesByIssuer(@Param('did') issuer: string) {
    return await this.claimService.rolesByIssuer(issuer);
  }

  @Get('/requester/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims for Requester with given DID',
  })
  @ApiQuery({
    name: 'isAccepted',
    required: false,
    description:
      '**true** - show only accepted <br> **false** - show only pending',
  })
  @ApiQuery({
    name: 'namespace',
    required: false,
    description: 'filter only claims of given namespace',
  })
  public async getByRequesterDid(
    @Param('did') requester: string,
    @Query('isAccepted', BooleanPipe) isAccepted?: boolean,
    @Query('namespace') namespace?: string,
    @User() user?: string,
  ) {
    return await this.claimService.getByRequester({
      requester,
      filters: {
        isAccepted,
        namespace,
      },
      currentUser: user,
    });
  }

  @Get('/subject/:did')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims for given subject',
  })
  @ApiQuery({
    name: 'iAccepted',
    required: false,
    description:
      '**true** - show only accepted <br> **false** - show only pending',
  })
  @ApiQuery({
    name: 'namespace',
    required: false,
    description: 'filter only claims of given namespace',
  })
  public async getBySubject(
    @Param('did') subject: string,
    @Query('isAccepted', BooleanPipe) isAccepted?: boolean,
    @Query('namespace') namespace?: string,
    @User() user?: string,
  ) {
    return await this.claimService.getBySubject({
      subject,
      filters: {
        isAccepted,
        namespace,
      },
      currentUser: user,
    });
  }

  @Get('/did/:namespace')
  @ApiQuery({
    name: 'accepted',
    required: false,
    description: 'additional filter',
  })
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns DIDs of claim requests for given namespace',
  })
  public async getDidsOfNamespace(
    @Param('namespace') namespace: string,
    @Query('accepted', BooleanPipe)
    accepted?: boolean,
  ) {
    return this.claimService.getDidOfClaimsOfNamespace(namespace, accepted);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/by/subjects')
  @ApiQuery({
    name: 'subjects',
    required: true,
    description: 'DIDs whose claims are being requested',
  })
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claims requested for given DIDs',
  })
  public async getBySubjects(
    @Query() { subjects }: DIDsQuery,
    @Query('isAccepted', BooleanPipe) isAccepted?: boolean,
    @Query('namespace') namespace?: string,
    @User() user?: string,
  ) {
    return this.claimService.getBySubjects({
      subjects,
      filters: { isAccepted, namespace },
      currentUser: user,
    });
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Post('/issued')
  @ApiExcludeEndpoint()
  @ApiTags('Claims')
  public async saveIssued(@Body() body: IssuedClaimDTO) {
    return this.claimService.saveIssuedClaim(body);
  }

  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @Get('/issued')
  @ApiQuery({
    name: 'subjects',
    required: true,
    description: 'DIDs whose issued claims are being requested',
  })
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns issued claims requested for given DIDs',
  })
  public async getIssuedClaimsBySubjects(@Query() { subjects }: DIDsQuery) {
    return this.claimService.getIssuedClaimsBySubjects(subjects);
  }

  @Get('/:id')
  @ApiTags('Claims')
  @ApiOperation({
    summary: 'returns claim with given ID',
  })
  public async getById(@Param('id') id: string) {
    return await this.claimService.getById(id);
  }
}
