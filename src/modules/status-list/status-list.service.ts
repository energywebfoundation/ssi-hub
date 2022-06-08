import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verifyCredential } from 'didkit-wasm-node';
import { gzip } from 'pako';
import { DID } from '../did/did.types';
import {
  CredentialWithStatusDto,
  CredentialDto,
  VerifiableCredentialDto,
  StatusListCredentialDto,
  StatusListVerifiableCredentialDto,
} from './dtos';
import {
  CredentialWithStatus,
  StatusListCredential,
  NamespaceRevocations,
  StatusListEntry,
} from './entities';

@Injectable()
export class StatusListService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(CredentialWithStatus)
    private readonly credentialWithStatusRepository: Repository<CredentialWithStatus>,
    @InjectRepository(NamespaceRevocations)
    private readonly namespaceRevocationsRepository: Repository<NamespaceRevocations>,
    @InjectRepository(StatusListCredential)
    private readonly statusListCredentialRepository: Repository<StatusListCredential>
  ) {}

  /**
   * Add StatusList2021Entry as `credentialStatus` parameter to given credential object.
   * https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021entry
   *
   * @param {CredentialDto} credential
   * @return credential with StatusList2021Entry
   */
  async addStatusListEntry(
    credential: CredentialDto
  ): Promise<CredentialWithStatusDto> {
    const namespace = credential.credentialSubject.role.namespace;
    let statusListEntity = await this.getCredential(credential.id);
    const namespaceRevocations = await this.getNamespace(namespace);

    const entry = namespaceRevocations.createEntry(
      this.configService.get('STATUS_LIST_DOMAIN'),
      credential.id
    );

    if (!statusListEntity) {
      await this.credentialWithStatusRepository.manager.transaction(
        async (transactionalEntityManager) => {
          const statusListEntry = await transactionalEntityManager.save(
            StatusListEntry.create({
              statusListIndex: entry.statusListIndex,
              statusListCredential: entry.statusListCredential,
            })
          );

          statusListEntity = await transactionalEntityManager.save(
            CredentialWithStatus.create({
              id: credential.id,
              namespace: credential.credentialSubject.role.namespace,
              entry: statusListEntry,
            })
          );

          await transactionalEntityManager.save(namespaceRevocations);
        }
      );
    }

    return { ...credential, credentialStatus: entry };
  }

  /**
   * Return a StatusList2021Credential which is updated with the revocation of the provided verifiable credential.
   * Object is not signed and not saved to database.
   * https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential
   *
   * @param {VerifiableCredentialDto} credential
   * @param {String} currentUser
   * @return StatusList2021Credential without proof
   */
  async markStatusListCredential(
    credential: VerifiableCredentialDto,
    currentUser: string
  ): Promise<StatusListCredentialDto> {
    const credentialWithStatus = await this.getCredential(credential.id);

    if (!credentialWithStatus) {
      throw new BadRequestException('Credential was not registered');
    }

    if (
      credentialWithStatus.namespace !==
      credential.credentialSubject.role.namespace
    ) {
      throw new BadRequestException(
        'Credential was registered with another namespace'
      );
    }

    const array = Uint8Array.from([1]);
    const encodedList = Buffer.from(gzip(array)).toString('base64');

    // https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential
    const statusListCredential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/vc/status-list/2021/v1',
      ],
      id: credentialWithStatus.entry.statusListCredential,
      type: ['VerifiableCredential', 'StatusList2021Credential'],
      issuer: new DID(currentUser).withHexChain(),
      issuanceDate: new Date().toISOString(),
      credentialSubject: {
        id: credentialWithStatus.id,
        type: 'StatusList2021',
        statusPurpose: 'revocation',
        encodedList,
      },
    };

    return statusListCredential;
  }

  /**
   * Add signed (with proof object) StatusList2021Credential object to a database. Perform a revocation.
   * https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential
   *
   * @param {StatusListVerifiableCredentialDto} credential
   * @return saved StatusList2021Credential
   */
  async addSignedStatusListCredential(
    vc: StatusListVerifiableCredentialDto
  ): Promise<StatusListVerifiableCredentialDto> {
    const credentialId = vc.credentialSubject.id;

    const credential = await this.getCredential(credentialId);

    let statusList = await this.getStatusList(
      credential.entry.statusListCredential
    );

    if (!statusList) {
      const namespace = await this.getNamespace(credential.namespace);
      statusList = StatusListCredential.create({
        id: credential.entry.statusListCredential,
        vc,
        namespace,
      });
    }

    statusList.vc = vc;

    const savedStatusList = await this.statusListCredentialRepository.save(
      statusList
    );
    return savedStatusList.vc;
  }

  /**
   * Verify verifiable credential proof. Throw error if proof is not valid.
   *
   * @param {StatusListVerifiableCredentialDto | VerifiableCredentialDto} credential verifiable credential
   */
  async verifyCredential(
    credential: StatusListVerifiableCredentialDto | VerifiableCredentialDto
  ): Promise<void> {
    const verifyResultsString = await verifyCredential(
      JSON.stringify(credential),
      JSON.stringify({})
    );

    const verifyResults = JSON.parse(verifyResultsString) as {
      checks: string[];
      warnings: string[];
      errors: string[];
    };

    if (verifyResults.errors.length) {
      throw new BadRequestException(
        `Verifiable Credential is invalid, errors: ${verifyResults.errors.join(
          ', '
        )}`
      );
    }
  }

  /**
   * Check if credential is revoked. Revoked credential has StatusList2021Credential.
   *
   * @param {String} credentialId verifiable credential id
   * @return true if credential is revoked
   */
  async isCredentialRevoked(credentialId: string): Promise<boolean> {
    const credential = await this.getCredential(credentialId);
    if (!credential) return false;

    const statusList = await this.getStatusList(
      credential.entry.statusListCredential
    );

    return !!statusList?.vc;
  }

  /**
   * Get registered credential with status.
   *
   * @param {String} credentialId verifiable credential id
   * @return credential
   */
  async getCredential(
    credentialId: string
  ): Promise<CredentialWithStatus | null> {
    const credential = await this.credentialWithStatusRepository.findOne({
      where: {
        id: credentialId,
      },
      relations: {
        entry: true,
      },
    });

    return credential;
  }

  /**
   * Get status list credential.
   *
   * @param {String} statusListId status list credential id
   * @return status list credential
   */
  async getStatusList(
    statusListId: string
  ): Promise<StatusListCredential | null> {
    const statusList = await this.statusListCredentialRepository.findOne({
      where: { id: statusListId },
      relations: {
        namespace: true,
      },
    });

    return statusList;
  }

  /**
   * Get or create and get namespace revocations.
   *
   * @param {String} namespace namespace
   * @return namespace revocations
   */
  async getNamespace(namespace: string): Promise<NamespaceRevocations> {
    const find = async () => {
      return this.namespaceRevocationsRepository.findOne({
        where: { namespace: namespace },
        relations: {
          statusListCredentials: true,
        },
      });
    };
    let namespaceRevocations = await find();

    if (!namespaceRevocations) {
      await this.namespaceRevocationsRepository.save(
        NamespaceRevocations.create({
          namespace: namespace,
        })
      );
      namespaceRevocations = await find();
    }

    return namespaceRevocations;
  }
}
