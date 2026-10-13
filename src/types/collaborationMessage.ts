export enum MessageType {
  Init = 'init',
  Change = 'change',
  Cursor = 'cursor',
  Presence = 'presence'
}

export interface BaseMessage {
  type: MessageType;
  senderId: string;
  timestamp: number;
}

export interface InitMessage extends BaseMessage {
  type: MessageType.Init;
  document: string;
}

export interface ChangeMessage extends BaseMessage {
  type: MessageType.Change;
  change: any;
}

export interface CursorMessage extends BaseMessage {
  type: MessageType.Cursor;
  position: { line: number; ch: number };
}

export interface PresenceMessage extends BaseMessage {
  type: MessageType.Presence;
  action: 'join' | 'leave';
  userName: string;
  color: string;
}

export type CollaborationMessage = InitMessage | ChangeMessage | CursorMessage | PresenceMessage;
