import { CRDTOperation } from '../../types/collaborationMessage';

export function transformOperation(local: CRDTOperation, remote: CRDTOperation): CRDTOperation {
  // Simple transformation: adjust local indices based on remote inserts.
  if (remote.insert && local.insert) {
    if (remote.insert.index <= local.insert.index) {
      return {
        ...local,
        insert: {
          ...local.insert,
          index: local.insert.index + remote.insert.text.length,
        },
      };
    }
  }
  if (remote.insert && local.delete) {
    if (remote.insert.index <= local.delete.index) {
      return {
        ...local,
        delete: {
          ...local.delete,
          index: local.delete.index + remote.insert.text.length,
        },
      };
    }
  }
  // Additional transformation rules should be added for a full CRDT implementation.
  return local;
}
