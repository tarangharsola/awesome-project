// src/utils/conflictResolver.ts
import { CRDT, CRDTOperation } from './conflict/strategies/crdt';
import { WebSocketMessage } from '../types/websocketMessage';

export class ConflictResolver {
  private crdt: CRDT;
  private pendingOps: CRDTOperation[] = [];
  private isConnected: boolean = false;
  private sendMessage: (msg: WebSocketMessage) => void;

  constructor(siteId: string, sendMessage: (msg: WebSocketMessage) => void) {
    this.crdt = new CRDT(siteId);
    this.sendMessage = sendMessage;
  }

  /** Update connection status; flush pending ops and request sync on reconnect */
  setConnectionStatus(connected: boolean) {
    this.isConnected = connected;
    if (connected) {
      this.pendingOps.forEach((op) => this.broadcast(op));
      this.pendingOps = [];
      this.sendMessage({ type: 'SYNC_REQUEST' });
    }
  }

  /** Local insert */
  insert(index: number, value: string) {
    const op = this.crdt.localInsert(index, value);
    this.handleLocalOp(op);
  }

  /** Local delete */
  delete(index: number, length: number) {
    const op = this.crdt.localDelete(index, length);
    this.handleLocalOp(op);
  }

  /** Process incoming remote operation */
  receiveRemote(op: CRDTOperation) {
    this.crdt.integrate(op);
  }

  /** Current document text */
  getText(): string {
    return this.crdt.getText();
  }

  /** Apply full document sync from server */
  applySync(text: string) {
    // Reset CRDT state and rebuild from the synced text
    this.crdt = new CRDT((this.crdt as any)['siteId']);
    if (text.length > 0) {
      this.crdt.localInsert(0, text);
    }
  }

  private handleLocalOp(op: CRDTOperation) {
    if (this.isConnected) {
      this.broadcast(op);
    } else {
      this.pendingOps.push(op);
    }
  }

  private broadcast(op: CRDTOperation) {
    const msg: WebSocketMessage = {
      type: 'OPERATION',
      payload: op,
    };
    this.sendMessage(msg);
  }
}
