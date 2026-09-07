export type MessageType = 'join' | 'leave' | 'cursor' | 'edit' | 'presence';

export interface BaseMessage {
  type: MessageType;
  sessionId: string;
  timestamp: number;
}

export interface JoinMessage extends BaseMessage {
  type: 'join';
  userId: string;
  username: string;
  color: string;
}

export interface LeaveMessage extends BaseMessage {
  type: 'leave';
  userId: string;
}

export interface CursorMessage extends BaseMessage {
  type: 'cursor';
  userId: string;
  position: { line: number; ch: number };
}

export interface EditMessage extends BaseMessage {
  type: 'edit';
  userId: string;
  delta: any; // TODO: replace with concrete OT/CRDT delta type
}

export type WebSocketMessage =
  | JoinMessage
  | LeaveMessage
  | CursorMessage
  | EditMessage;
