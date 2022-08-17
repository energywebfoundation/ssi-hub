import { Column, Entity, PrimaryColumn } from 'typeorm';
import { StatusListVerifiableCredentialDto } from '../dtos/status-list-verifiable-credential.dto';
import { gzip } from 'pako';
import { StatusListCredentialDto } from '../dtos';
import { DID } from '../../did/did.types';
import { CredentialType } from '@ew-did-registry/credentials-interface';

@Entity()
export class StatusListCredential {
  static create(
    data: Pick<StatusListCredential, 'statusListId' | 'vc'>
  ): StatusListCredential {
    const entity = new StatusListCredential();
    Object.assign(entity, data);
    return entity;
  }

  @PrimaryColumn()
  statusListId: string;

  @Column({ type: 'jsonb', nullable: true })
  vc?: StatusListVerifiableCredentialDto;

  public getStatusListCredential(issuerDid: string): StatusListCredentialDto {
    const array = Uint8Array.from([1]);
    const encodedList = Buffer.from(gzip(array)).toString('base64');

    // https://w3c-ccg.github.io/vc-status-list-2021/#statuslist2021credential
    const statusListCredential = {
      '@context': [
        'https://www.w3.org/2018/credentials/v1',
        'https://w3id.org/vc/status-list/2021/v1',
      ],
      id: this.statusListId,
      type: [
        CredentialType.VerifiableCredential,
        CredentialType.StatusList2021Credential,
      ],
      credentialSubject: {
        id: this.statusListId,
        type: 'StatusList2021',
        statusPurpose: 'revocation',
        encodedList,
      },
      // toLowerCase used because DIDKit proof verification requires lowercase
      issuer: new DID(issuerDid).withHexChain().toLowerCase(),
      issuanceDate: new Date().toISOString(),
    };

    return statusListCredential;
  }
}
