export enum CollaborationMessageType {
  Init = 'init',
  Change = 'change',
  Cursor = 'cursor',
  Presence = 'presence',
  Disconnect = 'disconnect'
}

export interface InitMessage {
  type: CollaborationMessageType.Init;
  documentId: string;
  content: string;
}

export interface ChangeMessage {
  type: CollaborationMessageType.Change;
  // Define the shape of the change operation (e.g., OT or CRDT delta)
  delta: unknown;
}

export interface CursorMessage {
  type: CollaborationMessageType.Cursor;
  userId: string;
  position: { line: number; ch: number };
}

export interface PresenceMessage {
  type: CollaborationMessageType.Presence;
  users: Array<{ userId: string; username: string; color: string }>;
}

export type CollaborationMessage =
  | InitMessage
  | ChangeMessage
  | CursorMessage
  | PresenceMessage;
