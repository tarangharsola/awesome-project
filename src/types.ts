export interface User {
  id: string;
  name: string;
  color: string;
}

export interface CursorPosition {
  line: number;
  ch: number;
}

export interface AwarenessUser extends User {
  cursor?: CursorPosition;
}

export type WSMessage =
  | { type: "awareness"; payload: AwarenessUser }
  | { type: "awareness-leave"; payload: { id: string } }
  | { type: "cursor"; payload: AwarenessUser }
  | { type: "doc"; payload: string };
