export type CollaborationMessage =
  | { type: 'join'; username: string; color: string }
  | { type: 'leave'; username: string }
  | { type: 'cursor'; username: string; position: number }
  | { type: 'content'; delta: string; version: number };
