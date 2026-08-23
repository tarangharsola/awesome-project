export interface User {
  id: string;
  name: string;
  color: string;
}

export interface CursorPosition {
  line: number;
  ch: number;
}

export interface Message {
  type: string;
  payload: any;
}