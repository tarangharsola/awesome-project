import { CollaborationMessage } from './collaborationMessage';

export interface WebSocketMessage {
  sessionId: string;
  payload: CollaborationMessage;
}
