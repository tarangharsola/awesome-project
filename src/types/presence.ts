export interface UserPresence {
  id: string;
  name: string;
  color: string;
  cursor?: {
    line: number;
    ch: number;
  };
}

export type PresenceMessage =
  | { type: 'user-joined'; payload: UserPresence }
  | { type: 'user-left'; payload: { id: string } }
  | { type: 'cursor-update'; payload: { id: string; cursor: { line: number; ch: number } } };
