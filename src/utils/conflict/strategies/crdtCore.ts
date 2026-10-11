import { CRDTNode, CRDTInsert, CRDTDelete } from './crdtTypes';

export class CRDT {
  private sequence: CRDTNode[] = [];

  insert(op: CRDTInsert) {
    const { id, value, position } = op;
    this.sequence.splice(position, 0, { id, value });
  }

  delete(op: CRDTDelete) {
    const index = this.sequence.findIndex(node => node.id === op.id);
    if (index !== -1) {
      this.sequence.splice(index, 1);
    }
  }

  toString(): string {
    return this.sequence.map(node => node.value).join('');
  }
}
