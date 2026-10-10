export enum CollaborationMessageType {
  PRESENCE = "presence",
  OPERATION = "operation",
  CURSOR = "cursor"
}

export interface PresencePayload {
  user: {
    id: string;
    name: string;
    color: string;
  };
  users?: Array<{
    id: string;
    name: string;
    color: string;
  }>;
}

export interface OperationPayload {
  userId: string;
  operation: any; // CRDT operation shape
}

export interface CursorPayload {
  userId: string;
  position: { line: number; ch: number };
}

export type CollaborationMessage =
  | { type: CollaborationMessageType.PRESENCE; payload: PresencePayload }
  | { type: CollaborationMessageType.OPERATION; payload: OperationPayload }
  | { type: CollaborationMessageType.CURSOR; payload: CursorPayload };