export enum MessageType {
  JOIN = 'join',
  LEAVE = 'leave',
  EDIT = 'edit',
  CURSOR = 'cursor',
  PRESENCE = 'presence',
  SYNC = 'sync'
}

export interface BaseMessage {
  type: MessageType;
  roomId: string;
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
  delta: string; // representation of the edit operation (OT/CRDT)
}

export interface CursorMessage extends BaseMessage {
  type: MessageType.CURSOR;
  position: number;
  selectionStart?: number;
  selectionEnd?: number;
}

export interface PresenceMessage extends BaseMessage {
  type: MessageType.PRESENCE;
  users: Array<{ userId: string; username: string; color: string }>;
}

export interface SyncMessage extends BaseMessage {
  type: MessageType.SYNC;
  document: string;
}

export type WebSocketMessage =
  | JoinMessage
  | LeaveMessage
  | EditMessage
  | CursorMessage
  | PresenceMessage
  | SyncMessage;