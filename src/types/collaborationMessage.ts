export interface CollaborationMessage<T = any> {
  type: string;
  payload: T;
  senderId: string;
  timestamp: number;
}
