import { CRDT } from './strategies/crdtCore';
import { CollaborationMessage } from '../types/collaborationMessage';

const crdt = new CRDT();

export function resolveConflict(message: CollaborationMessage): string {
  switch (message.type) {
    case 'insert':
      crdt.insert(message);
      break;
    case 'delete':
      crdt.delete(message);
      break;
    default:
      // No operation for other message types
      break;
  }
  return crdt.toString();
}
