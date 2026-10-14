export type MessageType = 'insert' | 'delete' | 'presence' | 'join' | 'leave';

export interface BaseMessage {
  type: MessageType;
  clientId: string;
  timestamp: number;
}

export interface InsertMessage extends BaseMessage {
  type: 'insert';
  index: number;
  text: string;
}

export interface DeleteMessage extends BaseMessage {
  type: 'delete';
  index: number;
  length: number;
}

export interface PresenceMessage extends BaseMessage {
  type: 'presence';
  username: string;
  color: string;
  cursor: { line: number; ch: number };
}

export type CollaborationMessage = InsertMessage | DeleteMessage | PresenceMessage;
