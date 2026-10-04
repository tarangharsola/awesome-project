export enum WebSocketMessageType {
  Presence = "presence",
  Edit = "edit",
  Cursor = "cursor",
  Init = "init",
}

/**
 * Base shape for all WebSocket messages.
 */
export interface BaseWebSocketMessage {
  type: WebSocketMessageType;
  payload: unknown;
}

/**
 * Presence message payload.
 */
export interface PresencePayload {
  userId: string;
  username: string;
  color: string;
  action: "join" | "leave";
}

/**
 * Edit message payload.
 */
export interface EditPayload {
  userId: string;
  delta: string; // could be OT/CRDT delta representation
}

/**
 * Cursor message payload.
 */
export interface CursorPayload {
  userId: string;
  position: { line: number; ch: number };
}

/**
 * Init message payload sent when a client joins a room.
 */
export interface InitPayload {
  roomId: string;
  userId: string;
  username: string;
  color: string;
}

/**
 * Discriminated union of all possible messages.
 */
export type WebSocketMessage =
  | { type: WebSocketMessageType.Presence; payload: PresencePayload }
  | { type: WebSocketMessageType.Edit; payload: EditPayload }
  | { type: WebSocketMessageType.Cursor; payload: CursorPayload }
  | { type: WebSocketMessageType.Init; payload: InitPayload };
