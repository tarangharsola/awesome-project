export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Cursor {
  userId: string;
  position: number;
}

export interface DocumentState {
  content: string;
  version: number;
}