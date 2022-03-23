import { v4 } from 'uuid';
import { CID } from 'multiformats/cid';
import * as json from 'multiformats/codecs/json';
import { sha256 } from 'multiformats/hashes/sha2';
import { DataSort } from '../../src/modules/decentralized-web-node/dtos/collections-query-descriptor.dto';

type UnPromisify<T> = T extends Promise<infer U> ? U : T;

export const generateCid = async (data: Record<string, unknown>) => {
  const bytes = json.encode(data);
  const hash = await sha256.digest(bytes);
  const cid = CID.create(1, json.code, hash);
  return cid.toString();
};

export const createRequest = async (
  messages: (
    | UnPromisify<ReturnType<typeof createWriteMessage>>
    | UnPromisify<ReturnType<typeof createQueryMessage>>
  )[],
  target: string
) => {
  return {
    requestId: v4(),
    target,
    messages,
  };
};

export const createWriteMessage = async (
  dataObj: Record<string, unknown>,
  options?: {
    schema?: string;
    dateCreated?: number;
    datePublished?: number;
    dataFormat?: string;
  }
) => {
  const data = Buffer.from(JSON.stringify(dataObj)).toString('base64');
  return {
    data,
    descriptor: {
      method: 'CollectionsWrite',
      objectId: v4(),
      schema: options?.schema || 'https://www.w3.org/TR/vc-data-model/',
      dateCreated: options?.dateCreated || Date.now(),
      datePublished: options?.datePublished || Date.now(),
      dataFormat: options?.dataFormat || 'application/ld+json',
      cid: await generateCid(dataObj),
    },
  };
};

export const createQueryMessage = async (options: {
  objectId?: string;
  schema?: string;
  dataFormat?: string;
  dateSort?: DataSort;
  cid?: string;
}) => {
  return {
    descriptor: {
      method: 'CollectionsQuery',
      ...options,
    },
  };
};
