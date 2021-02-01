import { DGraphObject } from './DGraphObject';

export interface KeyValue extends DGraphObject {
  key: string;
  value: string;
}

/**
 * Converts Object into Key/Value pairs for dgraph storage with correct type
 * @param record Object with Key/Value strings
 * @return Array of dgraph Key/Value pairs objects
 */
export function RecordToKeyValue(
  record: Record<string, string> | undefined,
): KeyValue[] {
  return (
    record &&
    Object.entries(record).map(([key, value]) => ({
      key,
      value,
      'dgraph.type': 'KeyValue',
    }))
  );
}

/**
 * object with swagger ui schema definition for Key/Value object
 */
export const KeyValueAPIDefinition = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      key: { type: 'string' },
      value: { type: 'string' },
    },
  },
};
