export enum MessageType {
  JOIN = 'join',
  LEAVE = 'leave',
  EDIT = 'edit',
  CURSOR = 'cursor',
  PRESENCE = 'presence'
}

export interface JoinPayload {
  userId: string;
  name: string;
  color: string;
}

export interface LeavePayload {
  userId: string;
}

export interface EditPayload {
  ops: any; // TODO: replace with concrete OT/CRDT operation type
  version: number;
}

export interface CursorPayload {
  userId: string;
  position: number;
  selection?: { start: number; end: number };
}

export interface PresencePayload {
  users: Array<{ userId: string; name: string; color: string }>;
}

export type WebSocketMessage =
  | { type: MessageType.JOIN; payload: JoinPayload }
  | { type: MessageType.LEAVE; payload: LeavePayload }
  | { type: MessageType.EDIT; payload: EditPayload }
  | { type: MessageType.CURSOR; payload: CursorPayload }
  | { type: MessageType.PRESENCE; payload: PresencePayload };
