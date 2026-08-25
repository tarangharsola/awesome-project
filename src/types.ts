export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Cursor {
  userId: string;
  position: number; // absolute offset in the document
  selectionStart?: number;
  selectionEnd?: number;
}

export type Language = 'javascript' | 'python' | 'html';

export interface DocumentChange {
  userId: string;
  ops: Array<InsertOp | DeleteOp>;
}

export interface InsertOp {
  type: 'insert';
  index: number;
  text: string;
}

export interface DeleteOp {
  type: 'delete';
  index: number;
  length: number;
}

export interface RoomInfo {
  id: string;
  url: string;
}
