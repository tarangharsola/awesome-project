import { applyInsert, applyDelete } from './crdtOperations';
import { CollaborationMessage } from '../../types/collaborationMessage';
import { DocumentState } from '../../types/collaboration';

export class CRDTCore {
  private state: DocumentState;

  constructor(initial: DocumentState) {
    this.state = initial;
  }

  public apply(msg: CollaborationMessage): DocumentState {
    switch (msg.type) {
      case 'insert':
        this.state = applyInsert(msg);
        break;
      case 'delete':
        this.state = applyDelete(msg);
        break;
      default:
        break;
    }
    return this.state;
  }

  public getState(): DocumentState {
    return this.state;
  }
}
