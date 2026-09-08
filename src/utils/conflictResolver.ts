import type { EditorOperation, DocumentState } from '../types/editor';
import type { WebSocketMessage } from '../types/websocketMessage';

type PendingOp = { op: EditorOperation; id: string };

export class ConflictResolver {
  private version: number = 0;
  private pending: PendingOp[] = [];
  private state: DocumentState;

  constructor(initial: DocumentState) {
    this.state = initial;
  }

  // Apply a local edit, queue it for sending, and update local state
  localEdit(op: EditorOperation, sendFn: (msg: WebSocketMessage) => void, userId: string) {
    const id = `${userId}-${Date.now()}-${Math.random()}`;
    this.pending.push({ op, id });
    this.applyOp(op);
    const msg: WebSocketMessage = {
      type: 'op',
      roomId: '',
      userId,
      username: '',
      color: '',
      payload: { op, id, version: this.version },
    };
    sendFn(msg);
  }

  // Process an incoming remote operation
  remoteOp(msg: WebSocketMessage) {
    const { op, id, version } = msg.payload as { op: EditorOperation; id: string; version: number };
    // If this is an ack for our own pending op, drop it
    if (this.pending.find(p => p.id === id)) {
      this.pending = this.pending.filter(p => p.id !== id);
      this.version = Math.max(this.version, version + 1);
      return;
    }
    // Apply remote op after any pending local ops (simple transformation)
    this.applyOp(op);
    this.version = Math.max(this.version, version + 1);
  }

  private applyOp(op: EditorOperation) {
    const { range, text } = op;
    const before = this.state.content.slice(0, range.start);
    const after = this.state.content.slice(range.end);
    this.state.content = before + text + after;
  }

  getState(): DocumentState {
    return this.state;
  }
}
