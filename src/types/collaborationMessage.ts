export type CollaborationMessage =
  | { type: 'join'; userId: string; userName: string; color: string }
  | { type: 'leave'; userId: string }
  | { type: 'cursor'; userId: string; position: number }
  | { type: 'content'; userId: string; delta: string }
  | { type: 'presence'; users: Array<{ userId: string; userName: string; color: string }> };
