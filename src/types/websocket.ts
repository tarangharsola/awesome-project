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

export interface UserJoinPayload {
  userId: string;
  username: string;
  color: string;
}

export interface UserLeavePayload {
  userId: string;
}

export interface CursorUpdatePayload {
  userId: string;
  range: { from: number; to: number };
}

export interface DocUpdatePayload {
  content: string;
  version: number;
}

export type WSMessage =
  | { type: WSMessageType.USER_JOIN; payload: UserJoinPayload }
  | { type: WSMessageType.USER_LEAVE; payload: UserLeavePayload }
  | { type: WSMessageType.CURSOR_UPDATE; payload: CursorUpdatePayload }
  | { type: WSMessageType.DOC_UPDATE; payload: DocUpdatePayload };