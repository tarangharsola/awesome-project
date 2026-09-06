import { User } from '../types';
import { WebSocketMessage, MessageType } from '../types/websocketMessage';

export type WebSocketStatus = 'connected' | 'disconnected' | 'error';

/**
 * Create a WebSocket connection for a specific room.
 * The URL includes the room identifier and user metadata for server‑side handling.
 */
export function createWebSocket(roomId: string, user: User): WebSocket {
  const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  const url = `${protocol}://${location.host}/ws/${roomId}?username=${encodeURIComponent(user.name)}&color=${encodeURIComponent(user.color)}`;
  return new WebSocket(url);
}

/**
 * Helper to build a typed WebSocket message.
 */
export function buildMessage(type: MessageType, payload: any): WebSocketMessage {
  return { type, payload } as WebSocketMessage;
}
