export type WSMessageType = 'join' | 'leave' | 'edit' | 'cursor' | 'presence';

export interface BaseMessage {
  type: WSMessageType;
  sessionId: string;
  userId: string;
  timestamp: number;
}

export interface JoinMessage extends BaseMessage {
  type: 'join';
  username: string;
  color: string;
}

export interface LeaveMessage extends BaseMessage {
  type: 'leave';
}

export interface EditMessage extends BaseMessage {
  type: 'edit';
  delta: any; // Replace with concrete type when OT/CRDT implementation is finalized
}

export interface CursorMessage extends BaseMessage {
  type: 'cursor';
  position: { line: number; ch: number };
}

export interface PresenceMessage extends BaseMessage {
  type: 'presence';
  users: Array<{ userId: string; username: string; color: string }>;
}

export type WebSocketMessage =
  | JoinMessage
  | LeaveMessage
  | EditMessage
  | CursorMessage
  | PresenceMessage;