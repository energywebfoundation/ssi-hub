import { Chance } from 'chance';
import { Repository } from 'typeorm';
import { DIDDocumentEntity } from '../did/did.entity';
import { DIDContact } from './did.contact.entity';

const chance = new Chance();

export const didDocumentFixture = async (
  didDocRepo: Repository<DIDDocumentEntity>,
) => {
  const didDoc = {
    id: 'did:ethr:0x0C2021qb2085C8AA0f686caA011de1cB53a615E9',
    service: [],
    authentication: [],
    publicKey: [],
    created: '<created>',
    proof: undefined,
    updated: '<updated>',
    '@context': '<context>',
    logs: '<logs>',
  };

  return didDocRepo.save(didDoc);
};

export const didContactFixture = async (
  didDoc: DIDDocumentEntity,
  repo: Repository<DIDContact>,
  count = 1,
) => {
  const contacts = [];
  const didConst = `did:ethr:0x0C2021qb2085C8AA0f686caA011de1cB53a615E`;
  for (let i = 0; i < count; i++) {
    const label = chance.string();
    const did = `${didConst}${i}`;

    const didContact = new DIDContact({
      label,
      did,
      createdBy: didDoc,
    });

    contacts.push(didContact);
  }
  return repo.save(contacts);
};
