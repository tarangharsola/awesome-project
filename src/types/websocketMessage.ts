export enum WSMessageType {
  JOIN = 'join',
  LEAVE = 'leave',
  CHANGE = 'change',
  CURSOR = 'cursor',
  PRESENCE = 'presence',
  LANGUAGE = 'language'
}

export interface WSBaseMessage {
  type: WSMessageType;
  roomId: string;
  userId: string;
}

export interface WSJoinMessage extends WSBaseMessage {
  type: WSMessageType.JOIN;
  username: string;
  color: string;
}

export interface WSLeaveMessage extends WSBaseMessage {
  type: WSMessageType.LEAVE;
}

export interface WSChangeMessage extends WSBaseMessage {
  type: WSMessageType.CHANGE;
  delta: any; // TODO: replace with concrete delta type
}

export interface WSCursorMessage extends WSBaseMessage {
  type: WSMessageType.CURSOR;
  position: { line: number; ch: number };
}

export interface WSLanguageMessage extends WSBaseMessage {
  type: WSMessageType.LANGUAGE;
  language: string;
}

export type WSMessage =
  | WSJoinMessage
  | WSLeaveMessage
  | WSChangeMessage
  | WSCursorMessage
  | WSLanguageMessage;