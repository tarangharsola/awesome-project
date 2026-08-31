export enum WSMessageType {
  USER_JOIN = "USER_JOIN",
  USER_LEAVE = "USER_LEAVE",
  CURSOR_UPDATE = "CURSOR_UPDATE",
  DOC_UPDATE = "DOC_UPDATE",
  PRESENCE = "PRESENCE"
}

export interface WSMessageBase {
  type: WSMessageType;
  payload: unknown;
}

export interface UserJoinMessage extends WSMessageBase {
  type: WSMessageType.USER_JOIN;
  payload: {
    userId: string;
    username: string;
    color: string;
  };
}

export interface UserLeaveMessage extends WSMessageBase {
  type: WSMessageType.USER_LEAVE;
  payload: {
    userId: string;
  };
}

export interface CursorUpdateMessage extends WSMessageBase {
  type: WSMessageType.CURSOR_UPDATE;
  payload: {
    userId: string;
    position: number;
  };
}

export interface DocUpdateMessage extends WSMessageBase {
  type: WSMessageType.DOC_UPDATE;
  payload: {
    ops: any[];
    version: number;
  };
}

export type WSMessage =
  | UserJoinMessage
  | UserLeaveMessage
  | CursorUpdateMessage
  | DocUpdateMessage;
