import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verifyCredential } from 'didkit-wasm-node';
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
  NamespaceStatusLists,
  NamespaceStatusList,
} from './entities';

@Injectable()
export class StatusListService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(CredentialWithStatus)
    private readonly credentialWithStatusRepository: Repository<CredentialWithStatus>,
    @InjectRepository(NamespaceStatusLists)
    private readonly namespaceStatusListsRepository: Repository<NamespaceStatusLists>,
    @InjectRepository(NamespaceStatusList)
    private readonly namespaceStatusListRepository: Repository<NamespaceStatusList>,
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
    const credentialId = credential.id;
    const namespace = credential.credentialSubject.role.namespace;

    const persistedCredential = await this.getCredential(credentialId);

    if (persistedCredential) {
      return {
        ...credential,
        credentialStatus: persistedCredential.getCredentialStatus(),
      };
    }

    const namespaceStatusLists = await this.getNamespace(namespace);
    const entry = namespaceStatusLists.createEntry(
      this.configService.get('STATUS_LIST_DOMAIN'),
      credentialId
    );

    const credentialWithStatus = CredentialWithStatus.create({
      id: credentialId,
      namespace,
    });

    credentialWithStatus.associateEntry(entry);

    await this.credentialWithStatusRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(credentialWithStatus);
        await transactionalEntityManager.save(namespaceStatusLists);
      }
    );

    return {
      ...credential,
      credentialStatus: credentialWithStatus.getCredentialStatus(),
    };
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

    const statusListCredential = StatusListCredential.create({
      statusListId: credentialWithStatus.entry.statusListCredential,
    }).getStatusListCredential(currentUser);

    return statusListCredential;
  }

  /**
   * Add signed (with proof object) StatusList2021Credential object to a database. Perform a revocation.
   * https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential
   *
   * @param {StatusListVerifiableCredentialDto} vc
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
      statusList = StatusListCredential.create({
        statusListId: credential.entry.statusListCredential,
        vc,
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
      where: { statusListId: statusListId },
    });

    return statusList;
  }

  /**
   * Get or create and get namespace status list.
   *
   * @param {String} namespace namespace
   * @return namespace status list
   */
  async getNamespace(namespace: string): Promise<NamespaceStatusLists> {
    const find = async () => {
      return this.namespaceStatusListsRepository.findOne({
        where: { namespace: namespace },
        relations: {
          lists: true,
        },
      });
    };
    let namespaceRevocations = await find();

    if (!namespaceRevocations) {
      await this.namespaceStatusListsRepository.save(
        NamespaceStatusLists.create({
          namespace: namespace,
        })
      );
      namespaceRevocations = await find();
    }

    return namespaceRevocations;
  }

  /**
   * Get namespace status list by given status list id.
   *
   * @param {String} statusListId namespace
   * @return namespace status list
   */
  async getNamespaceByStatusListId(
    statusListId: string
  ): Promise<NamespaceStatusLists | null> {
    const namespaceRevocations =
      await this.namespaceStatusListRepository.findOne({
        where: { statusListId },
        relations: {
          namespace: true,
        },
      });

    return namespaceRevocations?.namespace;
  }
}
