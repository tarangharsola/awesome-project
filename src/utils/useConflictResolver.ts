import { DocumentChange, ConflictResolverOptions } from './conflictResolver/types';

/**
 * Simple conflict‑resolution engine based on versioned operation lists.
 * It is deliberately lightweight to avoid pulling in heavy CRDT libraries
 * while still providing deterministic merging of remote edits.
 */
export class ConflictResolver {
  private content: string;
  private version: number;

  constructor(options?: ConflictResolverOptions) {
    this.content = options?.initialContent ?? '';
    this.version = 0;
  }

  /** Current document text */
  getContent(): string {
    return this.content;
  }

  /** Current version number */
  getVersion(): number {
    return this.version;
  }

  /** Apply a remote change if it is newer than the current version */
  applyRemote(change: DocumentChange): void {
    if (change.version <= this.version) return;
    let newContent = this.content;
    for (const op of change.ops) {
      if (op.type === 'insert') {
        newContent =
          newContent.slice(0, op.index) + op.text + newContent.slice(op.index);
      } else if (op.type === 'delete') {
        newContent =
          newContent.slice(0, op.index) + newContent.slice(op.index + op.length);
      }
    }
    this.content = newContent;
    this.version = change.version;
  }

  /** Generate a local change from a list of ops and apply it locally */
  generateLocalChange(ops: DocumentChange['ops']): DocumentChange {
    const change: DocumentChange = {
      version: this.version + 1,
      ops,
    };
    this.applyRemote(change);
    return change;
  }
}

export default ConflictResolver;
