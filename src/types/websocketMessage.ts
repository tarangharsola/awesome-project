export type MessageType = 'join' | 'leave' | 'edit' | 'cursor' | 'presence';

export interface BaseMessage {
  type: MessageType;
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
  delta: string; // representation of the edit operation (OT/CRDT)
}

export interface CursorMessage extends BaseMessage {
  type: 'cursor';
  position: number;
  selectionLength?: number;
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