export enum WSMessageType {
  USER_JOIN = "USER_JOIN",
  USER_LEAVE = "USER_LEAVE",
  USER_LIST = "USER_LIST",
  DOCUMENT_CHANGE = "DOCUMENT_CHANGE",
  CURSOR_UPDATE = "CURSOR_UPDATE",
}

export interface WSUser {
  id: string;
  name: string;
  color: string;
}

export interface WSDocumentChange {
  content: string;
  version: number;
}

export interface WSCursorUpdate {
  userId: string;
  position: number;
}

export interface WebSocketMessage {
  type: WSMessageType;
  payload: any;
}