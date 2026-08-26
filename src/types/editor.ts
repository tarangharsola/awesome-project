export interface DocumentChange {
  range: {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
  };
  text: string;
}

export interface CursorPosition {
  lineNumber: number;
  column: number;
}

export interface UserCursor {
  userId: string;
  username: string;
  color: string;
  position: CursorPosition;
}