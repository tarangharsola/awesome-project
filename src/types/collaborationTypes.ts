export interface Cursor {
  line: number;
  ch: number;
}

export interface UserPresence {
  id: string;
  name: string;
  color: string;
  cursor?: Cursor;
}

export interface CollaborationOperation {
  type: 'insert' | 'delete';
  index: number;
  text?: string;
  length?: number;
}

export interface CollaborationMessage {
  type: 'operation' | 'presence' | 'join' | 'leave';
  payload: CollaborationOperation | UserPresence | { userId: string };
}
