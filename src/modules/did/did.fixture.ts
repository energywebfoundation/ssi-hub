import { Chance } from 'chance';
import { Repository } from 'typeorm';
import { DIDContact } from './did.entity';

const chance = new Chance();

export const didContactFixture = async (
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
    });

    contacts.push(didContact);
  }
  return repo.save(contacts);
};
