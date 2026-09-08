export enum MessageType {
  JOIN = 'join',
  LEAVE = 'leave',
  EDIT = 'edit',
  CURSOR = 'cursor',
  PRESENCE = 'presence',
}

export interface BaseMessage {
  type: MessageType;
  sessionId: string;
  userId: string;
  timestamp: number;
}

export interface JoinMessage extends BaseMessage {
  type: MessageType.JOIN;
  username: string;
  color: string;
}

export interface LeaveMessage extends BaseMessage {
  type: MessageType.LEAVE;
}

export interface EditMessage extends BaseMessage {
  type: MessageType.EDIT;
  /**
   * Serialized representation of the edit operation.
   * The concrete format depends on the OT/CRDT strategy used.
   */
  delta: string;
}

export interface CursorMessage extends BaseMessage {
  type: MessageType.CURSOR;
  position: number;
  selection?: { start: number; end: number };
}

export type WebSocketMessage = JoinMessage | LeaveMessage | EditMessage | CursorMessage;