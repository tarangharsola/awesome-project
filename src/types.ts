export type User = {
  id: string;
  name: string;
  color: string;
};

export type CursorData = {
  userId: string;
  position: monaco.editor.IPosition;
};

export type WebSocketMessage =
  | { type: 'join'; user: User }
  | { type: 'leave'; userId: string }
  | { type: 'update'; delta: Uint8Array }
  | { type: 'cursor'; cursor: CursorData };

export type Language = 'javascript' | 'python' | 'html';