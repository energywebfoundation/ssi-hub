import {
  BadRequestException,
  ForbiddenException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { User } from '../../common/user.decorator';
import { Auth } from '../auth/auth.decorator';
import { RevocationVerificationService } from '../claim/revocation-verification.service';
import { DID } from '../did/did.types';
import { RoleService } from '../role/role.service';
import {
  CreateEntryInputDto,
  CredentialWithStatusDto,
  RegisterRevokeInputDto,
  FinalizeUpdateInputDto,
  StatusListCredentialDto,
  StatusListVerifiableCredentialDto,
} from './dtos';
import { STATUS_LIST_MODULE_PATH } from './status-list.const';
import { StatusListService } from './status-list.service';

@Controller({ path: STATUS_LIST_MODULE_PATH, version: '1' })
@ApiTags('Status list 2021')
export class StatusListController {
  constructor(
    private readonly statusListService: StatusListService,
    private readonly revocationVerificationService: RevocationVerificationService,
    private readonly roleService: RoleService
  ) {}

  @Auth()
  @Post('/entries')
  @ApiCreatedResponse({ type: CredentialWithStatusDto })
  @ApiForbiddenResponse({
    description: 'User is not authorized to issue given credential.',
  })
  @ApiConflictResponse({ description: 'Credential already revoked.' })
  async createEntry(
    @User() currentUser: string,
    @Body() { credential }: CreateEntryInputDto
  ): Promise<CredentialWithStatusDto> {
    const namespace = credential.credentialSubject.role.namespace;
    const issuer = DID.from(credential.issuer).did;

    if (issuer !== currentUser) {
      throw new ForbiddenException(
        'Requester is not the issuer of given credential'
      );
    }

    await this.roleService.verifyEnrolmentIssuer({
      issuerDID: issuer,
      claimType: namespace,
    });

    return await this.statusListService.addStatusListEntry(credential);
  }

  /*
   * Returns the StatusList2021Credential with the bit associated with the provided VerifiableCredential marked
   * as true.
   * The updated StatusList2021Credential is not signed and not persisted.
   * https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential
   *
   * The operation is conducted server-side (rather than client-side) to encourage
   * clients to register their updates with the server, as this maybe required in future versions.
   * (For example, for the implementation of a many-to-one credential to status-list relationship).
   */
  @Auth()
  @Post('/credentials/status/initiate')
  @ApiCreatedResponse({ type: StatusListCredentialDto })
  @ApiForbiddenResponse({ description: 'User is not authorized to revoke.' })
  @ApiConflictResponse({ description: 'Credential already revoked.' })
  async initiateStatusUpdate(
    @User() currentUser: string,
    @Body() { verifiableCredential }: RegisterRevokeInputDto
  ): Promise<StatusListCredentialDto> {
    const namespace = verifiableCredential.credentialSubject.role.namespace;
    const { 2: isAuthorizedRevoker } = await Promise.all([
      this.roleService.verifyEnrolmentIssuer({
        issuerDID: DID.from(verifiableCredential.issuer).did,
        claimType: namespace,
      }),
      this.statusListService.verifyCredential(verifiableCredential),
      this.revocationVerificationService.verifyRevokerAuthority(
        currentUser,
        namespace
      ),
    ]);

    if (!isAuthorizedRevoker) {
      throw new ForbiddenException(
        `${currentUser} is not allowed to revoke ${namespace}`
      );
    }

    return await this.statusListService.markStatusListCredential(
      verifiableCredential,
      currentUser
    );
  }

  @Auth()
  @Post('/credentials/status/finalize')
  @ApiCreatedResponse({ type: StatusListVerifiableCredentialDto })
  @ApiForbiddenResponse({ description: 'User is not authorized to revoke.' })
  @ApiBadRequestResponse()
  async persistUpdate(
    @Body() { statusListCredential }: FinalizeUpdateInputDto
  ): Promise<StatusListVerifiableCredentialDto> {
    const issuer = DID.from(statusListCredential.issuer).did;
    const revokedCredentialId = statusListCredential.credentialSubject.id;

    const statusList = await this.statusListService.getCredential(
      revokedCredentialId
    );

    if (!statusList) {
      throw new BadRequestException('Credential was not registered');
    }

    const { 1: isAuthorizedRevoker } = await Promise.all([
      this.statusListService.verifyCredential(statusListCredential),
      this.revocationVerificationService.verifyRevokerAuthority(
        issuer,
        statusList.namespace
      ),
    ]);

    if (!isAuthorizedRevoker) {
      throw new ForbiddenException(
        `${issuer} is not allowed to revoke ${statusList.namespace}`
      );
    }

    return await this.statusListService.addSignedStatusListCredential(
      statusListCredential
    );
  }

  @Get('/:credentialId')
  @ApiOkResponse({ type: StatusListVerifiableCredentialDto })
  @ApiNoContentResponse({ description: 'Credential not revoked.' })
  async getStatusListCredential(
    @Param('credentialId') credentialId: string,
    @Res() response: Response
  ): Promise<Response> {
    const credential = await this.statusListService.getCredential(credentialId);
    const statusList = await this.statusListService.getStatusList(
      credential?.entry?.statusListCredential
    );

    return response
      .status(statusList?.vc ? HttpStatus.OK : HttpStatus.NO_CONTENT)
      .send(statusList?.vc || null);
  }
}
