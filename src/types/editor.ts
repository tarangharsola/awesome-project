export interface DocumentChange {
  range: {
    start: number;
    end: number;
  };
  text: string;
}

export interface CursorPosition {
  line: number;
  ch: number;
}

export interface UserCursor {
  userId: string;
  name: string;
  color: string;
  position: CursorPosition;
}

export type EditorContent = string;
