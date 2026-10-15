export type CollaborationMessage =
  | { type: 'init'; doc: string; users: UserPresence[] }
  | { type: 'operation'; ops: CRDTOperation[] }
  | { type: 'cursor'; userId: string; position: number }
  | { type: 'presence'; user: UserPresence }
  | { type: 'leave'; userId: string };

export interface UserPresence {
  id: string;
  name: string;
  color: string;
}

export interface CRDTOperation {
  id: string;
  userId: string;
  seq: number;
  insert?: { index: number; text: string };
  delete?: { index: number; length: number };
}
