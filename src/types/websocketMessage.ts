export enum MessageType {
  JOIN = 'join',
  LEAVE = 'leave',
  EDIT = 'edit',
  CURSOR = 'cursor',
  PRESENCE = 'presence',
  SYNC = 'sync'
}

export interface WebSocketMessage<T = any> {
  type: MessageType;
  payload: T;
  senderId?: string;
  timestamp?: number;
}
