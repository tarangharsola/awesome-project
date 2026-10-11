import { CRDTInsert, CRDTDelete } from './crdtTypes';

export function createInsert(id: string, value: string, position: number): CRDTInsert {
  return { type: 'insert', id, value, position };
}

export function createDelete(id: string): CRDTDelete {
  return { type: 'delete', id };
}
